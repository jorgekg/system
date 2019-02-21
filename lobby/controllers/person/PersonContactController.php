<?php

class PersonContactController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'contact';
		$this->model = new PersonContactModel();
	}
}