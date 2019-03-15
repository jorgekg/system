<?php
require_once __DIR__."/../controllers/Controller.php";
require_once __DIR__."/../controllers/report/CardReportController.php";
require_once __DIR__."/../models/report/CardReportModel.php";
try {
	$listCompany = $database->select('scheduling', 'company_id', ["GROUP" => "company_id"]);
	if (!empty($listCompany)) {
		foreach($listCompany as $company) {
			$listLobby = $database->select('scheduling', 'lobby_id', [
				"company_id" => $company,
				"GROUP" => "lobby_id"
			]);
			if (!empty($listLobby)) {
				foreach($listLobby as $lobby) {
					$controller = new CardReportController($database);
					$controller->createReport($company, $lobby);
				}
			}
		}
	}
} catch (Exception $e) {

}