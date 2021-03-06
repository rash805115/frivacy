/*
?????		2 Updated Pending		?????
To find errors, do <ctrl + f> and find 5 or more consecutive question marks ("?????").


1) data from "collect_info" and "quotes" are not getting collected.
2) Once you get the SSL cert, change "http" to "https".
*/

/*
This page is "background.js" and this page runs in the "background" of chrome web-browsers. For more details please look how to create background pages in google chrome.
Also look "manifest.json" where this page is defined.

When the user clicks the button in the app to scan their settings, the JS page "catch.js" is called, which is located in the same directory. (See catch.js)
This page "background.js" is actually listening to an event generated by the "catch.js".

The flow of the program is like this:
1) In start, you will see addListener method for chrome. This is an event-listener. When it received the request from "catch.js", it does 2 things:
2) It collects the userID that is send by the "catch.js". (For more details, see "catch.js")
3) It calls the method collect(). The method "collect()" collects all the data and sends it to the server.

Method collect() works as follows:
1) Checks if jquery has loaded.
2) "settings" is the array where all data is loaded.
3) We save userID in "settings["userFBId"]" to send it to the server.
4) These ajax calls are made to collect the data:
	1. connect
	2. tag
	3. eduwork
	4. hometown
	5. family & relationships
	6. bio
	7. basic info
	8. contact info	?????(We left this part because this had problems).
	9. quotes		?????(We left this part because this had problems).
	
5) After all the data is collected, send the data to the server and after that this method also signals back the "catch.js" that everything has completed.
	"catch.js" when received this signal, it then refreshes the page. For more details please read "catch.js"
*/

var userID = "";

chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.clicked_frivacy_ext == "true")
	{
		userID = request.uid;
		collect();
	}
  });
  
function collect()
{
	if (!window.jQuery) {
		alert("no jQuery yet!");
	}
	
	//userID = 504592327;
	appURL = "//apps.facebook.com/frivacy";
	settings = {};		// settings array
	settingLabel = "";
	settingValue = "";
	
	settings["userFBId"] = userID;
	
	// "how you connect" settings
	gr_connect = $.ajax({
			url: "https://www.facebook.com/ajax/settings/privacy/connect.php",
			type: "GET",
			data: {__a: 1, __d: 1, __user: userID},
			dataType: "text",
		}).done( function(response){
		
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
			console.log("done connect");
		});

	// "timeline and tagging" settings
	gr_tag = $.ajax({
			url: "https://www.facebook.com/ajax/settings/privacy/tag.php",
			type: "GET",
			data: {__a: 1, __d: 1, __user: userID},
			dataType: "text"
		}).done( function(response){
			// clean up and convert the response to JSON. source: http://stackoverflow.com/questions/7666139/how-to-put-a-json-file-with-html-information-into-the-dom
			response = response.substring(9,response.length);	// remove "for(;;);"
			jsonFile = JSON.parse(response);
			// append response to body in a specific div
			$("body").append("<div id='frivacy-div' style='display:none;visibility:hidden;'> " + jsonFile.payload.body.__html + "</div>");
			// retrieve settings within that div
			$("tr", "#frivacy-div").each( function(){
					settingLabel = $(this).find("div.pvm.phs").html();
					settingValue = $(this).find("span.uiButtonText").html();
					// off/on or other types of settings
					if (!settingValue) {	
						settingValue = $(this).find("span.fbPrivacyTagDialogStatus").html();
					}
					// record custom settings
					else if (settingValue.toLowerCase() == "custom") {
						$(this).find("span.customPrivacyInputs > input").each( function(){
							settingValue += ";" + $(this).attr("name") + ":" + $(this).attr("value");
						} );
					}
					settings[settingLabel] = settingValue;
				} );
			$("#frivacy-div").remove();
			console.log("done tagging");
		});


	// "Work and Education" settings
	gr_eduwork = $.ajax({
			url: "https://www.facebook.com/ajax/timeline/edit_profile/eduwork.php",
			type: "GET",
			data: {__a: 1, __user: userID},
			dataType: "text"
		}).done( function(response){
			// clean up and convert the response to JSON.
			response = response.substring(9,response.length);	// remove "for(;;);"
			jsonFile = JSON.parse(response);
			// append response to body in a specific div
			$("body").append("<div id='frivacy-div' style='display:none;visibility:hidden;'> " + jsonFile.domops[0][3].__html + "</div>");
			// retrieve settings within that div
			$("table.fbEditProfileExperienceSection > tbody", "#frivacy-div").each( function(){
					settingLabel = $(this).find("input.inputtext[type=text]").attr("value");
					settingValue = $(this).find("li.fbPrivacyAudienceSelectorOption.checked").attr("data-label");
					// record custom settings
					if (settingValue.toLowerCase() == "custom") {
						$(this).find("span.customPrivacyInputs > input").each( function(){
							settingValue += ";" + $(this).attr("name") + ":" + $(this).attr("value");
						} );
					}
					settings[settingLabel] = settingValue;
				} );
			$("#frivacy-div").remove();
			console.log("done work");
		});
		
	// "Living" settings	
	gr_hometown = $.ajax({
			url: "https://www.facebook.com/ajax/timeline/edit_profile/hometown.php",
			type: "GET",
			data: {__a: 1, __user: userID},
			dataType: "text"
		}).done( function(response){
			// clean up and convert the response to JSON.
			response = response.substring(9,response.length);	// remove "for(;;);"
			jsonFile = JSON.parse(response);
			// append response to body in a specific div
			$("body").append("<div id='frivacy-div' style='display:none;visibility:hidden;'> " + jsonFile.jsmods.markup[0][1].__html  + "</div>");
			// retrieve settings within that div
			$("table.uiInfoTable > tbody > tr", "#frivacy-div").each( function(){
					settingLabel = $(this).children("th[class=label]").html();
					settingValue = $(this).find("li.fbPrivacyAudienceSelectorOption.checked").attr("data-label");
					// record custom settings
					if (settingValue.toLowerCase() == "custom") {
						$(this).find("span.customPrivacyInputs > input").each( function(){
							settingValue += ";" + $(this).attr("name") + ":" + $(this).attr("value");
						} );
					}
					settings[settingLabel] = settingValue;
				} );
			$("#frivacy-div").remove();
			console.log("done living");
		});
		
	// "Family" settings	
	gr_relationships = $.ajax({
			url: "https://www.facebook.com/ajax/timeline/edit_profile/relationships.php",
			type: "GET",
			data: {__a: 1, __user: userID},
			dataType: "text"
		}).done( function(response){
			// clean up and convert the response to JSON.
			response = response.substring(9,response.length);	// remove "for(;;);"
			jsonFile = JSON.parse(response);
			// append response to body in a specific div
			$("body").append("<div id='frivacy-div' style='display:none;visibility:hidden;'> " + jsonFile.jsmods.markup[0][1].__html + "</div>");
			// retrieve settings within that div
			$("table.uiInfoTable > tbody > tr", "#frivacy-div").each( function(){
					settingLabel = $(this).children("th[class=label]").html();
					settingValue = $(this).find("li.fbPrivacyAudienceSelectorOption.checked").attr("data-label");
					if (!settingValue)	// skip spacer/non-visible items
						return true;
					// record custom settings
					if (settingValue.toLowerCase() == "custom") {
						$(this).find("span.customPrivacyInputs > input").each( function(){
							settingValue += ";" + $(this).attr("name") + ":" + $(this).attr("value");
						} );
					}
					settings[settingLabel] = settingValue;
				} );
			$("#frivacy-div").remove();
			console.log("done family");
		});
		
	// "About You" settings	
	gr_bio = $.ajax({
			url: "https://www.facebook.com/ajax/timeline/edit_profile/bio.php",
			type: "GET",
			data: {__a: 1, __user: userID},
			dataType: "text"
		}).done( function(response){
			// clean up and convert the response to JSON.
			response = response.substring(9,response.length);	// remove "for(;;);"
			jsonFile = JSON.parse(response);
			// append response to body in a specific div
			$("body").append("<div id='frivacy-div' style='display:none;visibility:hidden;'> " + jsonFile.jsmods.markup[0][1].__html + "</div>");
			// retrieve settings within that div
			$("table.uiInfoTable > tbody > tr", "#frivacy-div").each( function(){
					settingLabel = $(this).children("th[class=label]").html();
					settingValue = $(this).find("li.fbPrivacyAudienceSelectorOption.checked").attr("data-label");
					if (!settingValue)	// skip spacer/non-visible items
						return true;
					// record custom settings
					if (settingValue.toLowerCase() == "custom") {
						$(this).find("span.customPrivacyInputs > input").each( function(){
							settingValue += ";" + $(this).attr("name") + ":" + $(this).attr("value");
						} );
					}
					settings[settingLabel] = settingValue;
				} );
			$("#frivacy-div").remove();
			console.log("done about");
		});
		
	// "Basic Info" settings	
	// *** item "sex" is not captured currently
	gr_basic_info = $.ajax({
			url: "https://www.facebook.com/ajax/timeline/edit_profile/basic_info.php",
			type: "GET",
			data: {__a: 1, __user: userID},
			dataType: "text"
		}).done( function(response){
			// clean up and convert the response to JSON.
			response = response.substring(9,response.length);	// remove "for(;;);"
			jsonFile = JSON.parse(response);
			// append response to body in a specific div
			$("body").append("<div id='frivacy-div' style='display:none;visibility:hidden;'> " + jsonFile.jsmods.markup[0][1].__html + "</div>");
			// retrieve settings within that div
			$("table.uiInfoTable > tbody > tr", "#frivacy-div").each( function(){
					settingLabel = $(this).children("th[class=label]").html();
					settingValue = $(this).find("li.fbPrivacyAudienceSelectorOption.checked").attr("data-label");
					if (!settingValue)	// skip spacer/non-visible items
						return true;
					// record custom settings
					if (settingValue.toLowerCase() == "custom") {
						$(this).find("span.customPrivacyInputs > input").each( function(){
							settingValue += ";" + $(this).attr("name") + ":" + $(this).attr("value");
						} );
					}
					settings[settingLabel] = settingValue;
				} );
			$("#frivacy-div").remove();
			console.log("done basic");
		});
		
	// "Contact Info" settings	
	//*** 8/27/2012: does not work for now beacuse FB requires re-entering password to edit the settings
	// gr_contact_info = $.ajax({
			// url: "https://www.facebook.com/ajax/timeline/edit_profile/contact_info.php",
			// type: "GET",
			// data: {__a: 1, __user: userID},
			// dataType: "text"
		// }).done( function(response){
			// clean up and convert the response to JSON.
			// response = response.substring(9,response.length);	// remove "for(;;);"
			// jsonFile = JSON.parse(response);
			// console.log(jsonFile);
			// append response to body in a specific div
			// $("body").append("<div id='frivacy-div' style='display:none;visibility:hidden;'> " + jsonFile.jsmods.markup[0][1].__html + "</div>");
			// retrieve settings within that div
			// prevLabel = "";		// to store label for items with multiple values & settings
			// $("li.fbPrivacyAudienceSelectorOption.checked", "#frivacy-div").each( function(){
					// settingValue = $(this).attr("data-label");
					// settingLabel = $(this).closest("tr").children("th[class:label]").html();
					// if (!settingLabel) {	// use label from previous + counter
						// settingLabel = prevLabel + labelCounter++;
					// }
					// else {					// reset label & counter
						// prevLabel = settingLabel;
						// labelCounter = 1;
					// }
					// record custom settings
					// if (settingValue.toLowerCase() == "custom") {
						// $(this).find("span.customPrivacyInputs > input").each( function(){
							// settingValue += ";" + $(this).attr("name") + ":" + $(this).attr("value");
						// } );
					// }
					// settings[settingLabel] = settingValue;
				// } );
			// $("#frivacy-div").remove();
			// console.log("done contact");
		// });
		
	// "Favorite Quotations" settings	
	gr_quotes = $.ajax({
			url: "https://www.facebook.com/ajax/timeline/edit_profile/quotes.php",
			type: "GET",
			data: {__a: 1, __user: userID},
			dataType: "text"
		}).done( function(response){
			// clean up and convert the response to JSON.
			response = response.substring(9,response.length);	// remove "for(;;);"
			jsonFile = JSON.parse(response);
			content = jsonFile.domops[0][3];
			content = '{"html":' + content.substring(content.indexOf("HTML(") + 5, content.length - 2) + '}';
			jsonContent = JSON.parse(content);
			// append response to body in a specific div
			$("body").append("<div id='frivacy-div' style='display:none;visibility:hidden;'> " + jsonContent.html + "</div>");
			// retrieve settings within that div
			$("table.uiInfoTable > tbody > tr", "#frivacy-div").each( function(){
					settingLabel = $(this).children("th[class=label]").html();
					settingValue = $(this).find("li.fbPrivacyAudienceSelectorOption.checked").attr("data-label");
					if (!settingValue)	// skip spacer/non-visible items
						return true;
					// record custom settings
					if (settingValue.toLowerCase() == "custom") {
						$(this).find("span.customPrivacyInputs > input").each( function(){
							settingValue += ";" + $(this).attr("name") + ":" + $(this).attr("value");
						} );
					}
					settings[settingLabel] = settingValue;
				} );
			$("#frivacy-div").remove();
			console.log("done quotes");
		});
		
	// query all the requests and process the results
	$.when(
		gr_connect, 
		gr_tag, 
		gr_eduwork, 
		gr_hometown, 
		gr_relationships,
		gr_bio,
		gr_basic_info
		// gr_contact_info,		//*** has issues	?????	For more details on this issue see top.
		//gr_quotes	?????	For more details on this issue see top.
		).done( function() {
			console.log("done");
			
			// send privacy settings to the server
			
					/* ?????	once we have SSL cert. remember to put here "https" instead of "http"	????? */
					
					$.ajax({
						url: "http://lersais.exp.sis.pitt.edu/frivacy/save-settings.php",
						type: "POST",
						data: {jsondata: JSON.stringify(settings)},
						dataType: "text"
					}).done( function(response){
						console.log("data was successfully sent");
						
						alert("Scanning your privacy settings is complete. You Page will now refresh.");
						
						// once you have submitted all the data to the server, send message back to "catch.js" so that it can redirect the user.
						chrome.tabs.getSelected(null, function(tab) {
						  chrome.tabs.sendMessage(tab.id, {mission: "accomplished"});
						});
						
						
						
					}).fail( function(xhr, ajaxOptions, thrownError){
						alert("Error sending the results!")
					});
		});

}