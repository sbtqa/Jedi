/**
 * Created by cyber-PC on 25.04.2017.
 */
var events = {};
events.onDiskBttPressed = new Action();
events.onCookieBttPressed = new Action();
events.toActualizeProperties = new Action();

/**
 *
 * @param {Object} args.data
 * @param {Object} args.data.statics
 * @param {Object} args.properties
 * @param {Boolean} args.properties.highlightState
 * @param {Boolean} args.properties.loaded
 * @param {Array} args.properties.staticFields
 */
events.toActualizeProperties.subscribe(function (args) {
    highlightToggle.checked = args.properties.highlightState;
    if (args.properties.loaded) {
        document.getElementById('button-holder').remove();
        for (var i = 0; i < args.properties.staticFields.length; i++)
            statics.addStaticField(args.properties.staticFields[i], args.statics[i]);
        propertiesHolder.classList.remove('variables');
        propertiesHolder.style = 'overflow: hidden;   transition: height 0.5s;    color: #FFF;    height: auto';
    }
});