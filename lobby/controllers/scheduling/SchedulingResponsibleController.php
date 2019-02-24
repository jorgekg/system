<?php

class SchedulingResponsibleController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'scheduling_responsible';
		$this->model = new SchedulingResponsibleModel();
	}
}