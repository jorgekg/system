<?php

use Slim\Http\Request;
use Slim\Http\Response;

include_once __DIR__.'/../../controllers/scheduling/SchedulingController.php';
include_once __DIR__.'/../../controllers/scheduling/SchedulingProceduresController.php';
include_once __DIR__.'/../../controllers/scheduling/SchedulingResponsibleController.php';
include_once __DIR__.'/../../controllers/scheduling/SchedulingVisitorController.php';
include_once __DIR__.'/../../controllers/scheduling/VisitorCheckinController.php';
include_once __DIR__.'/../../controllers/scheduling/SchedulingNotificationController.php';
include_once __DIR__.'/../../controllers/scheduling/SchedulingRatingController.php';
include_once __DIR__.'/../../models/scheduling/SchedulingModel.php';
include_once __DIR__.'/../../models/scheduling/SchedulingProceduresModel.php';
include_once __DIR__.'/../../models/scheduling/SchedulingResponsibleModel.php';
include_once __DIR__.'/../../models/scheduling/SchedulingVisitorModel.php';
include_once __DIR__.'/../../models/scheduling/VisitorCheckinModel.php';
include_once __DIR__.'/../../models/scheduling/SchedulingNotification.php';
include_once __DIR__.'/../../models/scheduling/SchedulingRatingModel.php';

$app->post('/api/create_scheduling',
function (Request $request, Response $response, array $args) use($database) {
	$scheduling = new SchedulingController($database);
	$scheduling->sessionIsRequired($request);
	$params = $request->getParsedBody();
	$params["company_id"] = $scheduling->filter[$scheduling->table . ".company_id"];
	$response->getBody()->write($scheduling->createScheduling($params)->asJson());
	return $response;
});

$app->post('/api/clone_scheduling',
function (Request $request, Response $response, array $args) use($database) {
	$scheduling = new SchedulingController($database);
	$scheduling->sessionIsRequired($request);
	$params = $request->getParsedBody();
	$params["company_id"] = $scheduling->filter[$scheduling->table . ".company_id"];
	$response->getBody()->write($scheduling->cloneScheduling($params)->asJson());
	return $response;
});

$app->put('/api/update_scheduling',
function (Request $request, Response $response, array $args) use($database) {
	return $response;
});

$app->get('/api/schedulings',
	function (Request $request, Response $response, array $args) use($database) {
		$scheduling = new SchedulingController($database);
		$scheduling->sessionIsRequired($request);
		$response->getBody()->write($scheduling->getSchedulings(
			$request->getQueryParam('name'),
			$scheduling->filter[$scheduling->table . ".company_id"],
			$request->getQueryParam('situation'),
			$request->getQueryParam('offset')
		)->asJson());
		return $response;
});

$app->get('/api/reception',
	function (Request $request, Response $response, array $args) use($database) {
		$scheduling = new SchedulingController($database);
		$scheduling->sessionIsRequired($request);
		$response->getBody()->write($scheduling->getReceptions(
			$request->getQueryParam('name'),
			$scheduling->filter[$scheduling->table . ".company_id"],
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
		$scheduling->sessionIsRequired($request);
		$response->getBody()->write($scheduling->getSchedulingById(
			$request->getQueryParam('id'),
			$scheduling->filter[$scheduling->table . ".company_id"]
		)->asJson());
		return $response;
});

$app->get('/api/scheduling/rating',
	function (Request $request, Response $response, array $args) use($database) {
		$scheduling = new SchedulingRatingController($database);
		if (!empty($request->getQueryParam('link'))) {
			$response->getBody()->write($scheduling->get($request)->asJson());
		} else {
			$scheduling->sessionIsRequired($request);
			$response->getBody()->write($scheduling->get($request)->asJson());
		}
		return $response;
});

$app->get('/api/rating/sum',
	function (Request $request, Response $response, array $args) use($database) {
		$scheduling = new SchedulingRatingController($database);
		$scheduling->sessionIsRequired($request);
		$response->getBody()->write($scheduling->sum(
			$request->getQueryParam('lobby_id'),
			$scheduling->filter[$scheduling->table . ".company_id"]
		)->asJson());
		return $response;
});

$app->post('/api/scheduling/rating',
	function (Request $request, Response $response, array $args) use($database) {
		$scheduling = new SchedulingRatingController($database);
		$params = $request->getParsedBody();
		if (!empty($params['link'])) {
			$scheduling->filter["link"] = $params['link'];
			$response->getBody()->write($scheduling->update($params)->asJson());
		} else {
			$scheduling->sessionIsRequired($request);
			$response->getBody()->write($scheduling->update($params)->asJson());
		}
		return $response;
});

$app->post('/api/put/scheduling',
	function (Request $request, Response $response, array $args) use($database) {
		$scheduling = new SchedulingController($database);
		$scheduling->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$params["company_id"] = $scheduling->filter[$scheduling->table . ".company_id"];
		if ($params["situation"] == 2) {
			$scheduling->notifyFinish($params["id"], $params["company_id"]);
		}
		$response->getBody()->write($scheduling->update($params)->asJson());
		return $response;
});

$app->post('/api/put/unFinish',
	function (Request $request, Response $response, array $args) use($database) {
		$scheduling = new SchedulingController($database);
		$scheduling->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$params["company_id"] = $scheduling->filter[$scheduling->table . ".company_id"];
		$response->getBody()->write($scheduling->unFinish($params)->asJson());
		return $response;
});