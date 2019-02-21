<?php

class DocumentTypeController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'document_type';
		$this->model = new DocumentTypeModel();
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
				"type" => "CPF",
				"label" => "CPF",
				"mask" => "000.000.000-00"
			]);
			$this->hasError();
		}
	}
}