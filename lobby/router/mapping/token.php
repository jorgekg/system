<?php

use Slim\Http\Request;
use Slim\Http\Response;

$app->post('/api/token',
	function (Request $request, Response $response, array $args) use($database) {
		$token = new TokenController($database);
		$params = $request->getParsedBody();
		$params['password'] = sha1($params['password']);
		$response->getBody()->write($token->create($params)->asJson());
		return $response;
});



