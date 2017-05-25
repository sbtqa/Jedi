/**
 * Created by cyber-PC on 08.05.2017.
 */

function log(message) {
    chrome.devtools.inspectedWindow.eval("console.log('" + message + "')");
}

function getXPaths(callback) {
    chrome.devtools.inspectedWindow.eval("getXPath($0)",
        {useContentScriptContext: true}, function (result, exception) {
            callback(result, exception);
        });
}

function getProperties(callback) {
    chrome.devtools.inspectedWindow.eval("getProperties()",
        {useContentScriptContext: true}, function (result, exception) {
            callback(result, exception);
        });
}

function addRow(text) {
    chrome.devtools.inspectedWindow.eval("addRow("+ text +")", {useContentScriptContext: true}, function (result, exception) {
        console.log(exception);
    });
}