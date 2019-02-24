<?php

use Slim\Http\Request;
use Slim\Http\Response;

include __DIR__.'/../../controllers/person/PersonController.php';
include __DIR__.'/../../models/person/PersonModel.php';
include __DIR__.'/../../controllers/person/PersonDocumentController.php';
include __DIR__.'/../../models/person/PersonDocumentModel.php';
include __DIR__.'/../../controllers/person/PersonContactController.php';
include __DIR__.'/../../models/person/PersonContactModel.php';

$app->get('/person',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonController($database);
		//$person->sessionIsRequired($request);
		$response->getBody()->write($person->get($request)->asJson());
		return $response;
});

$app->get('/person/all',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonController($database);
		$response->getBody()->write($person->getPerson(
			$request->getQueryParam('id')
		)->asJson());
		return $response;
});

$app->get('/person/byname',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonController($database);
		$response->getBody()->write($person->getPersonByName(
			$request->getQueryParam('name'),
			$request->getQueryParam('responsible'),
			$request->getQueryParam('company_id')
		)->asJson());
		return $response;
});

$app->post('/person',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonController($database);
		$person->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($person->insert($params)->asJson());
		return $response;
});

$app->post('/create_person',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonController($database);
		$person->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($person->createPerson($params)->asJson());
		return $response;
});

$app->put('/person',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonController($database);
		$person->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($person->update($params)->asJson());
		return $response;
});

$app->delete('/person',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonController($database);
		$person->sessionIsRequired($request);
		$response->getBody()->write($person->delete($request)->asJson());
		return $response;
});

$app->get('/person_document',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonDocumentController($database);
		$person->sessionIsRequired($request);
		$response->getBody()->write($person->get($request)->asJson());
		return $response;
});

$app->post('/person_document',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonDocumentController($database);
		$person->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($person->insert($params)->asJson());
		return $response;
});

$app->put('/person_document',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonDocumentController($database);
		$person->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($person->update($params)->asJson());
		return $response;
});

$app->delete('/person_document',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonDocumentController($database);
		$person->sessionIsRequired($request);
		$response->getBody()->write($person->delete($request)->asJson());
		return $response;
});

$app->get('/person_contact',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonContactController($database);
		$person->sessionIsRequired($request);
		$response->getBody()->write($person->get($request)->asJson());
		return $response;
});

$app->post('/person_contact',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonContactController($database);
		$person->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($person->insert($params)->asJson());
		return $response;
});

$app->put('/person_contact',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonContactController($database);
		$person->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($person->update($params)->asJson());
		return $response;
});

$app->delete('/person_contact',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonContactController($database);
		$person->sessionIsRequired($request);
		$response->getBody()->write($person->delete($request)->asJson());
		return $response;
});