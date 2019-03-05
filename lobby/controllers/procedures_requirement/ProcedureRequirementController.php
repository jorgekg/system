<?php

class ProcedureRequirementController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'procedures_requirement';
		$this->model = new ProcedureRequirementModel();
	}

	public function getByListProcedures($listProcedures, $company) {
		$this->data = $this->database->select(
			$this->table,
			[
				"[><]requirement" => ["requirement_id" => "id"]
			],
			[
				"requirement.name",
				"procedures_requirement.id",
				"procedures_requirement.update_at"
			], [
				"procedures_requirement.company_id" => $company,
				"procedures_requirement.procedure_id" => $listProcedures
			]
		);
		$this->hasError();
		return $this;
	}

	public function getByReason($params) {
		$this->getFilters($params);
		$this->data = $this->database->select(
			$this->table,
			[
				"[><]requirement" => ["requirement_id" => "id"]
			],
			[
				"requirement.name",
				"procedures_requirement.id",
				"procedures_requirement.update_at"
			]
			,
			$this->filter
		);
		$this->hasError();
		return $this;
	}
}