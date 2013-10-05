<?php
session_start();

require "database.php";
//remove the cookies and do with sessions
$_SESSION['access_token'] = $_COOKIE['access'];
$_SESSION['uid'] = $_COOKIE['uid'];

$fql_query_url = 'https://graph.facebook.com/'
    . '/fql?q=SELECT+name,flid+FROM+friendlist+WHERE+owner=me()'
    . '&access_token=' . $_SESSION['access_token'];
  $fql_query_result = file_get_contents($fql_query_url);
  $results = json_decode($fql_query_result, true);
  

/*
//Make facebook query
$param = array(
			'method'    => 'fql.query',
			'access_token' => $_SESSION['access_token'], // set this according to you
			'query'     => 'SELECT name,flid FROM friendlist WHERE owner=me()',
		);
		$results   =   $facebook->api($param);
////////////////
*/
		
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

		
		
$sth = $dbh->prepare("select id from transaction where userRef='{$_SESSION['uid']}' ORDER BY id DESC LIMIT 1");
$sth->execute();
$info = $sth->fetchAll();
$transactionRef = $info[0][0];
$sth = $dbh->prepare("select settingRef,settingValue,settingValueId from usersetting where transactionRef='{$transactionRef}'");
$sth->execute();
$info = $sth->fetchAll();

$elements = array();
$i = 0;

while($i < count($info))
{
	$sth = $dbh->prepare("select label from setting where id='{$info[$i][0]}'");
	$sth->execute();
	$label_res = $sth->fetchAll();
	
	$info[$i][0] = $label_res[0][0];
	
	$elements[$i] = $info[$i];
	$i = $i + 1;
	
}


$repeat = 0;
$tag_name = "";
$tag_setting = "";
foreach($elements as $value)
{
	if($value[1] == "everyone")
	{
		$value[2] = "N/A";
	}
	
	else if($value[1] == "off")
	{
		$value[2] = "N/A";
		$value[1] = "You don't review";
	}
	
	else if($value[1] == "on")
	{
		$value[2] = "N/A";
		$value[1] = "You review";
	}
	
	else if($value[1] == "public")
	{
		$value[2] = "N/A";
		$value[1] = "everyone";
	}
	
	else if($value[1] == "friends of friends")
	{
		$value[2] = "N/A";
	}
	
	else if($value[1] == "friends")
	{
		if($value[2] == NULL)
		{
			$value[2] = "N/A";
		}
		
		else if($value[2] == "30")
		{
			$value[2] = "Customized:";
		}
		
		else if($value[2] == "40")
		{
			$value[2] = "friends";
		}
		
		else if($value[2] == "50")
		{
			$value[2] = "friends of friends";
		}
	}
	
	else if($value[1] == "custom_value")
	{
		continue;
	}
	
	else if($value[1] == "no_tag_expansion")
	{
		continue;
	}
	
	
	else if($value[1] == "lists")
	{
		$name = find_name($results['data'],$value[2]);
		$value[2] = $name;
		$value[1] = "Allowed to Lists";
	}
	
	else if($value[1] == "list_anon")
	{
		continue;
	}
	
	else if($value[1] == "lists_x")
	{
		$name = find_name($results['data'],$value[2]);
		$value[2] = $name;
		$value[1] = "NOT Allowed to Lists";
	}
	
	else if($value[1] == "ids_anon")
	{
		/*
		$param = array(
			'method'    => 'fql.query',
			'access_token' => $session['access_token'], // set this according to you
			'query'     => "SELECT name FROM user WHERE uid='{$value[2]}'",
		);
		$id_to_name = $facebook->api($param);
		*/
		
		$fql_query_url = 'https://graph.facebook.com/'
		. '/fql?q=SELECT+name+FROM+user+WHERE+uid='
		. $value[2]
		. '&access_token=' . $_SESSION['access_token'];
		$fql_query_result = file_get_contents($fql_query_url);
		$id_to_name = json_decode($fql_query_result, true);
		
		
		
		
		$value[2] = $id_to_name['data'][0]['name'];
		$value[1] = "Allowed to Persons";
	}
	
	else if($value[1] == "ids_x_anon")
	{
		/*
		$param = array(
			'method'    => 'fql.query',
			'access_token' => $session['access_token'], // set this according to you
			'query'     => "SELECT name FROM user WHERE uid='{$value[2]}'",
		);
		$id_to_name = $facebook->api($param);
		*/
		
		
		$fql_query_url = 'https://graph.facebook.com/'
		. '/fql?q=SELECT+name+FROM+user+WHERE+uid='
		. $value[2]
		. '&access_token=' . $_SESSION['access_token'];
		$fql_query_result = file_get_contents($fql_query_url);
		$id_to_name = json_decode($fql_query_result, true);
		
		
		
		
		$value[2] = $id_to_name['data'][0]['name'];
		$value[1] = "Not Allowed to Persons";
	}
	
	if($tag_name == $value[0])
	{
		if($tag_setting == $value[1])
		{
			$table_result = "<tr><td></td><td></td><td>{$value[2]}</td></tr>";
		}
		else
		{
			$table_result = "<tr><td></td><td>{$value[1]}</td><td>{$value[2]}</td></tr>";
			$tag_setting = $value[1];
		}
	}
	else
	{
		$tag_name = $value[0];
		$tag_setting = $value[1];
		$table_result = "<tr><td>{$value[0]}</td><td>{$value[1]}</td><td>{$value[2]}</td></tr>";
	}
	echo $table_result;
}

?>