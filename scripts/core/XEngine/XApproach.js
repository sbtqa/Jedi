/**
 * Created by cyber-PC on 19.04.2017.
 */
/**
 *
 * @param {String} name Имя подхода.
 * @param {Object} args
 * @constructor
 */
function XApproach(name, args) {
    this.name = name;
    this.map = undefined;
    this.args = args;
}

/**
 *
 * @returns {XApproach}
 */
XApproach.prototype.copy = function () {
    var c = new XApproach(this.name, this.args);
    if (this.map !== undefined)
        c.map = copy(this.map);
    return c;
};

/**
 * True если подход может быть пременен к элементу, False если не может.
 * @returns {boolean}
 */
XApproach.prototype.isValid = function () {
    if (this.map !== undefined && this.map !== null)
        for (var i = 0; i < this.map.length; i++)
            if (this.map[i] !== null)
                return true;
    return false;
};

XApproach.prototype.isIgnored = function () {
    return this.map === null;
};
