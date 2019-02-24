<?php

class SchedulingVisitorController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'scheduling_visitor';
		$this->model = new SchedulingVisitorModel();
	}
}