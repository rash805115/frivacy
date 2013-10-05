<?php
session_start();

require "database.php";

$final_res = array();

	$sth = $dbh->prepare("select settingRef from settingcategorization where graphcount=0");
	$sth->execute();
	$res = $sth->fetchAll();
	
	$i = 0;
	
	while($i < count($res))
	{
		$sth = $dbh->prepare("select label from setting where id={$res[$i][0]}");
		$sth->execute();
		$temp_info = $sth->fetchAll();
		
		$final_res[$i] = $temp_info[0][0];
		
		$i = $i + 1;
	}
	
	echo json_encode($final_res);
?>