<?php

use Slim\Http\Request;

Class Controller {
	public $table;	
	public $database;
	public $token;
	protected $model;
	protected $entity;

	protected $data;
	protected $totalElements;
	public $filter;

	public function sessionIsRequired($request, $permission = null) {
		$auth = $request->getHeader("Authorization");
		if (!empty($auth)) {
			$token = new TokenController($this->database);
			$tokens = $token->getCompanyId($auth[0])->asObject();
			if (!empty($tokens)) {
				$this->token = $tokens[0];
				if (!empty($permission)) {
					$this->validatePermission($this->table, $permission);
				}
				return $this->filter[$this->table . ".company_id"] = $tokens[0]["company_id"];
			}
		}
		http_response_code(403);
		exit;
	}

	public function validateUserEntity($user_id, $company_id, $permission) {
		$permissionController = new CompanyPermissionController($this->database);
		$data = $permissionController->select([
			"company_id" => $company_id,
			"company_user_id" => $user_id,
			"entity" => $this->entity
		])->asObject();
		if (!empty($data)) {
			if (!empty($data[0][$permission])) {
				return true;
			}
		}
		http_response_code(403);
		exit;
	}

	public function get(Request $params) {
		$this->getFilters($params);
		$this->getTotalRows();
		$this->data = $this->database->select(
			$this->table,
			'*',
			$this->filter
		);
		$this->hasError();
		return $this;
	}

	public function select($params) {
		$this->data = $this->database->select(
			$this->table,
			"*",
			$params
		);
		$this->hasError();
		return $this;
	}

	public function getTotalRows() {
		$filter = $this->filter;
		unset($filter["LIMIT"]);
		$this->totalElements = $this->database->count($this->table, $filter);
		$this->hasError();
	}

	public function delete(Request $params) {
		$this->getFilters($params);
		unset($this->filter["LIMIT"]);
		$this->database->delete($this->table, [
			"AND" => $this->filter
		]);
		$this->hasError();
		return $this;
	}

	public function hasError() {
		//var_dump($this->database->error());
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

	public function validatePermission($entity, $permission) {
		$permissions = $this->database->select(
		'company_permission', 
		[
			"[><]entity" => ["entity_id" => "id"]
		], [
			"entity.name(entity)",
			"company_permission.view_entity",
			"company_permission.insert_entity",
			"company_permission.updat_entity",
			"company_permission.delete_entity",
		], [
			"company_permission.company_id" => $this->token["company_id"],
			"company_permission.user_company_id" => $this->token["company_user_id"]
		]);
		foreach($permissions as $value) {
			if ($value['entity'] == $entity) {
				if ($value[$permission] != 1) {
					http_response_code(403);
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
		if (!empty($data["abs_id"])) {
			$this->filter["abs_id"] = $data["abs_id"];
		} else {
			$this->filter["id"] = $data["id"];
		}
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
			$offset = $params->getQueryParam('offset');
			$size = $params->getQueryParam('size');
			$this->filter['LIMIT'] = [
				!empty($offset) ? $offset : 0,
				!empty($size) ? $size : 10,
			];

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
		$this->getPagination($params);
	}

	public function asObject() {
		return $this->data;
	}

	public function asJson() {
		if (empty($this->data)) {
			$this->data = [];
		}
		return json_encode(
			["totalElements" => $this->totalElements, "contents" => $this->data]
		);
	}
}