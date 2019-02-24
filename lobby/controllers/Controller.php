<?php

use Slim\Http\Request;

Class Controller {
	protected $table;	
	protected $database;
	protected $model;

	protected $data;
	protected $filter;

	public function sessionIsRequired($request) {
		$auth = $request->getHeader("Authorization");
		if (!empty($auth)) {
			$token = new TokenController($this->database);
			$tokens = $token->getCompanyId($auth[0])->asObject();
			if (!empty($tokens)) {
				return $this->filter[$this->table . ".company_id"] = $tokens[0]["company_id"];
			}
		}
		http_response_code(403);
		exit;
	}

	public function get(Request $params) {
		$this->getFilters($params);
		$this->data = $this->database->select(
			$this->table,
			'*',
			$this->filter
		);
		$this->hasError();
		return $this;
	}

	public function delete(Request $params) {
		$this->getFilters($params);
		$this->database->delete($this->table, [
			"AND" => $this->filter
		]);
		$this->hasError();
		return $this;
	}

	public function hasError() {
		if ($this->database->error()[0] == 23000) {
			$this->hasEmpty($this->database->error()[2]);
			echo json_encode([
				"error" => 401,
				"message" => "error.delete.fk"
			]);
			http_response_code(401);
			exit;
		} else if (
			$this->database->error()[0] > 0
		) {
			var_dump($this->database->error());
			http_response_code(500);
			exit;
		}
	}

	private function hasEmpty($error) {
		$fields = get_object_vars($this->model);
		if (!empty($fields)) {
			foreach($fields as $key => $value) {
				if ($error == "Column '{$key}' cannot be null") {
					echo json_encode([
						"error" => 400,
						"message" => "error.{$key}.null"
					]);
					http_response_code(400);
					exit;
				}
			}
		}
	}

	public function insert($data) {
		$this->database->insert($this->table, $data, $this->filter);
		$this->hasError();
		$this->getId();
		return $this;
	}

	public function update($data) {
		$this->filter["id"] = $data["id"];
		$this->database->update(
			$this->table, $data, $this->filter);
		$this->hasError();
		$this->getId($data["id"]);
		return $this;
	}

	public function getId($id = null) {
		$this->data = $this->database->select(
			$this->table, '*', ["id" => $id ? $id : $this->database->id()]
		);
		$this->hasError();
		return $this;
	}

	protected function getPagination($params = null) {
		$filter = [];
		if (!empty($params)) {
			$offset = $params->getQueryParam('offset');
			$size = $params->getQueryParam('size');
			$filter['LIMIT'] = 0;
		}
		return $filter;
	}

	protected function getFilters($params = null) {
		$fields = get_object_vars($this->model);
		if (!empty($fields) && !empty($params)) {
			foreach($fields as $key => $value) {
				$param = $params->getQueryParam($key);
				if (!empty($param)) {
					$this->filter[$key] = $param;
				}
			}
		}
	}

	public function asObject() {
		return $this->data;
	}

	public function asJson() {
		if (empty($this->data)) {
			$this->data = [];
		}
		return json_encode($this->data);
	}
}