/**
 * Created by cyber-PC on 16.04.2017.
 */
var XSettings = {};

XSettings.strategiesSet = undefined;
XSettings.postProcessing = undefined;

XSettings.setup = function (code) {
    try {
        var settings = eval(code);
        console.log("Input settings: ", settings);
        XSettings.strategiesSet = [];
        XSettings.postProcessing = undefined;
        if (settings !== undefined && settings.post !== undefined)
            XSettings.postProcessing = settings.post;
        for (key in settings) {
            if (key !== 'post')
                XSettings.strategiesSet.push({set: new XSet(XSettings.getSetFromObject(settings[key])), tag: key});
        }
        console.log("Output settings: ", XSettings.strategiesSet, XSettings.postProcessing);
        if (XSettings.getCommonSet() === undefined) {
            XSettings.strategiesSet = XSettings.postProcessing = undefined;
            throw "The common tag not assigned.";
        }
    } catch (exception) {
        alert("XEngine Settings: " + exception);
        return false;
    }
    return true;
};

XSettings.getSetByTag = function (tag) {
    for (var i = 0; i < XSettings.strategiesSet.length; i++)
        if (XSettings.strategiesSet[i].tag.toLowerCase() === tag.toLowerCase()) {
            return XSettings.strategiesSet[i].set;
        }
    return XSettings.getCommonSet();
};

XSettings.getCommonSet = function () {
    for (var i = 0; i < XSettings.strategiesSet.length; i++)
        if (XSettings.strategiesSet[i].tag === 'common')
            return XSettings.strategiesSet[i].set;
    return undefined;
};

XSettings.getSetFromObject = function (set) {
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
        XSettings.setup(items.xEngineCode);
    }
});
