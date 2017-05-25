/**
 * Created by cyber-PC on 29.04.2017.
 */
getBestStrategy = function (xobject, strategies, route) {
    strategies = ifCountNotUndefined(strategies);
    var validated = [];
    for (var i = 0; i < strategies.length; i++) {
        xobject.applyStrategy(strategies[i], route);
        if (route.containsTarget())
            validated.push(strategies[i]);
    }
    return validated;
};

/**
 * Сортирует только те стратегии, которые могут быть применены.
 * @param strategies
 * @returns {Array}
 */
function ifCountNotUndefined(strategies) {
    var result = [];
    for (var i = 0; i < strategies.length; i++)
        if (strategies[i].count !== undefined) {
            result.push(strategies[i]);
        }
    return result;
}
