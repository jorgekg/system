<?php

class CompanyUserController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'company_user';
		$this->model = new CompanyUserModel();
	}
}