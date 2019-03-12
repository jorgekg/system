<?php

class ProceduresController  extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'procedures';
		$this->model = new ProceduresModel();
	}

	public function getByName($name, $company) {
		$this->select([
			"company_id" => $company,
			"name[~]" => $name
		]);
		return $this;
	}
}