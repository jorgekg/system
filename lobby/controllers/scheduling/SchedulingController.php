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
		$this->totalElements = $this->database->count($this->table, [
			"company_id" => $company,
			"situation" => $situation,
			"active" => "S"
		]);
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
				"scheduling.situation" => $situation == 1 ? [$situation, 4] : $situation,
				"scheduling.active" => "S",
				'GROUP' => [
					"lobby.name",
					"scheduling.id",
					"scheduling.name",
					"scheduling.lobby_id",
					"scheduling.start_date",
					"scheduling.end_date"
				],
				"ORDER" => [
					"scheduling.start_date" => "ASC"
				],
				'LIMIT' => [$page, 10],
			]
		);
		for($i = 0; $i < count($this->data); $i++){
			$this->data[$i]["responsibles"] = $this->getResponsible($this->data[$i]["id"]);
			$this->data[$i]["visitors"] = $this->getVisitor($this->data[$i]["id"]);
			$this->data[$i]["procedures"] = $this->getProcedures($this->data[$i]["id"]);

		}
		return $this;
	}

	private function getDate($date) {
		$startDate = null;
		try {
			$startDate = DateTime::createFromFormat('Y-m-d', $date);
		} catch(Exception $e) {
			$startDate = new DateTime();
		}
		$startDate->setTime(0,0,0);
		$endDate = clone $startDate;
		$endDate->add(new DateInterval("P1D"));
		return [$startDate, $endDate];
	}

	public function cloneScheduling($scheduling) {
		$id = null;
		$this->database->action(function($database) use ($scheduling, &$id) {
			$schedulingNotification = new SchedulingNotificationController($database);
			$schedulingNotification->notifyByScheduling($scheduling, "redial_scheduling");
			$controller = new SchedulingController($database);
			$controller->filter["company_id"] = $scheduling["company_id"];
			$controller->update([
				"id" => $scheduling["id"],
				"situation" => 3,
				"active" => "S"
			]);
			$controller->hasError();
			$scheduling["abs_id"] = null;
			$scheduling["id"] = null;
			$controller->insertScheduling($database, $scheduling, $id);
		});
		$this->getSchedulingById($id, $scheduling["company_id"]);
		return $this;
	}

	public function getReceptions($name, $company, $situation = 1, $lobby_id = 0, $date = "", $page = 0) {
		$date = $this->getDate($date);
		$this->totalElements = count(
			$this->database->select(
				$this->table,[
					"[><]scheduling_visitor" => ["scheduling.id" => "scheduling_id"],
					"[><]lobby" => ["scheduling.lobby_id" => "id"]
				], [
					"lobby.name(lobby_name)",
					"scheduling_visitor.id(visitor_id)",
					"scheduling.id",
				], [
					"lobby.id" => $lobby_id,
					"scheduling.company_id" => $company,
					"scheduling.situation" => $situation,
					"scheduling.active" => "S",
					"scheduling.start_date[>]" => $date[0]->format('Y-m-d H:i:s'),
					"scheduling.start_date[<]" => $date[1]->format('Y-m-d H:i:s')
				]
			)
		);
		$this->data = $this->database->select(
			$this->table,[
				"[><]scheduling_visitor" => ["scheduling.id" => "scheduling_id"],
				"[><]lobby" => ["scheduling.lobby_id" => "id"]
			], [
				"lobby.name(lobby_name)",
				"scheduling_visitor.id(visitor_id)",
				"scheduling_visitor.person_id(visitor_person_id)",
				"scheduling.id",
				"scheduling.name",
				"scheduling.company_id",
				"scheduling.lobby_id",
				"scheduling.start_date",
				"scheduling.end_date",
			], [
				"lobby.id" => $lobby_id,
				"scheduling.company_id" => $company,
				"scheduling.situation" => $situation,
				"scheduling.active" => "S",
				"scheduling.start_date[>]" => $date[0]->format('Y-m-d H:i:s'),
				"scheduling.start_date[<]" => $date[1]->format('Y-m-d H:i:s'),
				"ORDER" => [
					"scheduling.start_date" => "ASC"
				],
				'LIMIT' => [$page, 10],
			]
		);
		$this->hasError();
		$person = new PersonController($this->database);
		$checkin = new VisitorCheckinController($this->database);
		for($i = 0; $i < count($this->data); $i++){
			$this->data[$i]["responsibles"] = $this->getResponsible($this->data[$i]["id"]);
			$this->data[$i]["procedures"] = $this->getProcedures($this->data[$i]["id"]);
			if (empty($this->data[$i]["visitors"])) {
				$this->data[$i]["visitors"] = [];
			}
			$this->data[$i]["visitors"][0]["id"] = $this->data[$i]["visitor_id"];
			$this->data[$i]["visitors"][0]["checkin"] = $checkin->getCheckinByVisitor(
				$this->data[$i]["visitor_id"],
				$this->data[$i]["company_id"]
			)->asObject();
			$personData = ($person->getPerson($this->data[$i]["visitor_person_id"]))->asObject();
			if (!empty($personData)) {
				$this->data[$i]["visitors"][0]["person"] = $personData[0];
			}
		}
		return $this;
	}

	private function getProcedures($id) {
		$procedureSchedulingController = new SchedulingProceduresController($this->database);
		$procedureSchedulingController->select([
			"scheduling_id" => $id 
		]);
		$proceduresController = new ProceduresController($this->database);
		for($i = 0; $i < count($procedureSchedulingController->data); $i++){
			$procedures = (
				$proceduresController->select([
					"id" => $procedureSchedulingController->data[$i]["procedure_id"]
				])
			)->asObject();
			if (!empty($procedures)) {
				$procedureSchedulingController->data[$i]["procedures"] = $procedures[0];
			}
		}
		return $procedureSchedulingController->asObject();
	}

	private function getResponsible($id) {
		$responsible = new SchedulingResponsibleController($this->database);
		$responsible->select([
			"scheduling_id" => $id
		]);
		$person = new PersonController($this->database);
		for($i = 0; $i < count($responsible->data); $i++){
			$personData = ($person->getPerson($responsible->data[$i]["person_id"]))->asObject();
			if (!empty($personData)) {
				$responsible->data[$i]["person"] = $personData[0];
			}
		}
		return $responsible->asObject();
	}

	private function getVisitor($id) {
		$visitor = new SchedulingVisitorController($this->database);
		$visitor->select([
			"scheduling_id" => $id
		]);
		$person = new PersonController($this->database);
		$checkin = new VisitorCheckinController($this->database);
		for($i = 0; $i < count($visitor->data); $i++){
			$personData = ($person->getPerson($visitor->data[$i]["person_id"]))->asObject();
			if (!empty($personData)) {
				$visitor->data[$i]["person"] = $personData[0];
			}
			$checkinData = $checkin->getCheckinByVisitor(
				$visitor->data[$i]["id"],
				$visitor->data[$i]["company_id"]
			)->asObject();
			if (!empty($checkinData)) {
				$visitor->data[$i]["checkin"] = $checkinData;
			}
		}
		return $visitor->asObject();
	}

	public function getSchedulingById($id, $company) {
		$this->data = $this->database->select(
			$this->table,[
				"[><]lobby" => ["lobby_id" => "id"]
			], [
				"lobby.name(lobby_name)",
				"lobby.id(lobby_id)",
				"scheduling.id",
				"scheduling.abs_id",
				"scheduling.name",
				"scheduling.situation",
				"scheduling.lobby_id",
				"scheduling.start_date",
				"scheduling.end_date"
			], [
				"scheduling.company_id" => $company,
				"scheduling.id" => $id
			]
		);
		for($i = 0; $i < count($this->data); $i++){
			$this->data[$i]["responsibles"] = $this->getResponsible($this->data[$i]["id"]);
			$this->data[$i]["visitors"] = $this->getVisitor($this->data[$i]["id"]);
			$this->data[$i]["procedures"] = $this->getProcedures($this->data[$i]["id"]);
		}
		return $this;
	}

	private function isSchedulinPending($scheudling) {
		if (!empty($scheduling["situation"]) && $scheduling["situation"] != 1) {
			echo json_encode(["code" => 400, "message" => "schedulig.not.edit"]);
			exit;
		}
	}

	public function createScheduling($scheduling) {
		$this->isSchedulinPending($scheduling);
		$id = null;
		$this->database->action(function($database) use ($scheduling, &$id) {
			$schedulingNotification = new SchedulingNotificationController($database);
			if (!empty($scheduling["abs_id"])) {
				$schedulingNotification->notifyByScheduling($scheduling, "update_scheduling");
				$schedulingController = new SchedulingController($database);
				$schedulingController->select([
					"abs_id" => $scheduling["abs_id"],
					"company_id" => $scheduling["company_id"],
					"active" => "S"
				]);
				$this->removeOldVersioon($schedulingController);
				$schedulingController->hasError();
			} else {
				$dt1 = DateTime::createFromFormat('Y-m-d H:i', $scheduling["start_date"]);
				$dt2 = DateTime::createFromFormat('Y-m-d H:i', $scheduling["end_date"]);
				if ($dt1 < new DateTime()) {
					echo json_encode(["code" => 400, "message" => "start_date.minor.today"]);
					http_response_code(400);
					exit;
				}
				if ($dt1 >= $dt2) {
					echo json_encode(["code" => 400, "message" => "start_date.minor.end_date"]);
					http_response_code(400);
					exit;
				}
				$schedulingNotification->notifyByScheduling($scheduling, "insert_scheduling");
			}
			return $this->insertScheduling($database, $scheduling, $id);
		});
		$this->getSchedulingById($id, $scheduling["company_id"]);
		return $this;
	}

	private function removeOldVersioon($schedulingController) {
		$oldVersion = $schedulingController->asObject();
		if (!empty($oldVersion)) {
			foreach($oldVersion as $old) {
				$schedulingController->update([
					"id" => $old["id"],
					"active" => "N"
				]);
			}
		}
	}

	private function insertScheduling($database, $scheduling, &$id) {
		$schedulingController = new SchedulingController($database);
		$this->filter = [];
		$schedulingController->insert([
			"company_id" => $scheduling["company_id"],
			"name" => "Agendamento",
			"abs_id" => !empty($scheduling["abs_id"]) ? $scheduling["abs_id"] : uniqid(),
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
	}

	public function notifyFinish($scheudlingId, $company_id) {
		$this->database->action(function($database) use ($scheudlingId, $company_id) {
			$schedulingController = new SchedulingController($database);
			$visitors = $schedulingController->getVisitor($scheudlingId);
			$schedulingRatingController = new SchedulingRatingController($this->database);
			$schedulingNotification = new SchedulingNotificationController($this->database);
			foreach ($visitors as $visitor) {
				$id = $visitor["id"];
				$schedulingRatingController->insert([
					"company_id" => $company_id,
					"scheduling_id" => $scheudlingId,
					"visitor_id" => $visitor["id"],
					"link" => sha1("{$scheudlingId} {$id}")
				]);
				$schedulingRatingController->hasError();
			}
			$scheduling = [
				"company_id" => $company_id,
				"scheduling_id" => $scheudlingId,
				"visitors" => $visitors
			];
			$schedulingNotification->notifyByScheduling($scheduling, "finish_scheduling");
			$schedulingNotification->hasError();
			return true;
		});
	}

	public function unFinish($scheduling) {
		$this->database->action(function($database) use ($scheduling, &$id) {
			$visitors = $this->getVisitor($scheduling["id"]);
			$isPending = true;
			$visitorCheckin = new VisitorCheckinController($database);
			foreach($visitors as $visitor) {
				$visitorCheckin->getCheckinByVisitor($visitor["id"], $scheduling["company_id"]);
				if (!empty($visitorCheckin->asObject())) {
					$isPending = false;
				}
			}
			$schedulingController = new SchedulingController($database);
			$schedulingController->update([
				"id" => $scheduling["id"],
				"company_id" => $scheduling["company_id"],
				"situation" => $isPending ? 1 : 4
			]);
			return true;
		});
		$this->data = [];
		return $this;
	}
}