var XObject = function (element) {
    this.element = element;
    this.best = undefined;
};

/**
 * The cycle of the handling process of the query creating.
 * @param route {XRoute}
 * @param cursor {XObject}
 */
XObject.cycle = function (route, cursor) {
    try {
        route.add(cursor);
        var set = XSettings.getSetByTag(cursor.getTag()).copy();

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

/*
 * Start a first cycle of the handling process.
 * This.element will be target of the query.
 */
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
        return all;
    }
    console.log("Can't found a XPath query", route.compile());
    return undefined;
};

/**
 * Apply strategy to current state of the route by this XObject.
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
 * Is possible to create the query?
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

/**
 * Get a tag of the element.
 */
XObject.prototype.getTag = function () {
    if (this.element instanceof Text)
        return "text()";
    return this.element.tagName;
};

XObject.prototype.toString = function () {
    var expression = this.expression;
    if (!expression.isEmpty()) {
        return (expression.taggedAsAnyElement() ? '*' : this.getTag()) + expression.toString();
    } else return this.getTag();
};
