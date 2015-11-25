<?php
if (isset($_GET['func']) && $_GET['func'] == 'getData') {
	$data = file_get_contents('./data/db.json');
	echo $data;
} elseif (isset($_GET['func']) && $_GET['func'] == 'addUser') {
	$payload = file_get_contents('php://input');
	$payloadData = json_decode($payload, true);
	$data = array('ret' => 'OK', 'test' => $payloadData['name']);
	$jsonData = file_get_contents('./data/db.json');
	$data = json_decode($jsonData, true);
	echo json_encode($data);	
}