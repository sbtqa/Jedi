/**
 * Created by cyber-PC on 16.04.2017.
 */
var XSet = function (strategies) {
    if (strategies === undefined)
        this.strategies = [];
    else this.strategies = strategies;
};

XSet.prototype.addStrategy = function (approaches, count, mode) {
    this.strategies.push(new XStrategy(mode, approaches));
};

XSet.prototype.get = function (index) {
    return this.strategies[index];
};

XSet.prototype.length = function () {
    return this.strategies.length;
};

XSet.prototype.copy = function () {
    var c = new XSet();
    var length = this.strategies.length;
    for (var i = 0; i < length; i++)
        c.strategies.push(this.strategies[i].copy());
    return c;
};

