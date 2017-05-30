/**
 * Created by cyber-PC on 15.04.2017.
 */
var XFunction = function (type, args) {
    this.type = type;
    this.args = args;
};

XFunction.prototype.toString = function () {
    return this.type.value.format(this.args);
};

XFunction.inQuotes = function (value) {
    return new XFunction(XFunction.TYPES.IN_QUOTES, [value]);
};

XFunction.asAttribute = function (value) {
    return new XFunction(XFunction.TYPES.AS_ATTRIBUTE, [value]);
};

XFunction.followingSibling = function (value) {
    return new XFunction(XFunction.TYPES.FOLLOWING_SIBLING, [value]);
};

XFunction.text = function () {
    return new XFunction(XFunction.TYPES.TEXT);
};

XFunction.position = function () {
    return new XFunction(XFunction.TYPES.POSITION);
};

XFunction.ancestor = function (query) {
    return new XFunction(XFunction.TYPES.ANCESTOR, [query]);
};

XFunction.child = function (query) {
    return new XFunction(XFunction.TYPES.CHILD, [query]);
};

XFunction.localName = function () {
    return new XFunction(XFunction.TYPES.LOCAL_NAME);
};

XFunction.TYPES = {
    TEXT: {number: 0, value: "text()"},
    POSITION: {number: 0, value: "position()"},
    LOCAL_NAME: {number: 0, value: "local-name()"},
    AS_ATTRIBUTE: {number: 1, value: "@{0}"},
    IN_QUOTES: {number: 1, value: "'{0}'"},
    ANCESTOR: {number: 1, value: "ancestor::{0}"},
    CHILD: {number: 1, value: "child::{0}"},
    FOLLOWING_SIBLING: {number: 1, value: "following-sibling::{0}"}
};
