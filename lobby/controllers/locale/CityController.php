<?php

class CityController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'city';
		$this->model = new CityModel();
	}
}