// ==UserScript==
// @name         MagicPHOViewerLoader
// @version      0.1
// @description  Loads Magic PHO Viewer
// @author       KeinNiemand
// @match        https://forums.sufficientvelocity.com/threads/*
// @icon         https://www.google.com/s2/favicons?domain=sufficientvelocity.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $("body").append("<script src='https://raw.githack.com/KeinNiemand/MagicPHOViewer/master/scripts/PHOViewer.js' crossorigin='anonymous'><\/script>")
})();