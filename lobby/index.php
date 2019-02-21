<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Max-Age: 86400');

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';

include './config/DatabaseConfig.php';
include './controllers/Controller.php';
include './controllers/token/TokenController.php';
include './models/token/token.php';


$app = new \Slim\App;
$app->add(function ($req, $res, $next) {
	$response = $next($req, $res);
	return $response
		->withHeader('Access-Control-Allow-Origin', '*')
		->withHeader('Access-Control-Allow-Headers', '*')
		->withHeader('Access-Control-Allow-Methods', '*');
});
include 'router/router.php';
$app->run();