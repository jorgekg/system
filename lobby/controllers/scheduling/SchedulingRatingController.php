<?php

class SchedulingRatingController extends Controller {
	function __construct(
		$database
	) {
		$this->database = $database;
		$this->table = 'scheduling_rating';
		$this->model = new SchedulingRatingModel();
	}

	public function sum($lobby_id, $company_id) {
		if (intval($lobby_id)) {
			$this->data = $this->database->query("
			select CAST((sum(t0.rating) / count(t0.id)) as UNSIGNED) rating from scheduling_rating t0
			inner join scheduling t1 on (t1.id = t0.scheduling_id and t0.company_id = t1.company_id)
			where t0.company_id = $company_id
			and lobby_id = $lobby_id
			and t0.rating is not null
			")->fetchAll();
			return $this;
		} else {
			$this->data = [];
		}
	}
}