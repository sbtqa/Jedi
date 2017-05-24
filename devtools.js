/**
 * Created by cyber-PC on 17.04.2017.
 */
console.log("hello from devtools");
chrome.devtools.panels.create("Jedi QA", "icons/128x128.png", "/devtools/tab/index.html", function(panel) {});

chrome.devtools.panels.elements.createSidebarPane("Variable",
    function (sidebar) {
        sidebar.setPage('/devtools/variable_builder/index.html');
    });