<?php

class PersonController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'person';
		$this->model = new PersonModel();
	}
}