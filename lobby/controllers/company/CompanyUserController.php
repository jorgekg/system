<?php

class CompanyUserController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'company_user';
		$this->model = new CompanyUserModel();
	}

	public function insertCompanyUser($params) {
		$this->database->action(function($database) use ($params) {
			$personController = new PersonController($database);
			$personController->update([
				"id" => $params["person_id"],
				"responsible" => "S"
			]);
			$personEmailController = new PersonContactController($database);
			$emails = $personEmailController->select([
				"person_id" => $params["person_id"],
				"contact_type_id" => 1
			])->asObject();
			$email = null;
			if (empty($emails)) {
				echo json_encode(["code" => 400, "message" => "person.email.required"]);
				http_response_code(400);
				exit;
			} else {
				$email = $emails[0];
			}
			$companyUserController = new CompanyUserController($database);
			$companyUserController->insert([
				"company_id" => $params["company_id"],
				"person_id" => $params["person_id"],
				"email" => $email["contact"],
				"password" => sha1(12345),
				"active" => "S"
			]);
			$companyUsers = $companyUserController->asObject();
			if (!empty($companyUsers)) {
				$companyUser = $companyUsers[0];
				$companyModuleController = new CompanyModuleController($this->database);
				$companyModuleController->insertAllModules(
					$params["company_id"],
					$companyUser["id"]
				);
				$companyPermissionController = new CompanyPermissionController($this->database);
				$companyPermissionController->insertAllPermission(
					$params["company_id"],
					$companyUser["id"]
				);
			}
			return true;
		});
		return $this;
	}
}