<?php
session_start();

require "database.php";

$return_array = array();





//to check if the user has visited for the first time and also to check his consent value.
	$sth = $dbh->prepare("select id,consented from user where id='{$_SESSION['uid']}'");
	$sth->execute();
	$info = $sth->fetchAll();
	
	$is_old_user = count($info);

	//to check if old/new user.
	$return_array[0] = $is_old_user;
	
	//to check the consent value
	if($is_old_user == 0)
		$return_array[1] = -1;
	else
		$return_array[1] = $info[0][1];
	
	
	
	
echo json_encode($return_array); 

?>