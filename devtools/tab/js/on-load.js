/**
 * Created by cyber-PC on 17.04.2017.
 */
//#region vertical navigation bar
var tableBarItem;
var xEngineBarItem;
var codeGeneratorBarItem;
var aboutBarItem;
var prevBarItem;
var dataHolder;
var tableHolder;

var updateButtonBarItem;

var staticFieldsHolder;
var tableContent;

var codeTypesSelection;
var codeTextarea;

var editorXEngine; // CodeMirror


document.addEventListener('DOMContentLoaded', function () {
    prevBarItem = tableBarItem = document.getElementById('data-bar-item');
    xEngineBarItem = document.getElementById('x-engine-bar-item');
    codeGeneratorBarItem = document.getElementById('code-generator-bar-item');
    aboutBarItem = document.getElementById('about-bar-item');
    updateButtonBarItem = document.getElementById('update-button');
    dataHolder = document.getElementById('data-holder');
    tableHolder = document.getElementById('table-holder');
    codeTextarea = document.getElementById('code-generator-textarea');
    codeTypesSelection = document.getElementById('code-types');
    document.getElementById('generate-button').addEventListener('click', function () {
        chrome.devtools.inspectedWindow.eval("generateCode(\"" + codeTypesSelection.value + "\")", {useContentScriptContext: true}, function (s, e) {
            if (e === undefined) {
                codeTextarea.innerText = s;
            } else log(s.message);
        });
    });

    tableBarItem.addEventListener('click', onClickBarItem);
    xEngineBarItem.addEventListener('click', onClickBarItem);
    codeGeneratorBarItem.addEventListener('click', onClickBarItem);
    aboutBarItem.addEventListener('click', onClickBarItem);
    updateButtonBarItem.addEventListener('click', onClickUpdateButton);
    Events.OnContentLoaded.invoke();
});

function onClickUpdateButton() {
    Events.OnUpdateXEngine.invoke(editorXEngine.getValue());
}

function onClickBarItem(event) {
    if (prevBarItem.id.includes('x-engine'))
        document.getElementById(prevBarItem.id.replace('-bar-item', '') + '-content').style.visibility = 'hidden';
    else $('#' + prevBarItem.id.replace('-bar-item', '') + '-content').hide();

    if (event.srcElement.id.includes('x-engine')) {
        document.getElementById(event.srcElement.id.replace('-bar-item', '') + '-content').style.visibility = 'visible';
        document.body.style.backgroundColor = "#f7f7f7";
    }
    else {
        $('#' + event.srcElement.id.replace('-bar-item', '') + '-content').show();
        document.body.style.backgroundColor = "#ffffff";
    }

    prevBarItem.classList.remove('active-link');
    event.srcElement.classList.add('active-link');
    prevBarItem = event.srcElement;
}
//#endregion

//#region x-engine
document.addEventListener('DOMContentLoaded', function () {
    editorXEngine = CodeMirror(document.getElementById('x-engine-content'), {
        lineNumbers: true,
        value: "",
        mode: "javascript",
        theme: "default"
    });
    Events.OnEditorLoaded.invoke(editorXEngine);
});
//#endregion

//#region data
document.addEventListener('DOMContentLoaded', function () {
    staticFieldsHolder = document.getElementById('static-fields-holder');
    tableContent = document.getElementById('table-content');
});
//#endregion
