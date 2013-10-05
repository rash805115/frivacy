/*
!!!!!		1 Programmable Place		!!!!!
To find programmable place, do <ctrl + f> and find 5 or more consecutive exclamation marks ("!!!!!").

1) You can change where to redirect user, once all the settings have been collected.
*/

/*
This page is embedded in pages that are described in "manifest.json". Please look "manifest.json" for more details.
*/

// "#launch" is the ID of the button that user clicks to scan the settings. This JS page listens for that click. If the user click the button, then this JS page
// notifies the page "background.js" that user has clicked, start to collect data. It actually sends the message which you can see below.
$("#launch").click(function() {
		var id = $(this).val();
		chrome.extension.sendMessage({clicked_frivacy_ext: "true", uid: id});
});

//When "background.js" has completed data collection, and have send the data to the server, then it sends a message back to this page, so that this page may know
//when to refresh the page.
chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.mission == "accomplished")
	{
		//	!!!!!		If you want to redirect the user to some other page, then do so here.			!!!!!
		location.href = "https://apps.facebook.com/frivacy/";
	}
});