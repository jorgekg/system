<?php

try {
	$data = new DateTime();
	$listCompany = $database->select('scheduling', 'company_id', ["GROUP" => "company_id"]);
	if (!empty($listCompany)) {
		foreach($listCompany as $company) {
			$listLobby = $database->select('scheduling', 'lobby_id', [
				"company_id" => $company,
				"GROUP" => "lobby_id"
			]);
			if (!empty($listLobby)) {
				$yearDate = (int ) $data->format('Y');
				$dayDate = (int) $data->format('t');
				$mouthDate = (int) $data->format('m');
				$weekStart = date("Y-m-d", strtotime('monday this week'));
				$weekEnd = new DateTime(date("Y-m-d", strtotime('sunday this week')));
				$weekEnd->add(new DateInterval('P7D'));
				foreach($listLobby as $lobby) {
					$totalYear = $database->query(
						"select count(*) as total from scheduling
						where situation in (1,2,4)
						and company_id = {$company}
						and lobby_id = {$lobby}
						and start_date >= '{$yearDate}-01-01'
						and start_date < '{($yearDate+1)}-01-01
						and active = 'S'
						"
					)->fetchAll();
					$totalMonth = $database->query(
						"select count(*) as total from scheduling
						where situation in (1,2,4)
						and company_id = {$company}
						and lobby_id = {$lobby}
						and start_date >= '{$yearDate}-{$mouthDate}-01'
						and start_date < '{$yearDate}-{$mouthDate}-{$dayDate}'
						and active = 'S'
						"
					)->fetchAll();
					$totalWeek = $database->query(
						"select count(*) as total from scheduling
						where situation in (1,2,4)
						and company_id = {$company}
						and lobby_id = {$lobby}
						and start_date >= '{$weekStart}'
						and start_date < '{$weekEnd->format('Y-m-d')}'
						and active = 'S'
						"
					)->fetchAll();
					$database->insert('card_report', [
						"company_id" => $company,
						"lobby_id" => $lobby,
						"year" => $totalYear[0]["total"],
						"month" => $totalMonth[0]["total"],
						"week" => $totalMonth[0]["total"],
						"update_at" => date('Y-m-d h:i:s'),
						"type" => 1
					]);
					var_dump($database->error());
					$totalYear = $database->query(
						"select count(*) as total from scheduling
						where situation = 3
						and company_id = {$company}
						and lobby_id = {$lobby}
						and start_date >= '{$yearDate}-01-01'
						and start_date < '{($yearDate+1)}-01-01'
						and active = 'S'
						"
					)->fetchAll();
					$totalMonth = $database->query(
						"select count(*) as total from scheduling
						where situation = 3
						and company_id = {$company}
						and lobby_id = {$lobby}
						and start_date >= '{$yearDate}-{$mouthDate}-01'
						and start_date < '{$yearDate}-{$mouthDate}-{$dayDate}'
						and active = 'S'
						"
					)->fetchAll();
					$totalWeek = $database->query(
						"select count(*) as total from scheduling
						where situation = 3
						and company_id = {$company}
						and lobby_id = {$lobby}
						and start_date >= '{$weekStart}'
						and start_date < '{$weekEnd->format('Y-m-d')}'
						and active = 'S'
						"
					)->fetchAll();
					$database->insert('card_report', [
						"company_id" => $company,
						"lobby_id" => $lobby,
						"year" => $totalYear[0]["total"],
						"month" => $totalMonth[0]["total"],
						"week" => $totalMonth[0]["total"],
						"update_at" => date('Y-m-d h:i:s'),
						"type" => 2
					]);
				}
			}
		}
	}
} catch (Exception $e) {

}