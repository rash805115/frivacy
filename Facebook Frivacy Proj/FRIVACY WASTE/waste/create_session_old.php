<?php

/*
	Frivacy project
	LERSAIS, SIS, Pitt
	Amirreza Masouzmzadeh
*/
// set up FirePHP

require "database.php";
require_once('../lib/FirePHPCore/FirePHP.class.php');
ob_start();
$firephp = FirePHP::getInstance(true);

require 'facebook.php';

// Avoid Facebook exception "CurlException: 60: SSL certificate problem..."
Facebook::$CURL_OPTS[CURLOPT_SSL_VERIFYPEER] = false;
Facebook::$CURL_OPTS[CURLOPT_SSL_VERIFYHOST] = 2;

// Create application instance
$facebook = new Facebook(array(
  'appId'  => '181187985239049',
  'secret' => '61619c40cc8803594672b6f21c969cd9',
  'cookie' => true,
));

// create session
$session = $facebook->getSession();
$me = null;
$loginRequired = false;
$requiredPermissions = array(		// comma-separated list of required permissions
	'read_friendlists' => 1
	);
$uid = "";
$firephp->log('check session');
$firephp->log($session);
if ($session) {
	try {
		$uid = $facebook->getUser();
		$me = $facebook->api('/me');
		$firephp->log($uid);
		//checking required permissions
		$permissions = $facebook->api('/me/permissions');
		$firephp.log($permissions);
		$firephp.log($requiredPermissions);
		if (array_intersect_key($permissions['data'][0], $requiredPermissions) != $requiredPermissions) {
			$loginRequired = true;	// require login to acquire permissions
		}
		
	} catch (FacebookApiException $e) {
		echo "Exception: ".$e;
		error_log($e);
	}
}
else {
	$loginRequired = true;
}
	

// redirect to the login page if needed
if($loginRequired) {
	$url = $facebook->getLoginUrl(array(
		'canvas' => 1,
		'fbconnect' => 0,
//		'req_perms' => implode(',', array_keys($requiredPermissions))
	));
	echo $url;
	echo "<script type='text/javascript'>top.location.href = '$url';</script>";
}

?>