<?php

class SchedulingController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'scheduling';
		$this->model = new SchedulingModel();
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