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
} elseif (isset($_GET['func']) && $_GET['func'] == 'deleteUser') {
	$payload = file_get_contents('php://input');
	$payloadData = json_decode($payload, true);
	
	$jsonData = file_get_contents('./data/db.json');
	$data = json_decode($jsonData, true);
	$i = 0;
	$newData = array();
	foreach ($data as $row) {
		if ($row['id'] != $payloadData['id']) {
			$i++;
			$newData[] = array('id' => $i, 'name' => $row['name']);
		}
	}
	file_put_contents("./data/db.json", json_encode($newData));
	echo json_encode(array('ret' => 'OK', 'test' => $payloadData['name']));	
} elseif (isset($_GET['func']) && $_GET['func'] == 'getUser') {
	$payload = file_get_contents('php://input');
	$payloadData = json_decode($payload, true);
	
	$jsonData = file_get_contents('./data/db.json');
	$data = json_decode($jsonData, true);
	$i = 0;
	$newData = array();
	$ret = array();
	foreach ($data as $row) {
		if ($row['id'] == $payloadData['id']) {
			$ret = $row;
			break;
		}
	}
	echo json_encode(array('ret' => 'OK', 'data' => $ret));
} elseif (isset($_GET['func']) && $_GET['func'] == 'updateUser') {
	$payload = file_get_contents('php://input');
	$payloadData = json_decode($payload, true);
	
	$jsonData = file_get_contents('./data/db.json');
	$data = json_decode($jsonData, true);
	$i = 0;
	$newData = array();
	foreach ($data as &$row) {
		if ($row['id'] == $payloadData['id']) {
			$i++;
			$newData[] = array('id' => $i, 'name' => $payloadData['name']);
		} else {
			$newData[] = $row;
		}
	}
	file_put_contents("./data/db.json", json_encode($newData));
	echo json_encode(array('ret' => 'OK', 'test' => $payloadData['name']));
}