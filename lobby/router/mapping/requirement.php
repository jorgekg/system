<?php

use Slim\Http\Request;
use Slim\Http\Response;

include_once __DIR__.'/../../controllers/requirement/RequirementController.php';
include_once __DIR__.'/../../models/requirement/RequirementModel.php';

$app->get('/api/requirement',
	function (Request $request, Response $response, array $args) use($database) {
		$requirement = new RequirementController($database);
		$requirement->sessionIsRequired($request, 'view_entity');
		$response->getBody()->write($requirement->get($request)->asJson());
		return $response;
});

$app->get('/api/requirement_name',
	function (Request $request, Response $response, array $args) use($database) {
		$requirement = new RequirementController($database);
		$requirement->sessionIsRequired($request, 'view_entity');
		$response->getBody()->write($requirement->getByName($request)->asJson());
		return $response;
});

$app->post('/api/requirement',
	function (Request $request, Response $response, array $args) use($database) {
		$requirement = new RequirementController($database);
		$requirement->sessionIsRequired($request, 'insert_entity');
		$params = $request->getParsedBody();
		$response->getBody()->write($requirement->insert($params)->asJson());
		return $response;
});

$app->post('/api/put/requirement',
	function (Request $request, Response $response, array $args) use($database) {
		$requirement = new RequirementController($database);
		$requirement->sessionIsRequired($request, 'updat_entity');
		$params = $request->getParsedBody();
		$response->getBody()->write($requirement->update($params)->asJson());
		return $response;
});

$app->get('/api/delete/requirement',
	function (Request $request, Response $response, array $args) use($database) {
		$requirement = new RequirementController($database);
		$requirement->sessionIsRequired($request, 'delete_entity');
		$response->getBody()->write($requirement->delete($request)->asJson());
		return $response;
});