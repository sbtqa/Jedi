var XExpression = function () {
    this.params = [];
};

/**
 If the expression have parameters then FALSE or otherwise TRUE.
 @return {boolean}
 */
XExpression.prototype.isEmpty = function () {
    return this.params.length === 0;
};

/**
 Add a parameter (parameters) by some approach.
 @param {Element} element
 @param {XApproach} approach
 */
XExpression.prototype.addParamByApproach = function (element, approach) {
    if (approach.isIgnored())
        return;
    try {
        if (element instanceof Text) { // Handle like a text element.
            if (XApproaches.text[approach.name] !== undefined)
                this.add(XApproaches.text[approach.name](element, approach), approach, approach.name);
        }
        else if (element instanceof HTMLElement) {  // Handle like a html element.
            if (XApproaches[approach.name] !== undefined) // First, try to find out an implementation of the approach like non-attribute.
                this.add(XApproaches[approach.name](element, approach), approach, approach.name);
            else if (element.hasAttribute(approach.name) && element.getAttribute(approach.name).trim().length !== 0) {
                if (XApproaches['attribute_' + approach.name] !== undefined) // Have a special implementation for this attribute?
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


/**
 Do it have an ANY_ELEMENT?
 */
XExpression.prototype.taggedAsAnyElement = function () {
    var length = this.params.length;
    for (var i = 0; i < length; i++)
        if (this.params[i].type.value === XParam.TYPES.ANY_ELEMENT.value)
            return true;
    return false;
};

XExpression.prototype.clear = function () {
    // http://jsben.ch/#/hyj65
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
