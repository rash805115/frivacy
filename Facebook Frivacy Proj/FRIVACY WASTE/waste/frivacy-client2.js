window.fbAsyncInit = function() {
    FB.init({
      appId      : '181187985239049', // App ID
      channelUrl : 'https://lersais.exp.sis.pitt.edu/frivacy/channel.html', // Channel File
      status     : true, // check login status
      cookie     : true, // enable cookies to allow the server to access the session
      xfbml      : true  // parse XFBML
    });
	

	
	// Additional init code here
	FB.getLoginStatus(function(response) {
	  if (response.status === 'connected') {
		// connected
		fetch_data(response);
	  } else if (response.status === 'not_authorized') {
		// not_authorized
			authorize();
			FB.Event.subscribe('auth.login', function(response) {
					fetch_data(response);
			});
	  } else {
		// not_logged_in
			authorize();
			FB.Event.subscribe('auth.login', function(response) {
					fetch_data(response);
			});
	  }
	  
	  });
  };
  
  
  
     function authorize()
   {
			(function(d, s, id) {
			  var js, fjs = d.getElementsByTagName(s)[0];
			  if (d.getElementById(id)) return;
			  js = d.createElement(s); js.id = id;
			  js.src = "//connect.facebook.net/en_US/all.js#xfbml=1&appId=APP_ID";
			  fjs.parentNode.insertBefore(js, fjs);
			}(document, 'script', 'facebook-jssdk'));
   }
   

  // Load the SDK Asynchronously
  (function(d){
     var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement('script'); js.id = id; js.async = true;
     js.src = "//connect.facebook.net/en_US/all.js";
     ref.parentNode.insertBefore(js, ref);
   }(document));
   
   function fetch_data(response)
   {
		userID = response.authResponse.userID;
		accessToken = response.authResponse.accessToken;
		
		alert(userID);
		
		
		
		
			settings = {};		// settings array
			settingLabel = "";
			settingValue = "";
			temp = "";
			
			var req = new XMLHttpRequest();
			
			// "how you connect" settings
			req.open(
					"GET",
					"https://www.facebook.com/ajax/settings/privacy/connect.php?__a=1&__d=1&__user=" + userID,	
					true
			);

			req.onload = show1;
			req.send(null);
			alert(req.readyState);
			function show1() {
					alert(req.responseText);
					response = req.responseText;
					// clean up and convert the response to JSON. source: http://stackoverflow.com/questions/7666139/how-to-put-a-json-file-with-html-information-into-the-dom
					response = response.substring(9,response.length);	// remove "for(;;);"
					// response = response.replace(/.*?;{/, "{");
					jsonFile = JSON.parse(response);
					// append response to body in a specific div
					$("body").append("<div id='frivacy-div' style='display:none;visibility:hidden;'> " + jsonFile.payload.body.__html + "</div>");
					// retrieve settings within that div
					$(".fbPrivacyConnectItem", "#frivacy-div").each( function(){
							settingLabel = $(this).children("div.privacyLabel.lfloat").html();
							settingValue = $(this).find("span.uiButtonText").html();
							settings[settingLabel] = settingValue;
						});
					$("#frivacy-div").remove();
					// console.log("done connect");
					//temp = settingLabel;alert(temp);
			}
			
			//alert(temp);
		
		
		
   }