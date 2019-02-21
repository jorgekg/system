<?php

use Slim\Http\Request;
use Slim\Http\Response;

include __DIR__.'/../../controllers/document_type/DocumentTypeController.php';
include __DIR__.'/../../models/document_type/DocumentTypeModel.php';

$app->get('/document_type',
	function (Request $request, Response $response, array $args) use($database) {
		$documentType = new DocumentTypeController($database);
		$response->getBody()->write($documentType->get($request)->asJson());
		return $response;
});