<?php

class TokenController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'token';
		$this->model = new TokenModel();
	}

	public function getCompanyId($token) {
		$this->data = $this->database->select(
			$this->table, "*", [
				"token" => $token
			]
		);
		return $this;
	}

	public function create($params) {
		$this->data = $this->database->select(
			"company_user", "*", [
				"email" => $params["email"],
				"password" => $params["password"],
				"active" => "S"
			]
		);
		if (empty($this->data) && empty($this->data[0]["company_id"])) {
			echo json_encode(["error" => 404, "message" => "company.invalid"]);
			http_response_code(404);
			exit;
		}
		$this->insert([
			"company_id" => $this->data[0]["company_id"],
			"token" => sha1(uniqid())
		]);
		return $this;
	}
}