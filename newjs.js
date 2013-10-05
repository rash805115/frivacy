settings = {};		// settings array
settingLabel = "";
settingValue = "";


userID = "100000037056271";


var req = new XMLHttpRequest();
req.open(
    "GET",
    "https://www.facebook.com/ajax/settings/privacy/connect.php?__a=1&__d=1&__user=" + userID,
    true);
req.onload = show1;
req.send(null);

function show1() {
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
					
					fun2(settings);
}

function fun2(settings)
{
			var req2 = new XMLHttpRequest();
			// "timeline and tagging" settings
			req2.open(
					"GET",
					"https://www.facebook.com/ajax/settings/privacy/tag.php?__a=1&__d=1&__user=" + userID,	
					true
			);

			req2.onload = show2;
			req2.send(null);
			
			function show2() {
					response = req2.responseText;
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
					// console.log("done tagging");
					fun4(settings);
			}
}

/*
function fun3(settings)
{
			var req3 = new XMLHttpRequest();
			// "Work and Education" settings
			req3.open(
					"GET",
					"https://www.facebook.com/ajax/timeline/edit_profile/eduwork.php?__a=1&__user=" + userID,	
					true
			);

			req3.onload = show3;
			req3.send(null);
			
			function show3() {
					response = req3.responseText;
					// clean up and convert the response to JSON.
					response = response.substring(9,response.length);	// remove "for(;;);"
					jsonFile = JSON.parse(response);
					// append response to body in a specific div
					$("body").append("<div id='frivacy-div' style='display:none;visibility:hidden;'> " + jsonFile.domops[0][3].__html + "</div>");
					// retrieve settings within that div
					$("table.fbEditProfileExperienceSection > tbody", "#frivacy-div").each( function(){
							settingLabel = $(this).find("input.inputtext[type:text]").attr("value");
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
					// console.log("done work");
					alert(response);
			}
}
*/

/*
function fun4(settings)
{
			var req4 = new XMLHttpRequest();	
			// "Living" settings
			req4.open(
					"GET",
					"https://www.facebook.com/ajax/timeline/edit_profile/hometown.php?__a=1&__user=" + userID,	
					true
			);

			req4.onload = show4;
			req4.send(null);
			
			function show4() {
					response = req4.responseText;
					// clean up and convert the response to JSON.
					response = response.substring(9,response.length);	// remove "for(;;);"
					jsonFile = JSON.parse(response);
					// append response to body in a specific div
					$("body").append("<div id='frivacy-div' style='display:none;visibility:hidden;'> " + jsonFile.jsmods.markup[0][1].__html  + "</div>");
					// retrieve settings within that div
					$("table.uiInfoTable > tbody > tr", "#frivacy-div").each( function(){
							settingLabel = $(this).children("th[class:label]").html();
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
					// console.log("done living");
					alert(settings[settingLabel]);
			}
}
*/