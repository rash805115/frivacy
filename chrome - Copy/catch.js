$("#launch").click(function() {
		var id = $(this).val();
		chrome.extension.sendMessage({clicked_frivacy_ext: "true", uid: id});
});


chrome.extension.onMessage.addListener(
  function(request, sender, sendResponse) {
    if (request.mission == "accomplished")
	{
		location.href = "https://apps.facebook.com/frivacy/";
	}
});