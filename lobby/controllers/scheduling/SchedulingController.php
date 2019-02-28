<?php

class SchedulingController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'scheduling';
		$this->model = new SchedulingModel();
	}

	public function getSchedulings($name, $company, $situation = 1, $page = 0) {
		$this->data = $this->database->select(
			$this->table,[
				"[><]lobby" => ["lobby_id" => "id"]
			], [
				"lobby.name(lobby_name)",
				"scheduling.id",
				"scheduling.name",
				"scheduling.lobby_id",
				"scheduling.start_date",
				"scheduling.end_date"
			], [
				"scheduling.company_id" => $company,
				"scheduling.situation" => $situation,
				'GROUP' => [
					"lobby.name",
					"scheduling.id",
					"scheduling.name",
					"scheduling.lobby_id",
					"scheduling.start_date",
					"scheduling.end_date"
				],
				'LIMIT' => [$page, 10],
			]
		);
		for($i = 0; $i < count($this->data); $i++){
			$this->data[$i]["responsibles"] = $this->getResponsible($this->data[$i]["id"]);
			$this->data[$i]["visitors"] = $this->getVisitor($this->data[$i]["id"]);
		}
		return $this;
	}

	private function getResponsible($id) {
		$responsible = new SchedulingResponsibleController($this->database);
		$responsible->select([
			"scheduling_id" => $id
			], [
				"person.name",
				"scheduling_responsible.id",
				"scheduling_responsible.active"
			], [
				"[><]person" => ["person_id" => "id"]
		]);
		return $responsible->asObject();
	}

	private function getVisitor($id) {
		$visitor = new SchedulingVisitorController($this->database);
		$visitor->data = null;
		$visitor->select([
			"scheduling_id" => $id
			], [
				"person.name",
				"scheduling_visitor.id",
				"scheduling_visitor.active"
			], [
				"[><]person" => ["person_id" => "id"]
		]);
		return $visitor->asObject();
	}

	public function getSchedulingById($id, $company) {
		$this->data = $this->database->select(
			$this->table, '*', [
				"id" => $id,
				"company_id" => $company
			]
		);
	}

	public function createScheduling($scheduling) {
		$id = null;
		$this->database->action(function($database) use ($scheduling, &$id) {
			$schedulingController = new SchedulingController($database);
			$this->filter = [];
			$schedulingController->insert([
				"company_id" => $scheduling["company_id"],
				"name" => "Agendamento",
				"lobby_id" => $scheduling["lobby_id"],
				"start_date" => $scheduling["start_date"],
				"end_date" => $scheduling["end_date"],
				"situation" => 1,
				"active" => $scheduling["active"]
			]);
			$schedulingResult = $schedulingController->asObject();
			$id = $schedulingResult[0]["id"];
			$schedulingProceduresController = new SchedulingProceduresController($database);
			if (!empty($scheduling["procedures"])) {
				foreach($scheduling["procedures"] as $procedures) {
					$schedulingProceduresController->insert([
						"company_id" => $scheduling["company_id"],
						"scheduling_id" => $id,
						"procedure_id" => $procedures["id"]
					]);
				}
				if (!empty($scheduling["responsibles"])) {
					$schedulingResponsibleController = new SchedulingResponsibleController($database);
					foreach($scheduling["responsibles"] as $responsible) {
						$schedulingResponsibleController->insert([
							"company_id" => $scheduling["company_id"],
							"scheduling_id" => $id,
							"person_id" => $responsible["person"]["id"],
							"active" => "S"
						]);
					}
					if (!empty($scheduling["visitors"])) {
						$schedulingVisitorController = new SchedulingVisitorController($database);
						foreach($scheduling["visitors"] as $visitor) {
							$schedulingVisitorController->insert([
								"company_id" => $scheduling["company_id"],
								"scheduling_id" => $id,
								"person_id" => $visitor["person"]["id"],
								"active" => "S"
							]);
						}
						return true;
					} else {
						echo json_encode(["code" => 400, "message" => "visitor.requires"]);
						http_response_code(400);
						exit;
					}
				} else {
					echo json_encode(["code" => 400, "message" => "responsibles.requires"]);
					http_response_code(400);
					exit;
				}
			} else {
				echo json_encode(["code" => 400, "message" => "procedures.requires"]);
				http_response_code(400);
				exit;
			}
		});
		$this->getSchedulingById($id, $scheduling["company_id"]);
		return $this;
	}
}