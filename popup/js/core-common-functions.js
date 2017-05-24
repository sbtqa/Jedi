/**
 * Created by cyber-PC on 25.04.2017.
 */
// Sending message to content by this form {sender, value}.
function sendMessageToContent(message) {
    console.log(message);
    chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, message);
    });
}