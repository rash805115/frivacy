//to redirect
$("#redirect").click(function() {
	chrome.tabs.create({url: "https://apps.facebook.com/frivacy/index.php"});
});