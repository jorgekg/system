<?php

use Slim\Http\Request;
use Slim\Http\Response;

include_once __DIR__.'/../../controllers/person/PersonController.php';
include_once __DIR__.'/../../controllers/company/CompanyPermissionController.php';
include_once __DIR__.'/../../models/person/PersonModel.php';
include_once __DIR__.'/../../controllers/person/PersonDocumentController.php';
include_once __DIR__.'/../../models/person/PersonDocumentModel.php';
include_once __DIR__.'/../../controllers/person/PersonContactController.php';
include_once __DIR__.'/../../models/person/PersonContactModel.php';
include_once __DIR__.'/../../models/company/CompanyPermissionModel.php';

$app->get('/api/person',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonController($database);
		$person->sessionIsRequired($request);
		$response->getBody()->write($person->get($request)->asJson());
		return $response;
});

$app->get('/api/person/all',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonController($database);
		$response->getBody()->write($person->getPerson(
			$request->getQueryParam('id')
		)->asJson());
		return $response;
});

$app->get('/api/person/byname',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonController($database);
		$response->getBody()->write($person->getPersonByName(
			$request->getQueryParam('name'),
			$request->getQueryParam('responsible'),
			$request->getQueryParam('company_id')
		)->asJson());
		return $response;
});

$app->post('/api/person',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonController($database);
		$person->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($person->insert($params)->asJson());
		return $response;
});

$app->post('/api/create_person',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonController($database);
		$person->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($person->createPerson($params)->asJson());
		return $response;
});

$app->post('/api/put/person',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonController($database);
		$person->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($person->update($params)->asJson());
		return $response;
});

$app->delete('/api/person',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonController($database);
		$person->sessionIsRequired($request);
		$response->getBody()->write($person->delete($request)->asJson());
		return $response;
});

$app->get('/api/person_document',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonDocumentController($database);
		$person->sessionIsRequired($request);
		$person->filter = [];
		$response->getBody()->write($person->get($request)->asJson());
		return $response;
});

$app->post('/api/person_document',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonDocumentController($database);
		$person->sessionIsRequired($request);
		$person->filter = [];
		$params = $request->getParsedBody();
		$response->getBody()->write($person->insert($params)->asJson());
		return $response;
});

$app->post('/api/put/person_document',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonDocumentController($database);
		$person->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($person->update($params)->asJson());
		return $response;
});

$app->get('/api/delete/person_document',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonDocumentController($database);
		$person->sessionIsRequired($request);
		$person->filter = [];
		if ($request->getQueryParam('id') && $request->getQueryParam('person_id')) {
			$response->getBody()->write($person->delete($request)->asJson());
		} else {
			http_response_code(403);
			exit;
		}
		return $response;
});

$app->get('/api/person_contact',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonContactController($database);
		$person->sessionIsRequired($request);
		$person->filter = [];
		$response->getBody()->write($person->get($request)->asJson());
		return $response;
});

$app->post('/api/person_contact',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonContactController($database);
		$person->sessionIsRequired($request);
		$person->filter = [];
		$params = $request->getParsedBody();
		$response->getBody()->write($person->insert($params)->asJson());
		return $response;
});

$app->put('/api/person_contact',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonContactController($database);
		$person->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$response->getBody()->write($person->update($params)->asJson());
		return $response;
});

$app->get('/api/delete/person_contact',
	function (Request $request, Response $response, array $args) use($database) {
		$person = new PersonContactController($database);
		$person->sessionIsRequired($request);
		$person->filter = [];
		if ($request->getQueryParam('id') && $request->getQueryParam('person_id')) {
			$response->getBody()->write($person->delete($request)->asJson());
		} else {
			http_response_code(403);
			exit;
		}
		return $response;
});