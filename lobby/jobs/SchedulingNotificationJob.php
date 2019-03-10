<?php

require_once __DIR__."/../templates/SchedulingNotificationTemplate.php";

$database->action(function($db) use ($notify, $mail, $template) {
	$companyController = new CompanyController($db);
	$contents = json_decode($notify["contents"]);
	$company = $companyController->select([
		"id" => $contents->company_id
	])->asObject();
	if ($notify["type"] == "insert_scheduling") {
		$mail->Subject = 'Visita agendada :)';
		foreach($contents->visitors as $visitor) {
			foreach($visitor->person->emails as $email) {
				$mail->addAddress($email->contact, $visitor->person->name);
			}
			$template = str_replace("#visitor", $visitor->person->name, $template);
			$template = str_replace("#start_date", $contents->start_date, $template);
			$template = str_replace("#end_date", $contents->end_date, $template);
			$template = str_replace("#company", $company[0]["name"], $template);
			$template = str_replace("#neighborhood", $contents->lobby[0]->district, $template);
			$template = str_replace("#street", $contents->lobby[0]->street, $template);
			$template = str_replace("#number", $contents->lobby[0]->number, $template);
			$mail->Body = $template;
			if(!$mail->send()) {
				echo 'Não foi possível enviar a mensagem.<br>';
				echo 'Erro: ' . $mail->ErrorInfo;
			}
		}
		return true;
	} else {
		echo 'lse';
	}
	echo '------';
});
