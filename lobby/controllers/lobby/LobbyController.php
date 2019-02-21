<?php

class LobbyController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'lobby';
		$this->model = new LobbyModel();
	}
}