<?php

class VisitorCheckinController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'visitor_checkin';
		$this->model = new VisitorCheckinModel();
	}

	public function insertCheckin($checkin) {
		$checkinReturn = null;
		$this->database->action(function($database) use ($checkin, &$checkinReturn) {
			$checkinController = new VisitorCheckinController($database);
			$checkinController->insert($checkin);
			$checkinReturn = $checkinController->asObject();
			$visitorController = new SchedulingVisitorController($database);
			$visitorController->select([
				"id" => $checkin["visitor_id"],
				"company_id" => $checkin["company_id"]
			]);
			if (!empty($visitorController->asObject())) {
				$visitor = $visitorController->asObject()[0];
				$schedulingController = new SchedulingController($database);
				$schedulingController->update([
					"id" => $visitor["scheduling_id"],
					"situation" => 4
				]);
				return true;
			} else {
				echo json_encode(["code" => "404", "message" => "visitor.not.found"]);
				http_response_code(404);
				exit;
			}
		});
		$this->data = $checkinReturn;
		return $this;
	}

	public function unCheckin($checkin) {
		$this->database->action(function($database) use ($checkin, &$checkinReturn) {
			$checkinController = new VisitorCheckinController($database);
			$checkinController->update([
				"id" => $checkin["id"],
				"company_id" => $checkin["company_id"],
				"active" => "N"
			]);
			$visitorController = new SchedulingVisitorController($database);
			$visitorController->select([
				"id" => $checkin["visitor_id"],
				"company_id" => $checkin["company_id"]
			]);
			if (!empty($visitorController->asObject())) {
				$visitor = $visitorController->asObject()[0];
				$visitorController->select([
					"scheduling_id" => $visitor["scheduling_id"]
				]);
				$visitorList = $visitorController->asObject();
				$updateScheduling = true;
				foreach($visitorList as $vto) {
					$checkinController->getCheckinByVisitor($vto["id"], $checkin["company_id"]);
					if (!empty($checkinController->asObject())) {
						$updateScheduling = false;
						break;
					}
				}
				if ($updateScheduling) {
					$schedulingController = new SchedulingController($database);
					$schedulingController->update([
						"id" => $visitor["scheduling_id"],
						"situation" => 1
					]);
				}
				return true;
			} else {
				echo json_encode(["code" => "404", "message" => "visitor.not.found"]);
				http_response_code(404);
				exit;
			}
		});
		$this->data = [];
		return $this;
	}

	public function getCheckinByVisitor($visitor_id, $company_id) {
		$this->select([
			"visitor_id" => $visitor_id,
			"company_id" => $company_id,
			"active" => "S"
		]);
		$this->hasError();
		return $this;
	}

}