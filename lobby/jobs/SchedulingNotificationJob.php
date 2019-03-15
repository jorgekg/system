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
		$template = str_replace("#status", "Visita agendada", $template);
	} else if ($notify["type"] == "update_scheduling"){
		$mail->Subject = 'Visita atualizada';
		$template = str_replace("#status", "Visita atualizada", $template);
	} else {
		$mail->Subject = 'Visita reagendada';
		$template = str_replace("#status", "Visita reagendada", $template);
	}
	$lobbyController = new LobbyController($db);
	foreach($contents->visitors as $visitor) {
		foreach($visitor->person->emails as $email) {
			$mail->addAddress($email->contact, $visitor->person->name);
		}
		$lobby = $lobbyController->database->select(
			$lobbyController->table,
			[
			"[><]states" => ["state_id" => "id"],
			"[><]city" => ["city_id" => "id"]
			], [
				"states.uf(state_uf)",
				"city.name(city_name)",
				"lobby.district",
				"lobby.street",
				"lobby.number"
			], [
			"lobby.id" => $contents->lobby->id
		]);
		$lobbyController->hasError();
		$template = str_replace("#visitor", $visitor->person->name, $template);
		$template = str_replace("#start_date", $contents->start_date, $template);
		$template = str_replace("#end_date", $contents->end_date, $template);
		$template = str_replace("#company", $company[0]["name"], $template);
		$template = str_replace("#city", $lobby[0]["city_name"], $template);
		$template = str_replace("#uf", $lobby[0]["state_uf"], $template);
		$template = str_replace("#neighborhood", $lobby[0]["district"], $template);
		$template = str_replace("#street", $lobby[0]["street"], $template);
		$template = str_replace("#number", $lobby[0]["number"], $template);
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
