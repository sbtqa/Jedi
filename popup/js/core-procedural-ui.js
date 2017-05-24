/**
 * Created by cyber-PC on 25.04.2017.
 */
var statics = {};
statics.count = 0;

statics.addStaticField = function (nameField, data) {
    var field = document.createElement("input");
    field.classList.add("textbox");
    field.placeholder = nameField;
    if (data !== undefined )
        field.value = data;
    field.type = 'text';
    if (staticFieldsHolder.childElementCount !== 0)
        field.style = 'margin-top: 10px';
    field.addEventListener('keyup', function () {
        sendMessageToContent({
            function: 'staticItemChanged',
            args:  { id: Array.prototype.indexOf.call(staticFieldsHolder.children, this), text: this.value }
        });
    });
    staticFieldsHolder.appendChild(field);
};