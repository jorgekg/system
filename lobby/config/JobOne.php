<?php

require_once __DIR__.'/Config.php';

require_once __DIR__.'/../vendor/autoload.php';
require_once __DIR__.'/DatabaseConfig.php';

date_default_timezone_set('America/Sao_Paulo');

try {
	require_once __DIR__.'/../jobs/CardReportSumarizationJob.php';
} catch (Exception $e) {

}