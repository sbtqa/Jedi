var key = "nasdsadfsdfsdfsadfaswawqeqedasd";
var port = chrome.runtime.connect({name: key + "devtools"});

function log(message) {
    port.postMessage({
        function: "log",
        args: {message: message}
    });
}

function setupXEngine(code) {
    var lines = code.split(/\n/);
    var string = "";
    for (var i = 0; i < lines.length; i++)
        if (!lines[i].includes("//$"))
            string += lines[i];
    string = string.replace(/[\n\r]+/g, '');
    chrome.devtools.inspectedWindow.eval("setupXEngine(\"" + string + "\")", {useContentScriptContext: true}, function (s, e) {
        if (e === undefined) {
            chrome.storage.sync.set({'xEngineCode': code});
        }
    });
}

function clearDataTab() {
    while (tableContent.hasChildNodes())
        tableContent.removeChild(tableContent.lastChild);
    while (staticFieldsHolder.hasChildNodes())
        staticFieldsHolder.removeChild(staticFieldsHolder.lastChild);
    while (codeTypesSelection.hasChildNodes())
        codeTypesSelection.removeChild(codeTypesSelection.lastChild);
}