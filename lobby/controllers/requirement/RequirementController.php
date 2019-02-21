<?php

class RequirementController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'requirement';
		$this->model = new RequirementModel();
	}

	public function getByName($param) {
		$this->filter["name[~]"] = $param->getQueryParam("name");
		$this->data = $this->database->select($this->table, '*', $this->filter);
		$this->hasError();
		return $this;
	}
}