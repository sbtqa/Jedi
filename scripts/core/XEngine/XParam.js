/**
 * Created by cyber-PC on 14.04.2017.
 */
var XParam = function (type, args) {
    this.type = type;
    this.args = args;
};

XParam.prototype.toString = function () {
   return this.type.value.format(this.args);
};

XParam.equals = function (left, right) {
    return new XParam(XParam.TYPES.EQUALS, [left, right]);
};

XParam.indexator = function (value) {
    return new XParam(XParam.TYPES.INDEXATOR, [value]);
};

XParam.contains = function (haystack, needle) {
    return new XParam(XParam.TYPES.CONTAINS, [haystack, needle]);
};

XParam.anyElement = function () {
    return new XParam(XParam.TYPES.ANY_ELEMENT)
};

XParam.empty = function () {
    return new XParam(XParam.TYPES.EMPTY)
};

XParam.TYPES = {
    ANY_ELEMENT: {number: 0, value: "$ANY_ELEMENT$"},
    EMPTY: {number: 0, value: ""},
    INDEXATOR: {number: 1, value: "{0}"},
    CONTAINS: { number: 2, value: "contains({0}, {1})" },
    EQUALS: { number: 2, value: "{0} = {1}" }
};