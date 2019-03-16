<?php

class CompanyPermissionController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'company_permission';
		$this->model = new CompanyPermissionModel();
	}

	public function insertAllPermission($company_id, $user_id) {
		$entityController = new EntityController($this->database);
		$entitys = $entityController->select([])->asObject();
		foreach($entitys as $entity) {
			$this->insert([
				"company_id" => $company_id,
				"user_company_id" => $user_id,
				"entity_id" => $entity["id"],
				"view_entity" => 1,
				"insert_entity" => 1,
				"updat_entity" => 1,
				"delete_entity" => 1,
				"active" => "S"
			]);
		}
	}
}