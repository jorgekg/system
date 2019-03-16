<?php

use Slim\Http\Request;
use Slim\Http\Response;

include_once __DIR__.'/../../controllers/company/CompanyController.php';
include_once __DIR__.'/../../controllers/company/CompanyUserController.php';
include_once __DIR__.'/../../controllers/company/ModuleController.php';
include_once __DIR__.'/../../controllers/company/CompanyModuleController.php';
include_once __DIR__.'/../../controllers/person/PersonController.php';
include_once __DIR__.'/../../controllers/person/PersonContactController.php';
include_once __DIR__.'/../../models/company/CompanyModel.php';
include_once __DIR__.'/../../models/company/CompanyUserModel.php';
include_once __DIR__.'/../../models/company/ModuleModel.php';
include_once __DIR__.'/../../models/company/CompanyModuleModel.php';
include_once __DIR__.'/../../models/person/PersonModel.php';
include_once __DIR__.'/../../models/person/PersonContactModel.php';

$app->get('/api/company',
	function (Request $request, Response $response, array $args) use($database) {
		$company = new CompanyController($database);
		$company->sessionIsRequired($request);
		$auth = $request->getHeader("Authorization");
		$response->getBody()->write($company->getCompanyByToken($auth[0])->asJson());
		return $response;
});

$app->get('/api/company_by_user',
	function (Request $request, Response $response, array $args) use($database) {
		$company = new CompanyController($database);
		$company->sessionIsRequired($request);
		$person_id = $request->getQueryParam('person_id');
		$response->getBody()->write($company->getByPersonId(
			$person_id,
			$company->filter[$company->table.".company_id"]
		)->asJson());
		return $response;
});

$app->post('/api/company',
function (Request $request, Response $response, array $args) use($database) {
	$company = new CompanyController($database);
	$params = $request->getParsedBody();
	$params['password'] = sha1($params['password']);
	$response->getBody()->write($company->insertCompany($params)->asJson());
	return $response;
});

$app->get('/api/company_user',
	function (Request $request, Response $response, array $args) use($database) {
		$company_user = new CompanyUserController($database);
		$company_user->sessionIsRequired($request);
		$response->getBody()->write($company_user->get($request)->asJson());
		return $response;
});

$app->post('/api/company_user',
	function (Request $request, Response $response, array $args) use($database) {
		$company_user = new CompanyUserController($database);
		$company_user->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$params["company_id"] = $company_user->filter[$company_user->table . ".company_id"];
		$response->getBody()->write($company_user->insertCompanyUser($params)->asJson());
		return $response;
});

$app->put('/api/company_user',
	function (Request $request, Response $response, array $args) use($database) {
		$company_user = new CompanyUserController($database);
		$company_user->sessionIsRequired($request);
		$params = $request->getParsedBody();
		$params['password'] = sha1($params['password']);
		$response->getBody()->write($company_user->update($params)->asJson());
		return $response;
});


