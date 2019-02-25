<?php

use Slim\Http\Request;
use Slim\Http\Response;

include __DIR__.'/../../controllers/scheduling/SchedulingController.php';
include __DIR__.'/../../controllers/scheduling/SchedulingProceduresController.php';
include __DIR__.'/../../controllers/scheduling/SchedulingResponsibleController.php';
include __DIR__.'/../../controllers/scheduling/SchedulingVisitorController.php';
include __DIR__.'/../../models/scheduling/SchedulingModel.php';
include __DIR__.'/../../models/scheduling/SchedulingProceduresModel.php';
include __DIR__.'/../../models/scheduling/SchedulingResponsibleModel.php';
include __DIR__.'/../../models/scheduling/SchedulingVisitorModel.php';

$app->post('/create_scheduling',
function (Request $request, Response $response, array $args) use($database) {
	$scheduling = new SchedulingController($database);
	$scheduling->sessionIsRequired($request);
	$params = $request->getParsedBody();
	$response->getBody()->write($scheduling->createScheduling($params)->asJson());
	return $response;
});