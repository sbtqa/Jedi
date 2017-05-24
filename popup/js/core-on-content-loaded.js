var highlightToggle;
var submitDisk;
var submitCookie;
var propertiesHolder;
var staticFieldsHolder;

document.addEventListener("DOMContentLoaded", function () {
    highlightToggle = document.getElementById('highlight-toggle');
    propertiesHolder = document.getElementById('properties-holder');
    submitDisk = document.getElementById('submit-disk');
    submitCookie = document.getElementById('submit-cookie');
    staticFieldsHolder = document.getElementById('static-fields-holder');

    highlightToggle.addEventListener('click', function () { sendMessageToContent({ function: 'highlightToggle', args: {value: highlightToggle.checked} }); });
    submitDisk.addEventListener('click', function () { sendMessageToContent({ function: 'propertiesLoader', args: {type: 'from_disk'} }); });
    submitCookie.addEventListener('click', function () { sendMessageToContent({ function: 'propertiesLoader', args: {type:  'from_cookie'} }); });
    document.getElementById('bottom-label').innerText += " " + chrome.runtime.getManifest().version + "v";
    sendMessageToContent({ function: 'onLoadPopup' });
});

/**
 * Вызывает обработчик собщений от контента. Обработчик - это функция определенная именем "handle_{@link message.function}".
 * @param {Object} message
 * @param {String} message.function
 * @param {Object} message.args
 */
chrome.runtime.onMessage.addListener(function (message) {
    var handler = window['handle_' + message.function];
    console.log("Try to get: " + 'handle_' + message.function + ": ", handler);
    if (handler !== null && handler !== undefined)
        handler(message.args);
});

/**
 * @param {Object} args
 * @param {Object} args.properties
 * @param {Object} args.data
 */
function handle_actualizeProperties(args) {
    events.toActualizeProperties.invoke(args);
}
