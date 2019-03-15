<?php

require_once __DIR__."/../templates/SchedulingFinishNotificationTemplate.php";

$database->action(function($db) use ($notify, $mail, $template) {	
	$contents = json_decode($notify["contents"]);
	$mail->Subject = 'Visita finalizada :)';
	foreach($contents->visitors as $visitor) {
		foreach($visitor->person->emails as $email) {
			$mail->addAddress($email->contact, $visitor->person->name);
		}
		$template = str_replace("#link", URL."scheduling/rating/".sha1("{$contents->scheduling_id} {$visitor->id}"), $template);
		$template = str_replace("#delete", URL."/person/delete/".$visitor->person->id, $template);
		$mail->Body = $template;
		if(!$mail->send()) {
			echo 'Não foi possível enviar a mensagem.<br>';
			echo 'Erro: ' . $mail->ErrorInfo;
			return false;
		}
	}
	$schedulingNotification = new SchedulingNotificationController($db);
	$schedulingNotification->update([
		"id" => $notify["id"],
		"active" => "S"
	]);
	return true;
});
