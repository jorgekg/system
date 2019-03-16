<?php

class CompanyController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'company';
		$this->model = new CompanyModel();
	}

	public function getByPersonId($person_id, $company_id) {
		$companyUserController = new CompanyUserController($this->database);
		$users = $companyUserController->select([
			"company_id" => $company_id,
			"person_id" => $person_id
		])->asObject();
		$companys = $this->select([
			"id" => $company_id
		])->asObject();
		$user = null;
		if (!empty($users)) {
			$user = $users[0];
		}
		if (!empty($companys) && !empty($user)) {
			$comp = $companys[0];
			$companyModuleController = new CompanyModuleController($this->database);
			$comp["modules"] = $companyModuleController->database->select(
				$companyModuleController->table,
				[
					"[><]module" => ["module_id" => "id"]
				], [
					"module.name(module)"
				], [
				"company_id" => $company_id,
				"company_user_id" => $user["id"],
				"active" => "S"
			]);
			$companyModuleController->hasError();
			$companyPermissionController = new CompanyPermissionController($this->database);
			$comp["permission"] = $companyPermissionController->database->select(
				$companyPermissionController->table, [
				"[><]entity" => ["entity_id" => "id"]
			], [
				"entity.name(entity)",
				"company_permission.view_entity",
				"company_permission.insert_entity",
				"company_permission.updat_entity",
				"company_permission.delete_entity"
			], [
				"company_permission.company_id" => $comp["id"],
				"company_permission.user_company_id" => $user["id"],
				"company_permission.active" => "S"
			]);
			$companyPermissionController->hasError();
			$this->data = $comp;
		}
		return $this;
	}

	public function getCompanyByToken($token) {
		$tokenController = new TokenController($this->database);
		$tokens = $tokenController->getCompanyId($token)->asObject();
		foreach($tokens as $tk) {
			$companys = $this->select([
				"id" => $tk["company_id"]
			])->asObject();
			if (!empty($companys)) {
				$comp = $companys[0];
				$companyModuleController = new CompanyModuleController($this->database);
				$comp["modules"] = $companyModuleController->database->select(
					$companyModuleController->table,
					[
						"[><]module" => ["module_id" => "id"]
					], [
						"module.name(module)"
					], [
					"company_id" => $tk["company_id"],
					"company_user_id" => $tk["company_user_id"],
					"active" => "S"
				]);
				$companyModuleController->hasError();
				$companyPermissionController = new CompanyPermissionController($this->database);
				$comp["permission"] = $companyPermissionController->database->select(
					$companyPermissionController->table, [
					"[><]entity" => ["entity_id" => "id"]
				], [
					"entity.name(entity)",
					"company_permission.view_entity",
					"company_permission.insert_entity",
					"company_permission.updat_entity",
					"company_permission.delete_entity"
				], [
					"company_permission.company_id" => $tk["company_id"],
					"company_permission.user_company_id" => $tk["company_user_id"],
					"company_permission.active" => "S"
				]);
				$companyPermissionController->hasError();
				$this->data = $comp;
			}
		}
		return $this;
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
					$companyUsers = $companyUserController->asObject();
					if (!empty($companyUsers)) {
						$companyUser = $companyUsers[0];
						$companyModuleController = new CompanyModuleController($this->database);
						$companyModuleController->insertAllModules(
							$company["id"],
							$companyUser["id"]
						);
						$companyPermissionController = new CompanyPermissionController($this->database);
						$companyPermissionController->insertAllPermission(
							$company["id"],
							$companyUser["id"]
						);
						return true;
					}
					echo json_encode(["code" => 500, "message" => "error"]);
					http_response_code(500);
					exit;
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