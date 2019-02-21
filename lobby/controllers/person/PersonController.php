<?php

class PersonController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'person';
		$this->model = new PersonModel();
	}

	public function getPerson($id) {
		$personController = new PersonController($this->database);
		$personData = $personController->database->select(
			$personController->table, '*', [
				"id" => $id
			]
		);
		if (!empty($personData)) {
			$documentController = new PersonDocumentController($this->database);
			$personData[0]["documents"] = $documentController->database->select(
				$documentController->table, '*', [
					"person_id" => $id
				]
			);
			$emailContactController = new PersonContactController($this->database);
			$personData[0]["email"] = $emailContactController->database->select(
				$emailContactController->table, "*", [
					"person_id" => $id,
					"contact_type_id" => 1
				]
			);
			$phoneContactController = new PersonContactController($this->database);
			$personData[0]["phone"] = $phoneContactController->database->select(
				$phoneContactController->table, "*", [
					"person_id" => $id,
					"contact_type_id" => 2
				]
			);
		}
		$this->data = $personData;
		return $this;
	}

	public function createPerson($person) {
		$this->database->action(function($db) use ($person) {
			$personController = new PersonController($db);
			$personController->insert([
				"name" => $person["name"],
				"active" => $person["active"],
				"responsible" => $person["responsible"],
				"update_at" => $person["update_at"]
			]);
			$personResult = $personController->asObject();
			if (!empty($personResult)) {
				$documentController = new PersonDocumentController($db);
				$documentController->insert([
					"person_id" => $personResult[0]["id"],
					"document_type_id" => $person["document_type_id"],
					"document"	=> $person["document"],
					"update_at" => $person["update_at"]
				]);
				$documentResult = $documentController->asObject();
				if (empty($documentResult)) {
					return false;
				}
				$emailContactController = new PersonContactController($db);
				$emailContactController->insert([
					"person_id" => $personResult[0]["id"],
					"contact_type_id" => $person["email"]["contact_type_id"],
					"contact" => $person["email"]["contact"],
					"update_at" => $person["update_at"]
				]);
				$emailResult = $emailContactController->asObject();
				if (empty($emailResult)) {
					return false;
				}
				$phoneContactController = new PersonContactController($db);
				$phoneContactController->insert([
					"person_id" => $personResult[0]["id"],
					"contact_type_id" => $person["phone"]["contact_type_id"],
					"contact" => $person["phone"]["contact"],
					"update_at" => $person["update_at"]
				]);
				$phoneResult = $phoneContactController->asObject();
				if (empty($phoneResult)) {
					return false;
				}
			} else {
				return false;
			}
		});

	}

}