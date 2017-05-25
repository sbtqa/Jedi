/**
 * Вызывает обработчик собщений от popup'а. Обработчик - это функция определенная именем "handle_{@link message.function}".
 * @param {Object} message
 * @param {String} message.function
 * @param {Object} message.args
 */
chrome.runtime.onMessage.addListener(function (message) {
    var handler = window['handle_' + message.function];
   // console.log("Try to get: " + 'handle_' + message.function + ": ", handler);
    if (handler !== null && handler !== undefined)
        handler(message.args);
});

function handle_log(args) {
    console.log(args.message);
}

/**
 *
 * @param {Object} args
 * @param {Number} args.id
 * @param {String} args.text
 */
function handle_staticItemChanged(args) {
    Events.onStaticItemChanged.invoke(args);
}

function handle_onLoadPopup() {
    Events.onPopupLoaded.invoke();
}

/**
 * @param {Object} args
 * @param {Boolean} args.value
 */
function handle_highlightToggle(args) {
    if (Events.interceptedElement !== undefined && Events.interceptedElement !== null)
        Events.interceptedElement.classList.remove('intercepted_element');
    Properties.highlightState = args.value;
}

/**
 * @param {Object} args
 * @param {String} args.type
 */
function handle_propertiesLoader(args) {
    switch (args.type) {
        case 'from_disk':
            Events.onRequestToLoadPropertiesFromDiskReceived.invoke();
            break;
        case 'from_cookie':
            Events.onRequestToLoadPropertiesFromCookieReceived.invoke();
            break;
    }
}


