<?php

class ContactTypeController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'contact_type';
		$this->model = new ContactTypeModel();
		$this->defaultValues();
	}

	private function defaultValues() {
		$data = $this->data = $this->database->select(
			$this->table,
			'*',
			[]
		);
		if (empty($data)) {
			$this->database->insert($this->table, [
				"type" => "EMAIL",
				"label" => "E-mail"
			]);
			$this->hasError();
			$this->database->insert($this->table, [
				"type" => "PHONE",
				"label" => "Telefone"
			]);
		}
	}
}