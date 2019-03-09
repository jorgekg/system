<?php

class SchedulingNotificationController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'scheduling_notification';
		$this->model = new SchedulingNotificationModel();
	}

	public function notifyByScheduling($scheduling, $isUpdate = false) {
		$this->insert([
			"company_id" => $scheduling["company_id"],
			"type" => $isUpdate ?  "update_scheduling" : "insert_scheduling",
			"contents" => json_encode($scheduling)
		]);
	}
}