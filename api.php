<?php
if (isset($_GET['func']) && $_GET['func'] == 'getData') {
	$data = file_get_contents('./data/db.json');
	if ($data === FALSE) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array('ret' => "Can't read file"));
        return;
	}
	echo $data;
} elseif (isset($_GET['func']) && $_GET['func'] == 'addUser') {
	$counterRaw = file_get_contents('./data/counter.json');
	if ($counterRaw === FALSE) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array('ret' => "Can't read file"));
        return;
	}
	$counterData = json_decode($counterRaw, true);
	$counterData[0]['count']++;
	$counter = $counterData[0]['count'];
	$res = file_put_contents('./data/counter.json', json_encode($counterData));
	if (! $res) {
		header("HTTP/1.1 500 Internal Server Error");
		echo json_encode(array('ret' => "Can't write file"));
		return;		
	}
	$payload = file_get_contents('php://input');
	if ($payload === FALSE) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array('ret' => "Can't get input"));
        return;
	}
	$payloadData = json_decode($payload, true);
	
	$jsonData = file_get_contents('./data/db.json');
	if ($jsonData === FALSE) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array('ret' => "Can't read file"));
        return;
	}
	$data = json_decode($jsonData, true);
	
	$counter++;
	$data[] = array('id' => $counter, 'name' => $payloadData['name'], 'type' => $payloadData['type']);
	$res = file_put_contents("./data/db.json", json_encode($data));
    if (! $res) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array('ret' => "Can't write file"));
        return;
    }
	echo json_encode(array('ret' => 'OK'));	
} elseif (isset($_GET['func']) && $_GET['func'] == 'deleteUser') {
	$payload = file_get_contents('php://input');
	if ($payload === FALSE) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array('ret' => "Can't get input"));
        return;
	}
	$payloadData = json_decode($payload, true);
	
	$jsonData = file_get_contents('./data/db.json');
	if ($jsonData === FALSE) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array('ret' => "Can't read file"));
        return;
	}
	$data = json_decode($jsonData, true);
	$i = 0;
	$newData = array();
	foreach ($data as $row) {
		if ($row['id'] != $payloadData['id']) {
			$newData[] = array('id' => $row['id'], 'type' => $row['type'], 'name' => $row['name']);
		}
	}
	$res = file_put_contents("./data/db.json", json_encode($newData));
    if (! $res) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array('ret' => "Can't write file"));
        return;
    }
	echo json_encode(array('ret' => 'OK'));	
} elseif (isset($_GET['func']) && $_GET['func'] == 'getUser') {
	$payload = file_get_contents('php://input');
	if ($payload === FALSE) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array('ret' => "Can't get input"));
        return;
	}
	$payloadData = json_decode($payload, true);
	
	$jsonData = file_get_contents('./data/db.json');
	if ($jsonData === FALSE) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array('ret' => "Can't read file"));
        return;
	}
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
	if ($payload === FALSE) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array('ret' => "Can't get input"));
        return;
	}
	$payloadData = json_decode($payload, true);
	
	$jsonData = file_get_contents('./data/db.json');
	if ($jsonData === FALSE) {
		header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array('ret' => "Can't read file"));
        return;
	}
	$data = json_decode($jsonData, true);
	$i = 0;
	$newData = array();
	foreach ($data as &$row) {
		$i++;
		if ($row['id'] == $payloadData['id']) {
			$newData[] = array('id' => $i, 'name' => $payloadData['name'], 'type' => $payloadData['type']);
		} else {
			$newData[] = $row;
		}
	}
	$res = file_put_contents("./data/db.json", json_encode($newData));
    if (! $res) {
        header("HTTP/1.1 500 Internal Server Error");
        echo json_encode(array('ret' => "Can't write file"));
        return;
    }
	echo json_encode(array('ret' => 'OK', 'test' => $payloadData['name']));
}
