<?php

use Slim\Http\Request;
use Slim\Http\Response;

include __DIR__.'/../../controllers/procedures/ProceduresController.php';
include __DIR__.'/../../models/procedures/ProceduresModel.php';

$app->get('/procedures',
	function (Request $request, Response $response, array $args) use($database) {
		$procedures = new ProceduresController($database);
		$procedures->sessionIsRequired($request);
		$response->getBody()->write($procedures->get($request)->asJson());
		return $response;
});

$app->post('/procedures',
	function (Request $request, Response $response, array $args) use($database) {
		$procedures = new ProceduresController($database);
		$procedures->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($procedures->insert($params)->asJson());
		return $response;
});

$app->put('/procedures',
	function (Request $request, Response $response, array $args) use($database) {
		$procedures = new ProceduresController($database);
		$procedures->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($procedures->update($params)->asJson());
		return $response;
});

$app->delete('/procedures',
	function (Request $request, Response $response, array $args) use($database) {
		$procedures = new ProceduresController($database);
		$procedures->sessionIsRequired($request);
		$response->getBody()->write($procedures->delete($request)->asJson());
		return $response;
});