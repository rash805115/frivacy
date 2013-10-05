<?php
require 'facebook.php';

// to avoid Facebook exception "CurlException: 60: SSL certificate problem..." on Strelka server
Facebook::$CURL_OPTS[CURLOPT_SSL_VERIFYPEER] = false;
Facebook::$CURL_OPTS[CURLOPT_SSL_VERIFYHOST] = 2;

// Create our Application instance
$facebook = new Facebook(array(
  'appId'  => '181187985239049',
  'secret' => '61619c40cc8803594672b6f21c969cd9',
  'cookie' => true,
));

$session = $facebook->getSession();
$me = null;
$loginRequired = false;
$requiredPermissions = array(		// required permissions
	'read_friendlists' => 1,
	'user_photos' => 1,
	'friends_photos' => 1,
	'user_photo_video_tags' => 1,
	'user_likes' => 1,
	'read_stream' => 1);

if ($session) {
	try {
		$uid = $facebook->getUser();
		$me = $facebook->api('/me');
		//checking required permissions
		$permissions = $facebook->api('/me/permissions');		
		if (array_intersect_key($permissions[data][0], $requiredPermissions) != $requiredPermissions) {
			$loginRequired = true;	// require login to acquire permissions
		}
		
	} catch (FacebookApiException $e) {
		echo "Exception: ".$e;
		error_log($e);
	}
}
else
	$loginRequired = true;

if($loginRequired) {
	$url = $facebook->getLoginUrl(array(
		'canvas' => 1,
		'fbconnect' => 0,
		'req_perms' => implode(',', array_keys($requiredPermissions)),	// comma-separated list of required permissions
	));
	echo "<script type='text/javascript'>top.location.href = '$url';</script>";
}
?>

<script language="JavaScript">
function runfql() {
    var httpc = new XMLHttpRequest();
    httpc.open("POST", "runfql.php", true);

    httpc.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
//   httpc.setRequestHeader("Content-Length", params.length); // POST request MUST have a Content-Length header (as per HTTP/1.1)

    httpc.onreadystatechange = function() { //Call a function when the state changes.
		if(httpc.readyState == 4 && httpc.status == 200) { // complete and no errors
			document.getElementById("responseText").innerHTML = httpc.responseText;
		}
    }
	document.getElementById("responseText").innerHTML = "...";
    httpc.send( "query=" + document.getElementById("queryText").value );
}
</script>

<!doctype html>
<html xmlns:fb="http://www.facebook.com/2008/fbml">
	<head>
		<title>Frivacy</title>
	</head>
	<body>
		<textarea id="queryText" rows="5" cols="80">SELECT pid FROM photo WHERE owner=504592327</textarea>
		<input type="button" value="Run FQL" onclick="runfql()"/>
		
		<div id="responseText">
		</div>
		
<!--		<h3>Session</h3>
		<?php if ($me): ?>
		<pre><?php print_r($session); ?></pre>

		<h3>You</h3>
		<img src="https://graph.facebook.com/<?php echo $uid; ?>/picture">
		<?php echo $me['name']; ?>

		<h3>Your User Object</h3>
		<pre><?php print_r($me); ?></pre>
		<?php else: ?>
		<strong><em>You are not Connected.</em></strong>
		<?php endif ?>
-->
	</body>
</html>

