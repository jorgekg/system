<?php

class PersonController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'person';
		$this->entity = 'person';
		$this->model = new PersonModel();
	}

	public function getPersonByName($name, $responsible = "N", $company_id = null) {
	  if(!empty($company_id)) {
			$this->data = $this->database->select(
				$this->table, [
					"[><]document" => ["id" => "person_id"]
				],
				[
					"document.document",
					"document.document_type_id",
					"person.id",
					"person.name",
					"person.responsible"
				], [
					"person.name[~]" => $name,
					"person.responsible" => $responsible,
					"person.company_id" => $company_id,
					"person.active" => "S"
			]);
		} else {
			$this->data = $this->database->select(
				$this->table, [
					"[><]document" => ["id" => "person_id"]
				],
				[
					"document.document",
					"document.document_type_id",
					"person.id",
					"person.name"
				], [
					"person.name[~]" => $name,
					"person.active" => "S",
					"GROUP" => [
						"document.document",
						"document.document_type_id",
						"person.name"
					],
			]);
		}
		$this->hasError();
		return $this;
	}

	public function getPerson($id) {
		$personController = new PersonController($this->database);
		$personData = $personController->database->select(
			$personController->table, '*', [
				"id" => $id
			]
		);
		$personController->hasError();
		if (!empty($personData)) {
			$documentController = new PersonDocumentController($this->database);
			$personData[0]["documents"] = $documentController->database->select(
				$documentController->table, '*', [
					"person_id" => $id
				]
			);
			$documentController->hasError();
			$emailContactController = new PersonContactController($this->database);
			$personData[0]["emails"] = $emailContactController->database->select(
				$emailContactController->table, "*", [
					"person_id" => $id,
					"contact_type_id" => 1
				]
			);
			$emailContactController->hasError();
			$phoneContactController = new PersonContactController($this->database);
			$personData[0]["phones"] = $phoneContactController->database->select(
				$phoneContactController->table, "*", [
					"person_id" => $id,
					"contact_type_id" => 2
				]
			);
			$phoneContactController->hasError();
		}
		$this->hasError();
		$this->data = $personData;
		return $this;
	}

	public function createPerson($person) {
		$id = 0;
		$this->database->action(function($db) use ($person, &$id) {
			$personController = new PersonController($db);
			$personController->insert([
				"name" => $person["name"],
				"active" => $person["active"],
				"company_id" => $person["company_id"],
				"responsible" => $person["responsible"],
				"update_at" => $person["update_at"]
			]);
			$personResult = $personController->asObject();
			$id = $personResult[0]["id"];
			if (!empty($personResult)) {
				$documentController = new PersonDocumentController($db);
				$documentController->insert([
					"person_id" => $personResult[0]["id"],
					"document_type_id" => $person["documents"][0]["document_type_id"],
					"document"	=> $person["documents"][0]["document"],
					"update_at" => $person["update_at"]
				]);
				$documentResult = $documentController->asObject();
				if (empty($documentResult)) {
					return false;
				}
				$emailContactController = new PersonContactController($db);
				$emailContactController->insert([
					"person_id" => $personResult[0]["id"],
					"contact_type_id" => $person["emails"][0]["contact_type_id"],
					"contact" => $person["emails"][0]["contact"],
					"update_at" => $person["update_at"]
				]);
				$emailResult = $emailContactController->asObject();
				if (empty($emailResult)) {
					return false;
				}
				$phoneContactController = new PersonContactController($db);
				$phoneContactController->insert([
					"person_id" => $personResult[0]["id"],
					"contact_type_id" => $person["phones"][0]["contact_type_id"],
					"contact" => $person["phones"][0]["contact"],
					"update_at" => $person["update_at"]
				]);
				$this->getId();
				$phoneResult = $phoneContactController->asObject();
				if (empty($phoneResult)) {
					return false;
				}
			} else {
				return false;
			}
		});
		$this->hasError();
		$this->getPerson($id);
		return $this;
	}

}