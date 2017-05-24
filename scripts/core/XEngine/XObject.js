/**
 * Created by cyber-PC on 14.04.2017.
 */
var XObject = function (element) {
    this.element = element;
    this.best = undefined;
};

XObject.prototype.generate = function () {
    var cursor = this, validated;
    var route = new XRoute(this.element);
    var all = [];
    while (validated = cursor.validate()) {
        if (XObject.cycle(route, cursor)) {
            all = route.compileAll();
            if (all.length !== 0)
                break;
            cursor = cursor.root;
        } else break;
    }
    if (all.length > 0) {
        //console.log("all", all);
        return all;
    }
    console.log("Не смог найти XPath", route.compile());
    return undefined;
};

/**
 * Цикл обработки элемента пути.
 * @param route {XRoute}
 * @param cursor {XObject}
 */
XObject.cycle = function (route, cursor) {
    try {
        route.add(cursor);
        var set = XProperties.strategiesSet.copy();
        for (var i = 0; i < set.length(); i++)
            cursor.applyStrategy(set.get(i), route);
        cursor.best = getBestStrategy(cursor, set.strategies, route);
        if (cursor.best !== undefined && cursor.best.length > 0) {
            cursor.applyStrategy(cursor.best[0], route);
            return true;
        }
    } catch (e) {
        console.log(e);
    }
    return false;
};

/**
 * Применяет стратегию к текущему состоянию пути, может ли она быть применена.
 * @param strategy {XStrategy}
 * @param route {XRoute}
 */
XObject.prototype.applyStrategy = function (strategy, route) {
    var validated;
    this.expression.clear();
    for (var i = 0; i < strategy.approaches.length; i++) {
        var approach = strategy.approaches[i];
        this.expression.addParamByApproach(this.element, approach);
        if (approach.isValid())
            validated = true;
    }
    var count = route.count();
    if (validated && count > 0) {
        strategy.count = count;
		return true;
	}
	return false;
};

/**
 * Имеет ли смысл продолжать создавать запрос далее?
 * @returns {boolean}
 */
XObject.prototype.validate = function () {
    if (this.element === null || this.element === undefined
        || this.element.parentNode === null || this.element.parentNode === undefined)
        return false;
    this.root = new XObject(this.element.parentNode);
    this.expression = new XExpression();
    return true;
};

XObject.prototype.getTag = function () {
    if (this.element instanceof Text)
        return "text()";
    return this.element.tagName;
};

XObject.prototype.toString = function () {
    var expression = this.expression;
    if (!expression.isEmpty()) {
        return (expression.tagAsAnyElement() ? '*' : this.getTag()) + expression.toString();
    } else return this.getTag();
};
