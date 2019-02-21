<?php

use Slim\Http\Request;
use Slim\Http\Response;

include __DIR__.'/../../controllers/company/CompanyController.php';
include __DIR__.'/../../controllers/company/CompanyUserController.php';
include __DIR__.'/../../models/company/CompanyModel.php';
include __DIR__.'/../../models/company/CompanyUserModel.php';

$app->get('/company',
	function (Request $request, Response $response, array $args) use($database) {
		$company = new CompanyController($database);
		$response->getBody()->write($company->get($request)->asJson());
		return $response;
});

$app->get('/company_user',
	function (Request $request, Response $response, array $args) use($database) {
		$company_user = new CompanyUserController($database);
		$company_user->sessionIsRequired($request);
		$response->getBody()->write($company_user->get($request)->asJson());
		return $response;
});

$app->post('/company_user',
	function (Request $request, Response $response, array $args) use($database) {
		$company_user = new CompanyUserController($database);
		$params = $request->getParsedBody();
		$params['password'] = sha1($params['password']);
		$response->getBody()->write($company_user->insert($params)->asJson());
		return $response;
});

$app->put('/company_user',
	function (Request $request, Response $response, array $args) use($database) {
		$company_user = new CompanyUserController($database);
		$company_user->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$params['password'] = sha1($params['password']);
		$response->getBody()->write($company_user->update($params)->asJson());
		return $response;
});


