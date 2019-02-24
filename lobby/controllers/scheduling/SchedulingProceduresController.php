<?php

class SchedulingProceduresController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'scheduling_procedures';
		$this->model = new SchedulingProceduresModel();
	}
}