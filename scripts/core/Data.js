/**
 * Created by cyber-PC on 26.04.2017.
 */
var Data = {};

/**
 * Все статичные поля.
 * @type {Array}
 */
Data.statics = {};
Data.table = [];

function addRow(row) {
    if (row !== undefined) {
        Data.table.push(row);
        console.log("Added:", row);
    }
}