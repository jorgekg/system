<?php

class CompanyModuleController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'company_module';
		$this->model = new CompanyModuleModel();
	}

	public function insertAllModules($company_id, $user_id) {
		$moduleController = new ModuleController($this->database);
		$modules = $moduleController->select([])->asObject();
		foreach($modules as $module) {
			$this->insert([
				"company_id" => $company_id,
				"company_user_id" => $user_id,
				"module_id" => $module["id"],
				"active" => "S"
			]);
		}
	}
}