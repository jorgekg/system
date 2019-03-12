<?php

use Slim\Http\Request;
use Slim\Http\Response;

require_once __DIR__."/../../controllers/locale/CityController.php";
require_once __DIR__."/../../controllers/locale/StatesController.php";
require_once __DIR__."/../../models/locale/CityModel.php";
require_once __DIR__."/../../models/locale/StatesModel.php";

$app->get('/api/states',
	function (Request $request, Response $response, array $args) use($database) {
		$state = new StatesController($database);
		$state->sessionIsRequired($request);
		unset($state->filter[$state->table.".company_id"]);
		$response->getBody()->write($state->get($request)->asJson());
		return $response;
});

$app->get('/api/states_name',
	function (Request $request, Response $response, array $args) use($database) {
		$state = new StatesController($database);
		$state->sessionIsRequired($request);
		$response->getBody()->write($state->getByName(
			$request->getQueryParam('name')
		)->asJson());
		return $response;
});

$app->get('/api/city_name',
	function (Request $request, Response $response, array $args) use($database) {
		$city = new CityController($database);
		$city->sessionIsRequired($request);
		$response->getBody()->write($city->getByName(
			$request->getQueryParam('uf'),
			$request->getQueryParam('name')
		)->asJson());
		return $response;
});

$app->get('/api/city',
	function (Request $request, Response $response, array $args) use($database) {
		$city = new CityController($database);
		$city->sessionIsRequired($request);
		unset($city->filter[$city->table.".company_id"]);
		$response->getBody()->write($city->get($request)->asJson());
		return $response;
});