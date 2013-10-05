<?php
session_start();

require "database.php";

$cat = $_POST['category'];

$final_res = array();
$occured = array();

if($cat == 1)
{
	$sth = $dbh->prepare("select settingRef, cat1 from settingcategorization where graphcount=1");
	$sth->execute();
	$res = $sth->fetchAll();
	
	foreach($res as $first)
	{
		if(in_array($first[1], $occured))
		{
			$pos = 0;
			
			foreach($occured as $val)
			{
				if($val == $first[1])
				{
					break;
				}
				
				$pos = $pos + 1;
			}
			
			$c = count($final_res[$pos][1]);
			$final_res[$pos][1][$c] = $first[0];
		}
		else
		{
			$final_res[count($occured)] = array();
			$final_res[count($occured)][0] = $first[1];
			$final_res[count($occured)][1] = array();
			$final_res[count($occured)][1][0] = $first[0];
			
			$occured[count($occured)] = $first[1];
		}
	}
}
else if($cat == 2)
{
	$sth = $dbh->prepare("select settingRef, cat2 from settingcategorization where graphcount=1");
	$sth->execute();
	$res = $sth->fetchAll();
	
	foreach($res as $first)
	{
		if(in_array($first[1], $occured))
		{
			$pos = 0;
			
			foreach($occured as $val)
			{
				if($val == $first[1])
				{
					break;
				}
				
				$pos = $pos + 1;
			}
			
			$c = count($final_res[$pos][1]);
			$final_res[$pos][1][$c] = $first[0];
		}
		else
		{
			$final_res[count($occured)] = array();
			$final_res[count($occured)][0] = $first[1];
			$final_res[count($occured)][1] = array();
			$final_res[count($occured)][1][0] = $first[0];
			
			$occured[count($occured)] = $first[1];
		}
	}
}

for($i = 0; $i < count($final_res); $i++)
{
	for($j = 0; $j < count($final_res[$i][1]); $j++)
	{
		$sth = $dbh->prepare("select label from setting where id={$final_res[$i][1][$j]}");
		$sth->execute();
		$label = $sth->fetchAll();
		$label[0][0] = str_replace(':', '.', $label[0][0]);
		$final_res[$i][1][$j] = $label[0][0];
	}
}

echo json_encode($final_res); 
?>