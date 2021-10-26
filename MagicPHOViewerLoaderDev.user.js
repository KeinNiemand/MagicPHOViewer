// ==UserScript==
// @name         MagicPHOViewerLoaderDev
// @version      masterGithub
// @description  Loads Magic PHO Viewer
// @author       KeinNiemand
// @include      https://forums.sufficientvelocity.com/threads/*
// @include      https://forums.spacebattles.com/threads/*
// @icon         https://www.google.com/s2/favicons?domain=sufficientvelocity.com
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    $("body").append("<script src='https://raw.githack.com/KeinNiemand/MagicPHOViewer/master/scripts/PHOTopic.js' crossorigin='anonymous'><\/script>")
    $("body").append("<script src='https://raw.githack.com/KeinNiemand/MagicPHOViewer/master/scripts/PHOpost.js' crossorigin='anonymous'><\/script>")
    $("body").append("<script src='https://raw.githack.com/KeinNiemand/MagicPHOViewer/master/scripts/PHOViewer.js' crossorigin='anonymous'><\/script>")
})();