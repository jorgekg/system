<?php

use Slim\Http\Request;
use Slim\Http\Response;

include __DIR__.'/../../controllers/procedures_requirement/ProcedureRequirementController.php';
include __DIR__.'/../../models/procedures_requirement/ProcedureRequirementModel.php';

$app->get('/procedures_requirement',
	function (Request $request, Response $response, array $args) use($database) {
		$reason = new ProcedureRequirementController($database);
		$reason->sessionIsRequired($request);
		$response->getBody()->write($reason->getByReason($request)->asJson());
		return $response;
});

$app->post('/procedures_requirement',
	function (Request $request, Response $response, array $args) use($database) {
		$reason = new ProcedureRequirementController($database);
		$reason->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($reason->insert($params)->asJson());
		return $response;
});

$app->delete('/procedures_requirement',
	function (Request $request, Response $response, array $args) use($database) {
		$requirement = new ProcedureRequirementController($database);
		$requirement->sessionIsRequired($request);
		$response->getBody()->write($requirement->delete($request)->asJson());
		return $response;
});