<?php

class CompanyController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'company';
		$this->model = new CompanyModel();
	}
}