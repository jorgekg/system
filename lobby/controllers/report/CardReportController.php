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
			"lobby_id" => $lobby_id,
			"type" => 1,
			"ORDER" =>  ["update_at" => "DESC"],
			"LIMIT" => 1
		]);
		$data0 = $this->asObject();
		if (empty($data0)) {
			$data0 = [];
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
			"situation" => [1,2,4],
			"active" => "S"
		]);
		if ($schedulingController->asObject()) {
			$data0[0]["today"] = count($schedulingController->asObject());
		} else {
			$data0[0]["today"] = 0;
		}

		$this->select([
			"company_id" => $company_id,
			"lobby_id" => $lobby_id,
			"type" => 2,
			"ORDER" =>  ["update_at" => "DESC"],
			"LIMIT" => 1
		]);
		$data1 = $this->asObject();
		if (empty($data1)) {
			$data1 = [];
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
			"situation" => [3],
			"active" => "S"
		]);
		if ($schedulingController->asObject()) {
			$data1[0]["today"] = count($schedulingController->asObject());
		} else {
			$data1[0]["today"] = 0;
		}
		$data0[1] = $data1[0];
		$this->data = $data0;
		return $this;
	}
}