<?php

use Slim\Http\Request;
use Slim\Http\Response;

include_once __DIR__.'/../../controllers/procedures_requirement/ProcedureRequirementController.php';
include_once __DIR__.'/../../models/procedures_requirement/ProcedureRequirementModel.php';

$app->get('/api/procedures_requirement',
	function (Request $request, Response $response, array $args) use($database) {
		$reason = new ProcedureRequirementController($database);
		$reason->sessionIsRequired($request);
		$response->getBody()->write($reason->getByReason($request)->asJson());
		return $response;
});

$app->get('/api/requirement_list_procedures',
	function (Request $request, Response $response, array $args) use($database) {
		$reason = new ProcedureRequirementController($database);
		$reason->sessionIsRequired($request);
		$response->getBody()->write($reason->getByListProcedures(
			$request->getQueryParam('procedures'),
			$reason->filter[$reason->table . ".company_id"]
		)->asJson());
		return $response;
});

$app->post('/api/procedures_requirement',
	function (Request $request, Response $response, array $args) use($database) {
		$reason = new ProcedureRequirementController($database);
		$reason->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($reason->insert($params)->asJson());
		return $response;
});

$app->get('/api/delete/procedures_requirement',
	function (Request $request, Response $response, array $args) use($database) {
		$requirement = new ProcedureRequirementController($database);
		$requirement->sessionIsRequired($request);
		$response->getBody()->write($requirement->delete($request)->asJson());
		return $response;
});