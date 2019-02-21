<?php

class PersonDocumentController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'document';
		$this->model = new PersonDocumentModel();
	}
}