chrome.extension.onMessage.addListener(
    function(request, sender, sendResponse) {
      switch (request.message) {
        case "activate_icon":
          chrome.pageAction.show(sender.tab.id);
        break;

        default:
          console.log("invalid request" + " " + request.message);
        break;

      };
});
