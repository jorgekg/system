<?php

class ProceduresController  extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'procedures';
		$this->model = new ProceduresModel();
	}
}