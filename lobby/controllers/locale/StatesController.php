<?php

class StatesController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'states';
		$this->model = new StatesModel();
	}

	public function getByName($name) {
		$this->select([
			"name[~]" => $name
		]);
		return $this;
	}
}