"use strict";
let topics;

$( document ).ready(function() {
    console.log( "Magic PHO Viewer Loaded" );
    //$("article.js-selectToQuote").css("color","green")
    topics = GetPHOTopics();
    //Turn topics red for testing purposes
    topics.each((i, element) => element.topicNameElement.css("color", "red"))
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
    topics.contents().filter((index,node) => node.nodeType == 3).wrap('<span class="PHOTopicOp">');
    //Wrap All Lines
    post.children().contents().filter((index,node) => node.nodeType == 3).wrap('<span class="line">');


    let pHOTopics = topics.each(() => true).map((index, element) => new PHOTopic(element))
    return pHOTopics
}

class PHOTopic {

    topicHeader;
    topicNameElement;
    topicName;
    boardElement;
    board;
    originalPosterElement;
    originalPoster;
    originalPosterBadgesElement;
    originalPosterBadges;
    postedOnElement;
    postedOn;
    endElement;

    constructor(topic) {
        this.topicHeader = $(topic);
        //GetTopicName
        this.topicNameElement = this.topicHeader.find($(".PHOTopicName"));
        this.topicName = this.topicNameElement.html();
        //Get Board
        this.boardElement = this.topicHeader.find($(".PHOTopicBoards"));
        this.board = this.boardElement.html();
        //Get orignalPoster
        this.originalPosterElement = this.topicHeader.find($(".PHOTopicOp"));
        this.originalPoster = this.originalPosterElement.html();
        //Get Badges
        this.originalPosterBadgesElement = this.topicHeader.next();
        this.originalPosterBadges = this.originalPosterBadgesElement.html();
        //Get PostedOn
        this.postedOnElement = this.topicHeader.nextAll().filter((i,node) => node.textContent.match("Posted On.*$")).first()
        this.postedOn = this.postedOnElement.html();
        //Get End
        this.endElement = this.topicHeader.nextAll().filter((i,node) => node.textContent.match("■.*$")).first();
    }

    getPosts() {
        let topicContent = this.postedOnElement.nextUntil(this.endElement)
        let bold = topicContent.find($("b"));
        let postHeaders = bold.filter(function() {return this.innerHTML.match("►.*")});
        return postHeaders.each(() => true).map((index, element) => new PHOpost(element))
    }

    getOriginalPost() {
        return new PHOpost(this.originalPosterElement);
    }
}

class PHOpost {
    postHeader;
    userNameElement;
    userBadgesElement;
    postedOnElement;
    postContentElements;
    postContent = "";
    end;

    constructor(postHeader) {
        this.postHeader = $(postHeader)
        this.userNameElement = this.postHeader;
        this.userBadgesElement = this.postHeader.parent().filter((idx, element) => element.textContent.match("\(.*\)"));
        this.postedOnElement = this.postHeader.parent().nextAll().filter((idx, element) => element.textContent.match(".*Replied On.*$")).first();
        this.end = this.postHeader.parent().nextAll().filter((idx, element) => element.textContent.
        match("►.*") || 
        element.textContent.match("End of Page.*") ||
        element.textContent.match("Showing Page.*")
        ).first();
        this.postContentElements = this.postHeader.parent().nextUntil(this.end)
        .filter((idx, element) => !element.textContent.match(".*Replied On.*$") &&
        !element.textContent.match(".*Posted On.*") &&
        !element.textContent.match(".*\(Original Poster\).*"));

        this.postContentElements.each((i, element) => this.postContent += element.outerHTML);
    }
}