<?php

class CardReportController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'card_report';
		$this->model = new CardReportModel();
	}

	public function getReport($company_id, $lobby_id) {
		$this->select([
			"company_id" => $company_id,
			"lobby_id" => $lobby_id
		]);
		$data = $this->asObject();
		if (!empty($data)) {

		}
		$date = new DateTime();
		$endDate = clone $date;
		$endDate->add(new DateInterval("P1D")); 
		$schedulingController = new SchedulingController($this->database);
		$schedulingController->select([
			"company_id" => $company_id,
			"lobby_id" => $lobby_id,
			"start_date[>=]" => $date->format('Y-m-d'),
			"start_date[<]" => $endDate->format('Y-m-d'),
		]);
		if (empty($data)) {
			$data = [];
		}
		if ($schedulingController->asObject()) {
			$data[0]["today"] = count($schedulingController->asObject());
		} else {
			$data[0]["today"] = 0;
		}
		$this->data = $data;
		return $this;
	}
}