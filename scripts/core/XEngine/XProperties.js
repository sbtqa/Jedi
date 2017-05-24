/**
 * Created by cyber-PC on 16.04.2017.
 */
var XProperties = {};

XProperties.strategiesSet = undefined;

XProperties.setup = function (code) {
    try {
        var set = eval(code);
        var sorted = [];
        for (var i = 0; i < set.length; i++) {
            if (set[i]instanceof XApproach)
                sorted.push(new XStrategy(set[i].name + '-single', [set[i]]));
            else if (Array.isArray(set[i]))
                sorted.push(new XStrategy('' + i + '-multiply', set[i]));
            else throw 'Unexpected the strategy for XEngine. Index: ' + i;
        }
        XProperties.strategiesSet = new XSet(sorted);
        console.log("setup", XProperties.strategiesSet);
    } catch (exception) {
        alert(exception);
        return false;
    }
    return true;
};

chrome.storage.sync.get("xEngineCode", function(items) {
    if (items.xEngineCode !== undefined) {
        XProperties.setup(items.xEngineCode);
    }
});