/**
 * Created by cyber-PC on 24.04.2017.
 */

var statics = {};
statics.count = 0;
var htmlTable = {};
htmlTable.rowCount = 0;

statics.addStaticField = function (staticFieldsHolder, nameField, value) {
    var field = document.createElement("input");
    field.classList.add("static-field");
    field.placeholder = nameField;
    field.type = 'text';
    field.value = value;
    if (staticFieldsHolder.childElementCount !== 0)
        field.style = 'margin-top: 10px';
    staticFieldsHolder.appendChild(field);
};

htmlTable.setHeader = function (properties) {
    var row = document.createElement("div");
    var headers = [];
    headers.push({name: 'xpath'});
    for (var i = 0; i < properties.tableColumns.length; i++)
        headers.push(properties.tableColumns[i]);
    row.id = 'header';
    row.style.cssText = 'width: 100px';
    row.style.cssText = 'min-width: ' + (200 * headers.length) + 'px';
    for (var i = 0; i < headers.length; i++) {
        var headerCell = document.createElement("input");
        headerCell.readOnly = true;
        headerCell.classList.add("table-field-header");
        headerCell.style.cssText = 'width: ' + (100 / headers.length) + '%';
        headerCell.value = headers[i].name;
        headerCell.type = 'text';
        row.appendChild(headerCell);
    }
    tableContent.appendChild(row);
};

htmlTable.addRow = function (properties, rowData) {
    var row = document.createElement("div");
    row.id = 'row_' + (htmlTable.rowCount++);
    row.style.cssText = 'width: 100px';
    row.style.cssText = 'min-width: ' + (200 * (properties.tableColumns.length + 1)) + 'px';
    var width = 100 / (properties.tableColumns.length + 1);
    row.appendChild(createCell(width, rowData['xpath'], 'xpath'));
    for (var i = 0; i < properties.tableColumns.length; i++) {
        row.appendChild(createCell(width, rowData[properties.tableColumns[i].name], properties.tableColumns[i].name));
    }
    tableContent.appendChild(row);
};

function addOptionToCodeTypes(patterns) {
    for (var i = 0; i < patterns.length; i++) {
        var p = patterns[i];
        var option = document.createElement("option");
        option.innerText = p.declaration.name;
        codeTypesSelection.appendChild(option);
    }
}

function createCell(width, value, placeholder) {
    var cell = document.createElement("input");
    cell.placeholder = placeholder;
    cell.classList.add("table-field");
    cell.style.cssText = 'width: ' + width + '%';
    cell.value = value;
    cell.type = 'text';
    return cell;
}