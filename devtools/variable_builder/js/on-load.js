/**
 * Created by cyber-PC on 07.05.2017.
 */
var back, next, cancel, apply;
var table, variables, tMessage, vMessage;
var lastResult;

chrome.devtools.panels.elements.onSelectionChanged.addListener(function () {
    var btt = document.querySelector('[targetable]');
    if (btt === null && cancel.style.display === 'none') {
        getXPaths(function (result, exception) {
            reset();
            lastResult = result;
            tableController.set(result.paths);
            getProperties(function (result2, exception) {
                variablesController.set(result2);
            });
        });
    } else { // Выбор тестка для поля на котором нажата кнопка цели.
        chrome.devtools.inspectedWindow.eval("getInnerText($0)", {useContentScriptContext: true}, function (result, exceptionInfo) {
            variablesController.untargetable();
            if (result !== undefined)
                document.querySelector('[column-id="' + btt.getAttribute('name') + '"]').value = result;
        });
    }
});

function initElements() {
    table = document.getElementById('xpath-table');
    tMessage = document.getElementById('table-message');
    vMessage = document.getElementById('variables-message');
    variables = document.getElementById('variables-block');
    back = document.getElementById('back-button');
    next = document.getElementById('next-button');
    cancel = document.getElementById('cancel-button');
    apply = document.getElementById('apply-button');
}

function initToolPanel() {
    apply.style.display = 'none';
    back.style.display = 'none';
    cancel.style.display = 'none';
    next.onclick = toSecondPage;
    back.onclick = toFirstPage;
    cancel.onclick = reset;
    apply.onclick = function () {
        getProperties(function (result, exception) {
            if (result !== undefined && result.loaded && table.childElementCount !== 0 && variables.childElementCount !== 0) {
                var selected = document.querySelector('[selected]');
                var data = {xpath: selected.innerText, tag: lastResult.tagName};
                for (var i = 0; i < variables.childElementCount; i++) {
                    var child = variables.childNodes[i];
                    if (child.hasAttribute('column-id'))
                        data[child.getAttribute('column-id')] = child.value;
                }
                addRow(JSON.stringify(data));
            }
            reset();
        });
    };
}

function reset() {
    cancel.style.display = 'none';
    toFirstPage();
    tableController.clear();
    tMessage.style.display = 'block';
}

function toSecondPage() {
    if (table.childElementCount !== 0) {
        variables.style.display = 'block';
        if (variables.childElementCount === 0) {
            vMessage.style.display = 'block';
        } else {
            cancel.style.display = 'block';
            apply.style.display = 'block';
        }
        back.style.display = 'block';
        next.style.display = 'none';
        table.style.display = 'none';
        tMessage.style.display = 'none';
    }
}

function toFirstPage() {
    variablesController.untargetable();
    apply.style.display = 'none';
    variables.style.display = 'none';
    vMessage.style.display = 'none';
    back.style.display = 'none';
    next.style.display = 'block';
    table.style.display = 'block';
    if (table.childElementCount === 0)
        tMessage.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', function () {
    initElements();
    initToolPanel();
});
