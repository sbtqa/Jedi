var getXPath = function (element) {
    if (XSettings.strategiesSet !== undefined) {
        var domObject = new XObject(element);
        return {tagName: element.tagName, paths: domObject.generate()};
    } else return undefined;
};

var getPropertiesAndData = function () {
    var statics = [];
    for (var i = 0; i < Properties.staticFields.length; i++)
        statics.push(Data.statics[Properties.staticFields[i]]);
    return {properties: Properties, statics: statics, table: Data.table, patterns: CodeGenerator.patterns};
};

var getProperties = function () {
    return Properties;
};

var getInnerText = function (element) {
    if (element.innerText !== undefined && element.innerText.trim() !== '')
        return element.innerText.trim();
    else if (element.value !== undefined && element.value.trim() !== '')
        return element.value.trim();
};

function generateCode(byName) {
    try {
        return CodeGenerator.generate(byName);
    } catch (e) {
        alert(e);
    }
}

var setupXEngine = function (code) {
    XSettings.setup(code);
};

function sendMessageToPopup(message) {
    chrome.runtime.sendMessage(message);
    console.log(message);
}

function openFileBrowser(callback) {
    var inputElement = document.createElement("input");
    inputElement.type = "file";
    inputElement.multiple = false;
    inputElement.accept = '.pattern';
    inputElement.addEventListener("change", callback);
    inputElement.dispatchEvent(new MouseEvent("click"));
}

function validVariablesDefinitionJson(json) {
    if (!json.static_fields) {
        alert("static_fields not assigned.");
        return false;
    } else if (!json.table_columns) {
        alert("table_columns not assigned.");
        return false;
    }
    return true;
}