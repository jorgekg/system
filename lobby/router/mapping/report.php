<?php

use Slim\Http\Request;
use Slim\Http\Response;

include_once __DIR__.'/../../controllers/report/CardReportController.php';
include_once __DIR__.'/../../models/report/CardReportModel.php';

$app->get('/api/card_report',
	function (Request $request, Response $response, array $args) use($database) {
		$card = new CardReportController($database);
		$card->sessionIsRequired($request);
		$response->getBody()->write($card->getReport(
			$card->filter[$card->table . ".company_id"],
			$request->getQueryParam('lobby_id')
		)->asJson());
		return $response;
});

$app->post('/api/generate_card_report',
	function (Request $request, Response $response, array $args) use($database) {
		$card = new CardReportController($database);
		$card->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($card->createReport(
			$card->filter[$card->table . ".company_id"],
			$params["lobby_id"],
			false
		)->asJson());
		return $response;
});