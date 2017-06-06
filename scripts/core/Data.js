/**
 * Created by cyber-PC on 26.04.2017.
 */
var Data = {};
var rowCounter = 0;

/**
 * Все статичные поля.
 * @type {Array}
 */
Data.statics = {};
Data.table = [];

function addRow(row) {
    if (row !== undefined) {
        row.id = rowCounter++;
        Data.table.push(row);
        console.log("Added:", row);
    }
}