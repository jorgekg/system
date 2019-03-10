<?php

class StatesController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'states';
		$this->model = new StatesModel();
	}
}