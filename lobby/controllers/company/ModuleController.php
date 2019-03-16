<?php

class ModuleController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'module';
		$this->model = new ModuleModel();
	}
}