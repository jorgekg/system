<?php

class EntityController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'entity';
		$this->model = new EntityModel();
	}
}