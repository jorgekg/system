<?php

use Slim\Http\Request;
use Slim\Http\Response;

include_once __DIR__.'/../../controllers/scheduling/SchedulingController.php';
include_once __DIR__.'/../../controllers/scheduling/SchedulingProceduresController.php';
include_once __DIR__.'/../../controllers/scheduling/SchedulingResponsibleController.php';
include_once __DIR__.'/../../controllers/scheduling/SchedulingVisitorController.php';
include_once __DIR__.'/../../controllers/scheduling/VisitorCheckinController.php';
include_once __DIR__.'/../../models/scheduling/SchedulingModel.php';
include_once __DIR__.'/../../models/scheduling/SchedulingProceduresModel.php';
include_once __DIR__.'/../../models/scheduling/SchedulingResponsibleModel.php';
include_once __DIR__.'/../../models/scheduling/SchedulingVisitorModel.php';
include_once __DIR__.'/../../models/scheduling/VisitorCheckinModel.php';

$app->post('/api/create_scheduling',
function (Request $request, Response $response, array $args) use($database) {
	$scheduling = new SchedulingController($database);
	$scheduling->sessionIsRequired($request);
	$params = $request->getParsedBody();
	$response->getBody()->write($scheduling->createScheduling($params)->asJson());
	return $response;
});

$app->put('/api/update_scheduling',
function (Request $request, Response $response, array $args) use($database) {
	$scheduling = new SchedulingController($database);
	$scheduling->sessionIsRequired($request);
	$params = $request->getParsedBody();
	$response->getBody()->write($scheduling->updateScheduling($params)->asJson());
	return $response;
});

$app->get('/api/schedulings',
	function (Request $request, Response $response, array $args) use($database) {
		$scheduling = new SchedulingController($database);
		$response->getBody()->write($scheduling->getSchedulings(
			$request->getQueryParam('name'),
			$request->getQueryParam('company_id'),
			$request->getQueryParam('situation'),
			$request->getQueryParam('offset')
		)->asJson());
		return $response;
});

$app->get('/api/reception',
	function (Request $request, Response $response, array $args) use($database) {
		$scheduling = new SchedulingController($database);
		$response->getBody()->write($scheduling->getReceptions(
			$request->getQueryParam('name'),
			$request->getQueryParam('company_id'),
			$request->getQueryParam('situation'),
			$request->getQueryParam('lobby_id'),
			$request->getQueryParam('date'),
			$request->getQueryParam('offset')
		)->asJson());
		return $response;
});

$app->get('/api/schedulingid',
	function (Request $request, Response $response, array $args) use($database) {
		$scheduling = new SchedulingController($database);
		$response->getBody()->write($scheduling->getSchedulingById(
			$request->getQueryParam('id'),
			$request->getQueryParam('company_id')
		)->asJson());
		return $response;
});

$app->post('/api/put/scheduling',
	function (Request $request, Response $response, array $args) use($database) {
		$scheduling = new SchedulingController($database);
		$scheduling->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($scheduling->update($params)->asJson());
		return $response;
});

$app->post('/api/put/unFinish',
	function (Request $request, Response $response, array $args) use($database) {
		$scheduling = new SchedulingController($database);
		$scheduling->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($scheduling->unFinish($params)->asJson());
		return $response;
});