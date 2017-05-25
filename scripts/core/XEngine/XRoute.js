/**
 * Created by cyber-PC on 15.04.2017.
 */
var XRoute = function (target) {
    this.target = target;
    this.objects = [];
};

XRoute.prototype.compileAll = function () {
    var paths = [];
    var ls = [];
    var i = 0;
    for (i = 0; i < this.objects.length; i++)
        ls.push(this.objects[i].best.length);
    var variants = generateNumberRows(ls);
    var j = 0;
    for (i = 0; i < variants.length; i++) {
        var v = variants[i];
        for (j = 0; j < v.length; j++)
            this.objects[j].applyStrategy(this.objects[j].best[v[j] - 1], this);
        if (this.containsTarget() && this.count() === 1) {
            var q = this.compile();
            if (!paths.includes(q))
                paths.push(this.compile());
        }
    }
    return paths;
};

XRoute.prototype.compile = function () {
    var result = '';
    for (var i = this.objects.length - 1; i >= 0; i--)
        result += '/' + this.objects[i].toString();
    if (result !== '') {
        var lasTag = this.objects[this.objects.length - 1].getTag();
        if (lasTag !== undefined)
            return (lasTag.toUpperCase() === "HTML" ? '/' : '*/') + result;
    }
    return undefined;
};

XRoute.prototype.remove = function (xObject) {
    var index = this.objects.indexOf(xObject);
    if (index > -1)
        this.objects.splice(index, 1);
};

XRoute.prototype.count = function () {
    return getElementByXpath(this.compile()).length;
};

XRoute.prototype.containsTarget = function () {
    return getElementByXpath(this.compile()).includes(this.target);
};

XRoute.prototype.hasArrived = function () {
    var elements = getElementByXpath(this.compile());
    return elements.length === 1 && elements[0] === this.target;
};

XRoute.prototype.add = function (xObject) {
    this.objects.push(xObject);
};
