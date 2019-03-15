<?php

class SchedulingNotificationController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'scheduling_notification';
		$this->model = new SchedulingNotificationModel();
	}

	public function notifyByScheduling($scheduling, $type) {
		$this->insert([
			"company_id" => $scheduling["company_id"],
			"type" => $type,
			"contents" => json_encode($scheduling)
		]);
	}
}