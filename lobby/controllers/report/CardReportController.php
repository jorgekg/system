<?php

class CardReportController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'card_report';
		$this->model = new CardReportModel();
	}

	public function createReport($company, $lobby, $log = true) {
		date_default_timezone_set('America/Sao_Paulo');
		$data = new DateTime();
		$yearDate = (int) $data->format('Y');
		$dayDate = (int) $data->format('t');
		$mouthDate = (int) $data->format('m');
		$weekStart = date("Y-m-d", strtotime('monday this week'));
		$weekEnd = new DateTime(date("Y-m-d", strtotime('sunday this week')));
		$weekEnd->add(new DateInterval('P7D'));
		$totalYear = $this->database->query(
			"select count(*) as total from scheduling
			where situation in (1,2,4)
			and company_id = {$company}
			and lobby_id = {$lobby}
			and start_date >= '{$yearDate}-01-01'
			and start_date < '{($yearDate+1)}-01-01
			and active = 'S'
			"
		)->fetchAll();
		$totalMonth = $this->database->query(
			"select count(*) as total from scheduling
			where situation in (1,2,4)
			and company_id = {$company}
			and lobby_id = {$lobby}
			and start_date >= '{$yearDate}-{$mouthDate}-01'
			and start_date < '{$yearDate}-{$mouthDate}-{$dayDate}'
			and active = 'S'
			"
		)->fetchAll();
		$totalWeek = $this->database->query(
			"select count(*) as total from scheduling
			where situation in (1,2,4)
			and company_id = {$company}
			and lobby_id = {$lobby}
			and start_date >= '{$weekStart}'
			and start_date < '{$weekEnd->format('Y-m-d')}'
			and active = 'S'
			"
		)->fetchAll();
		$this->database->insert('card_report', [
			"company_id" => $company,
			"lobby_id" => $lobby,
			"year" => !empty($totalYear) ? $totalYear[0]["total"] : 0,
			"month" => !empty($totalMonth) ? $totalMonth[0]["total"] : 0,
			"week" => !empty($totalWeek) ? $totalWeek[0]["total"] : 0,
			"update_at" => date('Y-m-d h:i:s'),
			"type" => 1
		]);
		if ($log) {
			var_dump($this->database->error());
		}
		$totalYear = $this->database->query(
			"select count(*) as total from scheduling
			where situation = 3
			and company_id = {$company}
			and lobby_id = {$lobby}
			and start_date >= '{$yearDate}-01-01'
			and start_date < '{($yearDate+1)}-01-01'
			and active = 'S'
			"
		)->fetchAll();
		$totalMonth = $this->database->query(
			"select count(*) as total from scheduling
			where situation = 3
			and company_id = {$company}
			and lobby_id = {$lobby}
			and start_date >= '{$yearDate}-{$mouthDate}-01'
			and start_date < '{$yearDate}-{$mouthDate}-{$dayDate}'
			and active = 'S'
			"
		)->fetchAll();
		$totalWeek = $this->database->query(
			"select count(*) as total from scheduling
			where situation = 3
			and company_id = {$company}
			and lobby_id = {$lobby}
			and start_date >= '{$weekStart}'
			and start_date < '{$weekEnd->format('Y-m-d')}'
			and active = 'S'
			"
		)->fetchAll();
		$this->database->insert('card_report', [
			"company_id" => $company,
			"lobby_id" => $lobby,
			"year" => !empty($totalYear) ? $totalYear[0]["total"] : 0,
			"month" => !empty($totalMonth) ? $totalMonth[0]["total"] : 0,
			"week" => !empty($totalWeek) ? $totalWeek[0]["total"] : 0,
			"update_at" => date('Y-m-d h:i:s'),
			"type" => 2
		]);
		if ($log) {
			var_dump($this->database->error());
		}
		return $this;
	}

	public function getReport($company_id, $lobby_id) {
		$this->select([
			"company_id" => $company_id,
			"lobby_id" => $lobby_id,
			"type" => 1,
			"ORDER" =>  ["update_at" => "DESC"],
			"LIMIT" => 1
		]);
		$open = $this->asObject();
		if (empty($open)) {
			$open = [];
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
			$open[0]["today"] = count($schedulingController->asObject());
		} else {
			$open[0]["today"] = 0;
		}

		$this->select([
			"company_id" => $company_id,
			"lobby_id" => $lobby_id,
			"type" => 2,
			"ORDER" =>  ["update_at" => "DESC"],
			"LIMIT" => 1
		]);
		$closed = $this->asObject();
		if (empty($closed)) {
			$closed = [];
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
			$closed[0]["today"] = count($schedulingController->asObject());
		} else {
			$closed[0]["today"] = 0;
		}
		$open[1] = $closed[0];
		$this->data = $open;
		return $this;
	}
}