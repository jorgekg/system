<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once __DIR__.'/Config.php';

require_once __DIR__.'/../vendor/autoload.php';
require_once __DIR__.'/DatabaseConfig.php';
require_once __DIR__.'/PhpMailer.php';
require_once __DIR__."/../controllers/Controller.php";
require_once __DIR__."/../models/scheduling/SchedulingNotification.php";
require_once __DIR__."/../controllers/scheduling/SchedulingNotificationController.php";
include_once __DIR__.'/../controllers/company/CompanyController.php';
include_once __DIR__.'/../models/company/CompanyModel.php';

date_default_timezone_set('America/Sao_Paulo');

try {

	$schedulingNotificationController = new SchedulingNotificationController($database);
	$scheudliNgnotication = $schedulingNotificationController->select([
		"active" => null
	]);
	$notification = $scheudliNgnotication->asObject();

	foreach ($notification as $notify) {
		if ($notify["type"] == "insert_scheduling" || $notify["type"] == "update_scheduling") {
			// Job envio email agendamento
			include __DIR__.'/../jobs/SchedulingNotificationJob.php';
		}
	}
} catch (Exception $e) {
}