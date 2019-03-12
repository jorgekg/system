<?php

class LobbyController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'lobby';
		$this->model = new LobbyModel();
	}

	public function getByName($name, $company) {
		$this->select([
			"company_id" => $company,
			"name[~]" => $name
		]);
		return $this;
	}
}