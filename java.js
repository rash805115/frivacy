//to detect browsers
function BrowserDetection() {

        if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {

            var ffversion = new Number(RegExp.$1) ; 
				alert("Firefox " + ffversion);
        }

        else if (/MSIE (\d+\.\d+);/.test(navigator.userAgent)) {

            var ieversion = new Number(RegExp.$1); 
alert("IE " + ieversion);			
        }

        else if (/Chrome[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
            var chromeversion = new Number(RegExp.$1);
            // capture x.x portion and store as a number
			alert("Chrome " + chromeversion);

        }
        else if (/Opera[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {

            var oprversion = new Number(RegExp.$1) ;
			alert(oprversion);
        }
        else if (/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent)) {
            var safariversion = new Number(RegExp.$1);
alert(safariversion);

        }
}




//to redirect
$("#redirect").click(function() {
	chrome.tabs.create({url: "jlt.html"});
});



//to collect data
$("#launch").click(function() {
BrowserDetection();
appURL = "//apps.facebook.com/frivacy";

settings = {};		// settings array
settingLabel = "";
settingValue = "";

userID = "100000037056271";


// "how you connect" settings
gr_connect = $.ajax({
					url: "https://www.facebook.com/ajax/settings/privacy/connect.php",
					type: "GET",
					data: {__a: 1, __d: 1, __user: userID},
					dataType: "text"
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
					// console.log("done connect");
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
					// console.log("done tagging");
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
							settingLabel = $(this).children("th[class:label]").html();
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
					// console.log("done family");
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
							settingLabel = $(this).children("th[class:label]").html();
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
					// console.log("done about");
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
							settingLabel = $(this).children("th[class:label]").html();
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
					// console.log("done basic");
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
							settingLabel = $(this).children("th[class:label]").html();
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
					// console.log("done quotes");
				});
				
				
				
				
				



				
// query all the requests and process the results
				$.when(
				gr_connect, 
				gr_tag
				).done( function() {
					// console.log("done");
					// console.log(settings);

					// send privacy settings to the server
					$.ajax({
						url: "https://lersais.exp.sis.pitt.edu/frivacy/save-settings.php",
						type: "POST",
						data: {jsondata: JSON.stringify(settings)},
						dataType: "text"
					}).done( function(response){
						console.log("data was successfully sent");
						
						alert("Scanning your privacy settings is complete. You will be redirected to the app.");
						// redirect user to the app page
						top.location.href = appURL;
					}).fail( function(xhr, ajaxOptions, thrownError){
						alert("Error sending the results!")
					});
				});
				
});