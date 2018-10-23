function verifyOriginUrl(originHref) {
  return getHostName(originHref) === window.location.hostname;
}

function getHostName(url) {
  if (!url) {
    return "";
  }

  var testUrl = new URL(url);
  return testUrl.hostname;
}

// "testing" - should print "labs.detectify.com"
function testGetHostName() {
  console.log(getHostName("https://labs.detectify.com/2017/02/28/hacking-slack-using-postmessage-and-websocket-reconnect-to-steal-your-precious-token/"));
}
