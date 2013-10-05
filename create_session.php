<?php 
   session_start();
   
   $app_id = "181187985239049";
   $app_secret = "61619c40cc8803594672b6f21c969cd9";
   $my_url = "https://lersais.exp.sis.pitt.edu/frivacy/";

   
   
   $code = $_REQUEST["code"];

   if(empty($code)) {
		 $_SESSION['state'] = md5(uniqid(rand(), TRUE)); // CSRF protection
		 $dialog_url = "https://www.facebook.com/dialog/oauth?client_id=" 
		   . $app_id . "&redirect_uri=" . urlencode($my_url) . "&state="
		   . $_SESSION['state'] . "&scope=user_birthday,read_stream";

		 echo("<script> top.location.href='" . $dialog_url . "'</script>");
   }
   
   if($_SESSION['state'] && ($_SESSION['state'] === $_REQUEST['state'])) {
		 $token_url = "https://graph.facebook.com/oauth/access_token?"
		   . "client_id=" . $app_id . "&redirect_uri=" . urlencode($my_url)
		   . "&client_secret=" . $app_secret . "&code=" . $code;

		 $response = file_get_contents($token_url);
		 $params = null;
		 parse_str($response, $params);
   }
   else {
		echo("The state does not match. You may be a victim of CSRF.");
   }
   
   
   $_SESSION['access_token'] = $params['access_token'];
   
   $graph_url = "https://graph.facebook.com/me?access_token=" 
       . $params['access_token'];

   $user = json_decode(file_get_contents($graph_url));
   
   
   $uid = $user->id;
   $_SESSION['uid'] = $uid;
   
   $graph_url_perm = "https://graph.facebook.com/" . $uid . "/permissions/?access_token=" 
       . $params['access_token'];
	   
   $perm = json_decode(file_get_contents($graph_url_perm));
   echo $_SESSION['uid'];
   
   //remove the cookies and do with sessions...also make changes in the bring_data.php
   $expire=time()+60*60*24*30;
	setcookie("uid", $uid, $expire);
	setcookie("access", $_SESSION['access_token'], $expire);
   /*
   Approx permission list is as follows :
   
   {
	   "data": [
		  {
			 "installed": 1,
			 "read_stream": 1,
			 "read_friendlists": 1,
			 "user_birthday": 1,
			 "bookmarked": 1
		  }
	   ],
	   "paging": {
		  "next": "https://graph.facebook.com/<UID>/permissions?access_token=<USER_ACCESS_TOKEN>&limit=5000&offset=5000"
	   }
	}
   
   
   */
?>