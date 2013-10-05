<?php
session_start();

require "database.php";

$return_array = array();


	$sth = $dbh->prepare("select time from transaction where userRef='{$_SESSION['uid']}' ORDER BY time DESC LIMIT 1");
	$sth->execute();
	$info = $sth->fetchAll();
	
	$return_array[0] = $info[0][0];
	
	$return_array[0] = gmdate("Y-m-d H:i:s", $return_array[0]);
	
echo json_encode($return_array); 

?>