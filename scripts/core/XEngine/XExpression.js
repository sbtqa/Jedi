/**
 * Created by cyber-PC on 14.04.2017.
 */
var XExpression = function () {
    this.params = [];
};

/**
 Если выражение не имеет параметров, то true, иначе false.
 @return {boolean}
 */
XExpression.prototype.isEmpty = function () {
    return this.params.length === 0;
};

/**
 Добавить параметр (параметры) в выражение используя подход.
 @param {Element} element Элемент к которому примеяется подход.
 @param {XApproach} approach Подход использующийся для добавления параметра.
 */
XExpression.prototype.addParamByApproach = function (element, approach) {
    if (approach.isIgnored())
        return;
    try {
        if (element instanceof Text) {
            if (XApproaches.text[approach.name] !== undefined)
                this.add(XApproaches.text[approach.name](element, approach), approach, approach.name);
        }
        else if (element instanceof HTMLElement) {
            if (XApproaches[approach.name] !== undefined) // Сначала пробуем найти подход, как не атрибут.
                this.add(XApproaches[approach.name](element, approach), approach, approach.name);
            else if (element.hasAttribute(approach.name) && element.getAttribute(approach.name).trim().length !== 0) {
                // Если НЕ находим среди @NonAttribute, то пробуем понять если такой аттрибут с именнем подхода.
                // Если есть такой аттрибут, то смотрим есть ли специальная для него обработка, иначе обрабатываем, как простой аттрибут.
                if (XApproaches['attribute_' + approach.name] !== undefined)
                    this.add(XApproaches['attribute_' + approach.name](element, approach), approach, 'attribute_' + approach.name);
                else this.add(XApproaches.attribute(element, approach), approach, 'default attribute - ' + approach.name);
            }
        } else {
            if (XApproaches.any[approach.name] !== undefined)
                this.add(XApproaches.any[approach.name](element, approach), approach, approach.name);
		}
    } catch (e) {
        console.log('Skip approach: ', approach, element, 'because', e);
        this.add(null, approach);
    }
};

XExpression.prototype.tagAsAnyElement = function () {
    var length = this.params.length;
    for (var i = 0; i < length; i++)
        if (this.params[i].type.value === XParam.TYPES.ANY_ELEMENT.value)
            return true;
    return false;
};

XExpression.prototype.clear = function () {
    // Самый быстрый вариант, бенчмарк http://jsben.ch/#/hyj65
    this.params = [];
};

XExpression.prototype.add = function (params, approach, debug) {
    if (params !== null && params !== undefined && params.length !== 0) {
        approach.map = [];
        for (var i = 0; i < params.length; i++) {
            if (params[i] !== null && params[i] !== undefined) {
                this.params.push(params[i]);
                approach.map.push(true);
            } else approach.map.push(null);
        }
    } else approach.map = null;
};

XExpression.prototype.toString = function () {
    var string = "";
    var paramToAdd = [];
    var length = this.params.length;
    var i = 0;
    for (; i < length; i++)
        if (this.params[i].type.value !== XParam.TYPES.ANY_ELEMENT.value)
            paramToAdd.push(this.params[i]);
    length = paramToAdd.length - 1;
    for (i = 0; i <= length; i++) {
        string += paramToAdd[i].toString();
        if (length !== i)
            string += ' and ';
    }
    if (string.length !== 0)
        return "[" + string + "]";
    else return string;
};

XExpression.NONE = new XExpression(undefined);
