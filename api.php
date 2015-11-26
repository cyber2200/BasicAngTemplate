<?php
if (isset($_GET['func']) && $_GET['func'] == 'getData') {
	$data = file_get_contents('./data/db.json');
	echo $data;
} elseif (isset($_GET['func']) && $_GET['func'] == 'addUser') {
	$payload = file_get_contents('php://input');
	$payloadData = json_decode($payload, true);
	
	$jsonData = file_get_contents('./data/db.json');
	$data = json_decode($jsonData, true);
	$i = 0;
	$newData = array();
	foreach ($data as $row) {
		$i++;
		$newData[] = array('id' => $i, 'name' => $row['name']);
	}
	
	$i++;
	$newData[] = array('id' => $i, 'name' => $payloadData['name']);
	file_put_contents("./data/db.json", json_encode($newData));
	echo json_encode(array('ret' => 'OK', 'test' => $payloadData['name']));	
}