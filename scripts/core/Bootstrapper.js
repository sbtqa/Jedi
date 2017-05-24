/**
 * Created by cyber-PC on 12.05.2017.
 */

chrome.storage.sync.get("xEngineCode", function (items) {
    if (items.xEngineCode === undefined) {
        var code = "//$ The Code Convention:\n"
            + "//$ nameApp - name of an approach.\n"
            + "//$ nameStrategy - name of a strategy.\n"
            + "//$ At the end of the declaration return \n"
            + "//$ an array of strategies. Exmpl: [s1, s2, s3]\n"
            + "\n"
            + "var idApp = new XApproach('id'),\n"
            + "hrefApp = new XApproach('href'),\n"
            + "localNameApp = new XApproach('localName'),\n"
            + "classApp = new XApproach('class'),\n"
            + "titleApp = new XApproach('title'),\n"
            + "valueApp = new XApproach('value'),\n"
            + "indexatorApp = new XApproach('indexator'),\n"
            + "placeholderApp = new XApproach('placeholder'),\n"
            + "innerTextApp = new XApproach('innerText');\n"
            + "var ancestorApp = new XApproach('ancestor', {approaches: [idApp, valueApp]});\n"
            + "\n"
            + "[[idApp, valueApp, titleApp],\n"
            + "idApp,\n"
            + "hrefApp,\n"
            + "classApp,\n"
            + "innerTextApp,\n"
            + "ancestorApp,\n"
            + "titleApp,\n"
            + "placeholderApp,\n"
            + "indexatorApp,\n"
            + "[localNameApp, idApp, titleApp, valueApp]];\n";
        chrome.storage.sync.set({'xEngineCode': code});
    }
});