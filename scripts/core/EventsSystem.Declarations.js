var Events = {};
Events.interceptedElement = null;
Events.onInterceptedElement = new Action();
Events.onPopupLoaded = new Action();
Events.onRequestToLoadPropertiesFromDiskReceived = new Action();
Events.onRequestToLoadPropertiesFromCookieReceived = new Action();
Events.onTextFilePropertiesLoaded = new Action();
Events.onStaticItemChanged = new Action();
Events.on= new Action();

Events.onStaticItemChanged.subscribe(function (args) {
    Data.statics[Properties.staticFields[args.id]] = args.text;
});

Events.onPopupLoaded.subscribe(function () {
    Properties.sendToPopup();
});

Events.onRequestToLoadPropertiesFromDiskReceived.subscribe(function () {
    if (Properties.loaded)
        return;
    openFileBrowser(function (event) {
        if (event.target.files[0]) {
            var reader = new FileReader();
            reader.onload = function (event) { Events.onTextFilePropertiesLoaded.invoke(event.target.result); };
            reader.readAsText(event.target.files[0]);
        }
    });
});

Events.onRequestToLoadPropertiesFromCookieReceived.subscribe(function () {
    if (Properties.loaded)
        return;
    chrome.storage.sync.get('properties', function (storage) {
        if (storage.properties)
            Events.onTextFilePropertiesLoaded.invoke(storage.properties);
    });
});

Events.onTextFilePropertiesLoaded.subscribe(function (text) {
    try {
        Properties.parse(text);
    } catch (exception) {
        alert(exception);
    }
});