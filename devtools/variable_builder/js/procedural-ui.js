/**
 * Created by cyber-PC on 08.05.2017.
 */

var tableController = {};
var variablesController = {};

tableController.clear = function () {
    while (table.hasChildNodes())
        table.removeChild(table.lastChild);
};

tableController.add = function (string) {
    var row = document.createElement('div');
    row.innerText = string;
    row.onclick = function () {
        var previous = document.querySelector('[selected]');
        if (previous !== undefined && previous !== null)
            previous.removeAttribute('selected');
        this.setAttribute('selected', '');
    };
    table.appendChild(row);
};

tableController.set = function (array) {
    tableController.clear();
    if (array !== undefined)
        for (var i = 0; i < array.length; i++)
            tableController.add(array[i]);
    // Устанавливаем как выбранные первый xpath, иначе снова делаем видимым сообщение.
    if (table.childElementCount !== 0) {
        tMessage.style.display = 'none';
        table.childNodes[0].setAttribute('selected', '');
    } else tMessage.style.display = 'block';
};

variablesController.clear = function () {
    while (variables.hasChildNodes())
        variables.removeChild(variables.lastChild);
};

variablesController.set = function (properties) {
    variablesController.clear();
    if (properties !== undefined && properties.loaded) {
        for (var i = 0; i < properties.tableColumns.length; i++) {
            var column = properties.tableColumns[i];
            if (column.isSelect)
                variablesController.addSelector(column.name, column.options);
            else {
                var input = variablesController.addTextInput(column.name);
                if (column.isTargetable)
                    variablesController.addTargetButton(input);
            }
        }
    }
};

variablesController.addTargetButton = function (input) {
    var button = document.createElement('input');
    button.type = 'submit';
    button.value = ' ';
    button.setAttribute('name', input.getAttribute('column-id'));
    variables.appendChild(button);
    button.onclick = function () {
        var previous = document.querySelector('[targetable]');
        if (previous !== undefined && previous !== null)
            previous.removeAttribute('targetable');
        if (previous !== this)
            this.setAttribute('targetable', '');
    };
    return button;
};

variablesController.untargetable = function () {
    var btt = document.querySelector('[targetable]');
    if (btt !== undefined && btt !== null)
        btt.removeAttribute('targetable');
};

variablesController.addTextInput = function (name) {
    var input = document.createElement('input');
    input.type = 'text';
    input.placeholder = name;
    input.setAttribute('column-id', name);
    variables.appendChild(input);
    return input;
};

variablesController.addSelector = function (name, options) {
    var selector = document.createElement('select');
    selector.setAttribute('column-id', name);
    for (var i = 0; i < options.length; i++) {
        var option = document.createElement('option');
        option.innerText = options[i];
        selector.appendChild(option);
    }
    variables.appendChild(selector);
    return selector;
};
