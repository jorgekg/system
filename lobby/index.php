<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

date_default_timezone_set('America/Sao_Paulo');

require 'vendor/autoload.php';

include_once './config/DatabaseConfig.php';
include_once './controllers/Controller.php';
include_once './controllers/token/TokenController.php';
include_once './models/token/token.php';

try {
	$app = new \Slim\App;
	$app->add(function ($req, $res, $next) {
		$response = $next($req, $res);
		return $response
			->withHeader('Access-Control-Allow-Origin', '*')
			->withHeader('Access-Control-Allow-Headers', '*')
			->withHeader('Access-Control-Allow-Methods', '*');
	});
	include_once 'router/router.php';
	$app->run();
} catch (Exception $e) {
	var_dump($e);
}