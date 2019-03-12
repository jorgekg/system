<?php

use Slim\Http\Request;
use Slim\Http\Response;

include_once __DIR__.'/../../controllers/procedures/ProceduresController.php';
include_once __DIR__.'/../../controllers/scheduling/VisitorCheckinController.php';
include_once __DIR__.'/../../models/procedures/ProceduresModel.php';
include_once __DIR__.'/../../models/scheduling/VisitorCheckinModel.php';

$app->get('/api/procedures',
	function (Request $request, Response $response, array $args) use($database) {
		$procedures = new ProceduresController($database);
		$procedures->sessionIsRequired($request);
		$response->getBody()->write($procedures->get($request)->asJson());
		return $response;
});

$app->post('/api/procedures',
	function (Request $request, Response $response, array $args) use($database) {
		$procedures = new ProceduresController($database);
		$procedures->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($procedures->insert($params)->asJson());
		return $response;
});

$app->post('/api/put/procedures',
	function (Request $request, Response $response, array $args) use($database) {
		$procedures = new ProceduresController($database);
		$procedures->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($procedures->update($params)->asJson());
		return $response;
});

$app->get('/api/delete/procedures',
	function (Request $request, Response $response, array $args) use($database) {
		$procedures = new ProceduresController($database);
		$procedures->sessionIsRequired($request);
		$response->getBody()->write($procedures->delete($request)->asJson());
		return $response;
});

$app->get('/api/procedures_name',
	function (Request $request, Response $response, array $args) use($database) {
		$procedures = new ProceduresController($database);
		$procedures->sessionIsRequired($request);
		$response->getBody()->write($procedures->getByName(
			$request->getQueryParam('name'),
			$procedures->filter[$procedures->table . ".company_id"]
		)->asJson());
		return $response;
});
