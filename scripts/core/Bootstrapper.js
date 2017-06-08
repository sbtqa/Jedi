/**
 * Created by cyber-PC on 12.05.2017.
 */

chrome.storage.sync.get("xEngineCode", function (items) {
    if (items.xEngineCode === undefined) {
        var code = "var idApp = new XApproach('id'),\n"
            + "    hrefApp = new XApproach('href'),\n"
            + "    localNameApp = new XApproach('localName'),\n"
            + "    classApp = new XApproach('class'),\n"
            + "    titleApp = new XApproach('title'),\n"
            + "    valueApp = new XApproach('value'),\n"
            + "    indexatorApp = new XApproach('indexator'),\n"
            + "    placeholderApp = new XApproach('placeholder'),\n"
            + "    innerHTMLApp = new XApproach('innerHTML'),\n"
            + "    innerHTMLApp_equals = new XApproach('innerHTML', {strategy: 'equals'}),\n"
            + "    innerTextApp = new XApproach('innerText');\n\n"
            + "var approaches = [idApp, valueApp, innerTextApp];\n"
            + "var ancestorApp = new XApproach('ancestor', {approaches: approaches});\n"
            + "var followingSiblingApp = new XApproach('followingSibling', {approaches: approaches});\n"
            + "var childApp = new XApproach('child', {approaches: approaches});\n\n"
            + "var common = [[idApp, valueApp, titleApp],\n"
            + "    idApp,\n"
            + "    followingSiblingApp,\n"
            + "    childApp,\n"
            + "    hrefApp,\n"
            + "    classApp,\n"
            + "    innerTextApp,\n"
            + "    innerHTMLApp,\n"
            + "    innerHTMLApp_equals,\n"
            + "    ancestorApp,\n"
            + "    titleApp,\n"
            + "    placeholderApp,\n"
            + "    indexatorApp,\n"
            + "    [localNameApp, idApp, titleApp, valueApp]];\n"
            + "\nvar setting = {\n"
            + "    common: common,\n"
            + "    post: {}\n"
            + "};\n"
            + "setting;\n";
        chrome.storage.sync.set({'xEngineCode': code});
    }
});
