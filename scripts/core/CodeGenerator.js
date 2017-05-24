/**
 * Created by cyber-PC on 27.04.2017.
 */
var CodeGenerator = {};
CodeGenerator.patterns = [];

var EVAL_KEYWORD = "$eval";

/**
 * Получает индекс скобки закрывания.
 */
CodeGenerator.getBounds = function (text, start, startBkt, endBkt) {
    var foundFirstBkt = false;
    var extra = 0;
    for (var i = start; i < text.length; i++) {
        if (!foundFirstBkt && text[i] === startBkt) {
            foundFirstBkt = true;
            extra++;
        } else if (foundFirstBkt) {
            if (text[i] === startBkt)
                extra++;
            else if (text[i] === endBkt)
                extra--;
            if (extra === 0)
                return i + 1;
        }
    }
    return undefined;
};

CodeGenerator.generate = function (byName) {
    var pattern = undefined;
    for (var i = 0; i < CodeGenerator.patterns.length; i++)
        if (CodeGenerator.patterns[i].declaration.name === byName) {
            pattern = CodeGenerator.patterns[i];
            break;
        }
    if (pattern === undefined)
        return "Шаблон не найден!";
    var text = pattern.text;
    var index = 0;
    while ((index = text.indexOf('#startsection')) !== -1) {
        var endIndex = text.indexOf('#endsection');
        var sectionText = CodeGenerator.calcSection(text.slice(index + '#startsection'.length, endIndex));
        text = text.slice(0, index) + sectionText + text.slice(endIndex + '#endsection'.length, text.length);
    }
    var static = Data.statics;
    while ((index = text.indexOf('$eval(')) !== -1) {
        var endIndex = CodeGenerator.getBounds(text, index, "(", ")");
        var str = eval(text.slice(index + 6, endIndex - 1).replace(/\?\n|\r/g, ''));
        text = text.slice(0, index) + str + text.slice(endIndex, text.length);
    }
    return text;
};

CodeGenerator.calcSection = function (text) {
    var result = "";
    var copy = "" + text;
    var static = Data.statics;
    for (var i = 0; i < Data.table.length; i++) {
        text = "" + copy;
        var row = Data.table[i];
        var index = 0;
        while ((index = text.indexOf('$eval(')) !== -1) {
            var endIndex = CodeGenerator.getBounds(text, index, "(", ")");
            var str = eval(text.slice(index + 6, endIndex - 1).replace(/\?\n|\r/g, ''));
            text = text.slice(0, index) + str + text.slice(endIndex, text.length);
        }
        result += text.slice(0, text.length - 2);
    }
    return result.slice(1, result.length);
};
