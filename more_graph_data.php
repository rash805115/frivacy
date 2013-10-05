<?php
session_start();

require "database.php";


$fql_query_url = 'https://graph.facebook.com/'
    . '/fql?q=SELECT+name,flid+FROM+friendlist+WHERE+owner=me()'
    . '&access_token=' . $_SESSION['access_token'];
  $fql_query_result = file_get_contents($fql_query_url);
  $results = json_decode($fql_query_result, true);


//bring names of ID's in lists.
function find_name($result,$input)
{		
		$key_name = '';
		foreach ($result as $value)
		{
			if($value['flid'] == $input)
			{
				$key_name = $value['name'];
			}
		}
		return $key_name;
}
//////////////		

$settRef = 21;

	
	$sth = $dbh->prepare("select id from transaction where userRef='{$_SESSION['uid']}' ORDER BY id DESC LIMIT 1");
	$sth->execute();
	$res = $sth->fetchAll();
	$transactionRef = $res[0][0];
	
	
	$sth = $dbh->prepare("select label from setting where id={$settRef}");
	$sth->execute();
	$res2 = $sth->fetchAll();
	
	
	
	$sth = $dbh->prepare("select settingValue,settingValueId from usersetting where transactionRef={$transactionRef} and settingRef={$settRef}");
	$sth->execute();
	$info = $sth->fetchAll();
	
	for($i = 0; $i < count($info) ; $i = $i + 1)
	{
			if(($info[$i][0] == "ids_x_anon") || ($info[$i][0] == "ids_anon"))
			{
					/*
					$param = array(
					'method'    => 'fql.query',
					'access_token' => $session['access_token'], // set this according to you
					'query'     => "SELECT name FROM user WHERE uid='{$info[$i][1]}'",
					);
					$id_to_name = $facebook->api($param);
					*/
					
					
					$fql_query_url = 'https://graph.facebook.com/'
					. '/fql?q=SELECT+name+FROM+user+WHERE+uid='
					. $info[$i][1]
					. '&access_token=' . $_SESSION['access_token'];
					$fql_query_result = file_get_contents($fql_query_url);
					$id_to_name = json_decode($fql_query_result, true);
					
					
					$info[$i][1] = $id_to_name['data'][0]['name'];
			}
			else if(($info[$i][0] == "lists") || ($info[$i][0] == "lists_x"))
			{
					$info[$i][1] = find_name($results['data'],$info[$i][1]);
			}
	}
	
	$final_res = array();
	
	$final_res[0][0] = "special";
	$final_res[0][1] = $res2[0][0];
	
	for($i = 0; $i < count($info) ; $i = $i + 1)
	{
			$final_res[$i + 1][0] = $info[$i][0];
			$final_res[$i + 1][1] = $info[$i][1];
	}
	
echo json_encode($final_res); 
?>