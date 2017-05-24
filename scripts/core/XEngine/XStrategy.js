/**
 * Created by cyber-PC on 19.04.2017.
 */
/**
 *
 * @param {Array} approaches Массив {@link XApproach}.
 * @param {String} name Имя стратегии.
 * @constructor
 */
function XStrategy(name, approaches) {
    this.approaches = approaches;
    this.count = undefined;
    this.name = name;
}

/**
 *
 * @returns {XStrategy}
 */
XStrategy.prototype.copy = function() {
    var approaches = [];
    var length = this.approaches.length;
    for (var i = 0; i < length; i++)
        approaches.push(this.approaches[i].copy());
    return new XStrategy(this.name, approaches);
};
