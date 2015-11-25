<?php
if (isset($_GET['func']) && $_GET['func'] == 'getData') {
	$data = array(
		array('id' => '1', 'name' => 'Test 1'),
		array('id' => '2', 'name' => 'Test 2'),
		array('id' => '3', 'name' => 'Test 3'),
		array('id' => '4', 'name' => 'Test 4'),
		array('id' => '5', 'name' => 'Test 5'),
		array('id' => '6', 'name' => 'Test 6'),
		array('id' => '7', 'name' => rand(0, 1000)),
	);
	echo json_encode($data);
} elseif (isset($_GET['func']) && $_GET['func'] == 'addUser') {
	$payload = file_get_contents('php://input');
	$payloadData = json_decode($payload, true);
	$data = array('ret' => 'OK', 'test' => $payloadData['name']);
	echo json_encode($data);	
}