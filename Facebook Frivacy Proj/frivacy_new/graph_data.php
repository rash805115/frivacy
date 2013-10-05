<?php
session_start();

require "database.php";

$cat = $_POST['category'];

if($cat == 1)
{
	$sth = $dbh->prepare("select settingRef,cat1 from settingcategorization where graphcount=1");
	$sth->execute();
	$info = $sth->fetchAll();
	
	
	$sth = $dbh->prepare("select id from transaction where userRef='{$_SESSION['uid']}' ORDER BY time DESC LIMIT 1");
	$sth->execute();
	$res = $sth->fetchAll();
	$transactionRef = $res[0][0];
	

	$i = 0;
	
	while($i < count($info))
	{
		$sth = $dbh->prepare("select settingValue,settingValueId from usersetting where transactionRef={$transactionRef} and settingRef={$info[$i][0]}");
		$sth->execute();
		$temp_info = $sth->fetchAll();
		
		if(count($temp_info) == 0)
		{
			$i = $i + 1;
			continue;
		}
		$info[$i][2] = $temp_info[0][0];
		$info[$i][3] = $temp_info[0][1];
		unset($info[$i]['cat1']);
		unset($info[$i]['settingRef']);
		$i = $i + 1;
	}
	
	
	echo json_encode($info); 
}

if($cat == 2)
{
	$sth = $dbh->prepare("select settingRef,cat2 from settingcategorization where graphcount=1");
	$sth->execute();
	$info = $sth->fetchAll();
	
	
	$sth = $dbh->prepare("select id from transaction where userRef='{$_SESSION['uid']}' ORDER BY time DESC LIMIT 1");
	$sth->execute();
	$res = $sth->fetchAll();
	$transactionRef = $res[0][0];

	$i = 0;
	
	while($i < count($info))
	{
		$sth = $dbh->prepare("select settingValue,settingValueId from usersetting where transactionRef={$transactionRef} and settingRef={$info[$i][0]}");
		$sth->execute();
		$temp_info = $sth->fetchAll();
		
		if(count($temp_info) == 0)
		{
			$i = $i + 1;
			continue;
		}
		$info[$i][2] = $temp_info[0][0];
		$info[$i][3] = $temp_info[0][1];
		unset($info[$i]['cat1']);
		unset($info[$i]['settingRef']);
		$i = $i + 1;
	}
	
	
	echo json_encode($info); 
}

?>