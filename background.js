// Chrome automatically creates a background.html page for this to execute.
// This can access the inspected page via executeScript
//
// Can use:
// chrome.tabs.*
// chrome.extension.*

var key = "nasdsadfsdfsdfsadfaswawqeqedasd",
    devtoolsPort;

chrome.runtime.onConnect.addListener(function (port) {
    if (port.name === key + "devtools") {
        devtoolsPort = port;

        devtoolsPort.onMessage.addListener(function (args) {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, args);
            });
        });
    }
});