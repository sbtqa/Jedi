/**
 * Created by cyber-PC on 16.04.2017.
 */
var XProperties = {};

XProperties.strategiesSet = undefined;
XProperties.postProcessing = undefined;

XProperties.setup = function (code) {
    try {
        var settings = eval(code);
        console.log("Input settings: ", settings);
        XProperties.strategiesSet = [];
        XProperties.postProcessing = undefined;
        if (settings !== undefined && settings.post !== undefined)
            XProperties.postProcessing = settings.post;
        for (key in settings) {
            if (key !== 'post')
                XProperties.strategiesSet.push({set: new XSet(XProperties.getSetFromObject(settings[key])), tag: key});
        }
        console.log("Output settings: ", XProperties.strategiesSet, XProperties.postProcessing);
        if (XProperties.getCommonSet() === undefined) {
            XProperties.strategiesSet = XProperties.postProcessing = undefined;
            throw "The common tag not assigned.";
        }
    } catch (exception) {
        alert("XEngine Settings: " + exception);
        return false;
    }
    return true;
};

XProperties.getSetByTag = function (tag) {
    for (var i = 0; i < XProperties.strategiesSet.length; i++)
        if (XProperties.strategiesSet[i].tag === tag) {
            return XProperties.strategiesSet[i].set;
        }
    return XProperties.getCommonSet();
};

XProperties.getCommonSet = function () {
    for (var i = 0; i < XProperties.strategiesSet.length; i++)
        if (XProperties.strategiesSet[i].tag === 'common')
            return XProperties.strategiesSet[i].set;
    return undefined;
};

XProperties.getSetFromObject = function (set) {
    var sorted = [];
    for (var i = 0; i < set.length; i++) {
        if (set[i] instanceof XApproach)
            sorted.push(new XStrategy(set[i].name + '-single', [set[i]]));
        else if (Array.isArray(set[i]))
            sorted.push(new XStrategy('' + i + '-multiply', set[i]));
        else throw 'Unexpected the strategy for XEngine. Index: ' + i;
    }
    return sorted;
};

chrome.storage.sync.get("xEngineCode", function (items) {
    if (items.xEngineCode !== undefined) {
        XProperties.setup(items.xEngineCode);
    }
});
