<?php

class CompanyController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'company';
		$this->model = new CompanyModel();
	}

	public function insertCompany($params) {
		$companyUser = null;
		$this->database->action(function($database) use ($params, &$companyUser) {
			$companyController = new CompanyController($database);
			$companyController->insert([
				"name" => $params["name"],
				"active" => "S"
			]);
			$companys = $companyController->asObject();
			if (!empty($companys)) {
				$company = $companys[0];
				$companyUserController = new CompanyUserController($database);
				$companyUserController->select([
					"email" => $params["email"]
				]);
				if (empty($companyUserController->asObject())) {
					$companyUserController->insert([
						"company_id" => $company["id"],
						"email" => $params["email"],
						"password" => $params["password"],
						"active" => "S"
					]);
					$companyUser = $companyUserController->asObject();
				} else {
					echo json_encode(["code" => 409, "message" => "company.has.exists"]);
					http_response_code(409);
					exit;
				}
			} else {
				echo json_encode(["code" => 400, "message" => "company.not.create"]);
				http_response_code(400);
				exit;
			}
		});
		$this->data = $companyUser;
		return $this;
	}
}