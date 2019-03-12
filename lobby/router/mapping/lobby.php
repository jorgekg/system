<?php

use Slim\Http\Request;
use Slim\Http\Response;

include_once __DIR__.'/../../controllers/lobby/LobbyController.php';
include_once __DIR__.'/../../models/lobby/LobbyModel.php';

$app->get('/api/lobby',
	function (Request $request, Response $response, array $args) use($database) {
		$lobby = new LobbyController($database);
		$lobby->sessionIsRequired($request);
		$response->getBody()->write($lobby->get($request)->asJson());
		return $response;
});

$app->get('/api/lobby_name',
	function (Request $request, Response $response, array $args) use($database) {
		$lobby = new LobbyController($database);
		$lobby->sessionIsRequired($request);
		$response->getBody()->write($lobby->getByName(
			$request->getQueryParam('name'),
			$lobby->filter[$lobby->table . ".company_id"]
		)->asJson());
		return $response;
});

$app->post('/api/lobby',
	function (Request $request, Response $response, array $args) use($database) {
		$lobby = new LobbyController($database);
		$lobby->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($lobby->insert($params)->asJson());
		return $response;
});

$app->post('/api/put/lobby',
	function (Request $request, Response $response, array $args) use($database) {
		$lobby = new LobbyController($database);
		$lobby->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($lobby->update($params)->asJson());
		return $response;
});

$app->get('/api/delete/lobby',
	function (Request $request, Response $response, array $args) use($database) {
		$lobby = new LobbyController($database);
		$lobby->sessionIsRequired($request);
		$response->getBody()->write($lobby->delete($request)->asJson());
		return $response;
});