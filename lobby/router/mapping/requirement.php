<?php

use Slim\Http\Request;
use Slim\Http\Response;

include __DIR__.'/../../controllers/requirement/RequirementController.php';
include __DIR__.'/../../models/requirement/RequirementModel.php';

$app->get('/requirement',
	function (Request $request, Response $response, array $args) use($database) {
		$requirement = new RequirementController($database);
		$requirement->sessionIsRequired($request);
		$response->getBody()->write($requirement->get($request)->asJson());
		return $response;
});

$app->get('/requirement_name',
	function (Request $request, Response $response, array $args) use($database) {
		$requirement = new RequirementController($database);
		$requirement->sessionIsRequired($request);
		$response->getBody()->write($requirement->getByName($request)->asJson());
		return $response;
});

$app->post('/requirement',
	function (Request $request, Response $response, array $args) use($database) {
		$requirement = new RequirementController($database);
		$requirement->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($requirement->insert($params)->asJson());
		return $response;
});

$app->put('/requirement',
	function (Request $request, Response $response, array $args) use($database) {
		$requirement = new RequirementController($database);
		$requirement->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($requirement->update($params)->asJson());
		return $response;
});

$app->delete('/requirement',
	function (Request $request, Response $response, array $args) use($database) {
		$requirement = new RequirementController($database);
		$requirement->sessionIsRequired($request);
		$response->getBody()->write($requirement->delete($request)->asJson());
		return $response;
});