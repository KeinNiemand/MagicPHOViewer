"use strict";
let topics;

$( document ).ready(function() {
    console.log( "Magic PHO Viewer Loaded" );
    //$("article.js-selectToQuote").css("color","green")
    topics = GetPHOTopics();
    //Turn topics red for testing purposes
    topics.each((i, element) => element.topicName.css("color", "red"))
});

function GetPHOTopics() {
    let post = $("article.js-selectToQuote")
    let bold = post.find($("b"));
    //Get PHO Topics
    let topics = bold.filter(function() {return this.innerHTML.match("♦ Topic:.*")});
    //Wrap topic Names
    topics.contents().filter((index,node) => node.textContent.match("♦ Topic:.*") && node.nodeType == 3).wrap('<span class="PHOTopicName">');
    //Wrap topic Board
    topics.contents().filter((index,node) => node.textContent.match("In: Boards ►.*") && node.nodeType == 3).wrap('<span class="PHOTopicBoards">');
    //Wrap topic originalPoster
    topics.contents().filter((index,node) => node.textContent.match(".*") && node.nodeType == 3).wrap('<span class="PHOTopicOp">');

    let pHOTopics = topics.each(() => true).map((index, element) => new PHOTopic(element))
    return pHOTopics
}

class PHOTopic {

    topicHeader;
    topicName;
    board;
    originalPoster;
    postedOn;

    constructor(topic) {
        this.topicHeader = $(topic);
        //GetTopicName
        this.topicName = this.topicHeader.find($(".PHOTopicName"));
        //Get Board
        this.board = this.topicHeader.find($(".PHOTopicBoards"));
        //Get orignalPoster
        this.originalPoster = this.topicHeader.find($(".PHOTopicOp"));
    }
}