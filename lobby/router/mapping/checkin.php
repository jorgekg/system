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

$app->post('/api/checkin',
	function (Request $request, Response $response, array $args) use($database) {
		$checkin = new VisitorCheckinController($database);
		$checkin->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($checkin->insertCheckin($params)->asJson());
		return $response;
});

$app->post('/api/put/checkin',
	function (Request $request, Response $response, array $args) use($database) {
		$checkin = new VisitorCheckinController($database);
		$checkin->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($checkin->unCheckin($params)->asJson());
		return $response;
});