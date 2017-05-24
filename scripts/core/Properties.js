/**
 * Created by cyber-PC on 25.04.2017.
 */
var Properties = {};

/**
 * Подсвечивать элемент на странице или нет.
 * @type {boolean}
 */
Properties.highlightState = false;
/**
 * Загружен ли шаблон.
 * @type {boolean}
 */
Properties.loaded = false;
/**
 * Статические поля полученные из шаблона.
 * @type {Array}
 */
Properties.staticFields = undefined;
/**
 * Колонки таблицы полученные из шаблона.
 * @type {Array}
 */
Properties.tableColumns = undefined;

Properties.parse = function (text) {
    var copy = "" + text;
    var jsonEnd = CodeGenerator.getBounds(text, 0, '{', '}');
    Properties.applyJson(text.slice(0, jsonEnd));
    text = text.slice(jsonEnd, text.length);
    var index = 0;
    var globalNumberOfSection = 0;
    while (index !== -1) {
        index = text.indexOf('$code');
        if (index !== -1) {
            globalNumberOfSection++;
            var endIndex = CodeGenerator.getBounds(text, index, '{', '}');
            if (endIndex === undefined)
                throw "Не хватает скобок в блоке " + type + ". Глобальный номер: " + globalNumberOfSection;
            Properties.parseAsCodeSection(text.slice(index + 5, endIndex));
            text = text.slice(endIndex, text.length);
        }
    }
    chrome.storage.sync.set({'properties': copy});
    Properties.loaded = true;
    Properties.sendToPopup();
    console.log(CodeGenerator.patterns);
};

Properties.parseAsCodeSection = function (text) {
    var pattern = {};
    var index = text.indexOf('$declaration');
    if (index === -1)
        throw "$declaration не найден";
    var endIndex = CodeGenerator.getBounds(text, index, '{', '}');
    var declaration = text.slice(index + 12, endIndex);
    pattern.declaration = eval("var object = " + declaration + "; object;");
    index = text.indexOf('$pattern');
    if (index === -1)
        throw "$pattern не найден";
    endIndex = CodeGenerator.getBounds(text, index, '{', '}');
    pattern.text = text.slice(index, endIndex);
    pattern.text = pattern.text.slice(pattern.text.indexOf('{') + 1, pattern.text.lastIndexOf('}'));
    CodeGenerator.patterns.push(pattern);
};

Properties.applyJson = function (text) {
    var json = JSON.parse(text);
    var resultValid = validVariablesDefinitionJson(json);
    if (resultValid) {
        Properties.staticFields = json.static_fields;
        Properties.tableColumns = [];
        for (var i = 0; i < json.table_columns.length; i++)
            Properties.tableColumns.push(Properties.parseColumn(json.table_columns[i]));
        Data.statics = [];
        for (var i = 0; i < Properties.staticFields.length; i++) {
            Data.statics[Properties.staticFields[i]] = '';
        }
    } else alert(resultValid);
};

Properties.parseColumn = function (text) {
    var result = {};
    result.isSelect = text.includes(':select:');
    result.isTargetable = text.includes(':target:');
    if (result.isSelect) {
        result.name = text.split(':select:')[0];
        result.options = eval(text.split(':select:')[1]);
    } else if (result.isTargetable) {
        result.name = text.split(':target:')[0];
	}
	else {
        result.name = text;
    }
    return result;
};

Properties.isSelectMode = function () {
    return Properties.highlightState && Properties.loaded;
};

Properties.sendToPopup = function () {
    var statics = [];
    if (Properties.loaded) {
        for (var i = 0; i < Properties.staticFields.length; i++)
            statics.push(Data.statics[Properties.staticFields[i]]);
    }
    sendMessageToPopup({
        function: 'actualizeProperties',
        args: {properties: Properties, statics: statics}
    });
};