/**
 * Created by cyber-PC on 23.04.2017.
 */

var Events = {};
Events.OnContentLoaded = new Action();
Events.OnUpdateXEngine = new Action();
Events.OnEditorLoaded = new Action();
Events.OnDataLoaded = new Action();

// При загрузки страницы.
Events.OnContentLoaded.subscribe(function () {
    log("Jedi QA DevTools has loaded");
});

// Когда пользователь нажимает кнопку "Обновить".
Events.OnUpdateXEngine.subscribe(function (code) {
    setupXEngine(code);
    chrome.devtools.inspectedWindow.eval("getPropertiesAndData()", {useContentScriptContext: true}, function (s, e) {
        if (e === undefined) {
            Events.OnDataLoaded.invoke(s);
        }
    });
});

/**
 * Когда создан Редактор настроек XEngine.
 */
Events.OnEditorLoaded.subscribe(function (editor) {
    chrome.storage.sync.get("xEngineCode", function (items) {
        if (items.xEngineCode !== undefined) {
            setupXEngine(items.xEngineCode);
            editor.setValue(items.xEngineCode);
        }
    });
});

/**
 * @param args.properties {Properties}
 * @param args.statics
 * @param args.table
 * @param args.patterns
 */
Events.OnDataLoaded.subscribe(function (args) {
    log(args);
    if (!args.properties.loaded) {
        $('#data-load-attention').show();
        $(dataHolder).hide();
        return;
    }
    $('#data-load-attention').hide();
    $(dataHolder).show();
    clearDataTab();
    for (var i = 0; i < args.properties.staticFields.length; i++)
        statics.addStaticField(staticFieldsHolder, args.properties.staticFields[i], args.statics[i]);
    htmlTable.setHeader(args.properties);
    for (var i = 0; i < args.table.length; i++)
        htmlTable.addRow(args.properties, args.table[i]);
    try {
        addOptionToCodeTypes(args.patterns);
    } catch (e) {
        log(e.message);
    }

});