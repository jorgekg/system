<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require __DIR__.'../vendor/autoload.php';
require_once __DIR__.'/DatabaseConfig.php';

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
			include __DIR__.'../jobs/SchedulingNotificationJob.php';
		}
	}
} catch (Exception $e) {
	var_dump($e);
}