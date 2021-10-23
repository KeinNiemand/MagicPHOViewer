"use strict";

let magicPHOViewer;

$(document).ready(function () {
    let version = "0.3.1";
    console.log("Magic PHO Viewer " + version + " Loaded");
    //$("article.js-selectToQuote").css("color","green")
    magicPHOViewer = new MagicPHOViewer();
    magicPHOViewer.Init();
});

class MagicPHOViewer {
    topics;
    currentTopicId;
    //true if looking a pho topic
    isViewingPHO = false;
    //html for entire page before viewing PHO
    nonPHOpageData;

    constructor() {

    }

    Init() {
        this.topics = this.GetPHOTopics();
        this.CreateMagicPHOViewerLinks();
    }

    CreateMagicPHOViewerLinks() {
        //ShowPHOTopic when clicking on a topic
        this.topics.each((i, element) => element.topicNameElement.click(() => this.NavigateToPHOTopic(i)));
    }

    GetPHOTopics() {
        let post = $("article.js-selectToQuote")
        let bold = post.find($("b"));
        //Get PHO Topics
        let topics = bold.filter(function () { return this.innerHTML.match("♦ Topic:.*") });
        //Wrap topic Names
        topics.contents().filter((index, node) => node.textContent.match("♦ Topic:.*") && node.nodeType == 3).wrap('<a class="PHOTopicName" style="cursor: pointer">');
        //Wrap topic Board
        topics.contents().filter((index, node) => node.textContent.match("In: Boards ►.*") && node.nodeType == 3).wrap('<span class="PHOTopicBoards">');
        //Wrap topic originalPoster
        topics.contents().filter((index, node) => node.nodeType == 3).wrap('<span class="PHOTopicOp">');
        //Wrap All Lines
        post.children().contents().filter((index, node) => node.nodeType == 3).wrap('<span class="line">');


        let pHOTopics = topics.each(() => true).map((index, element) => new PHOTopic(element))
        return pHOTopics
    }

    InsertPHOPost(phoPost) {
        let container = $(".js-replyNewMessageContainer");
        let postHTML = `<article class="message message--post   js-post js-inlineModContainer   is-unread ">
    
        <div class="message-inner">
    
            <div class="message-cell message-cell--user">
    
    
                <section itemscope="" class="message-user">
                    <div class="message-avatar ">
                        <div class="message-avatar-wrapper">
                            <a href="" class="avatar avatar--m avatar--default avatar--default--dynamic" data-user-id="" data-xf-init="member-tooltip" style="background-color: #05a0c3; color: #3d220f">
                                <span></span>
                            </a>
    
                        </div>
                    </div>
                    <div class="message-userDetails">
                        <h4 class="message-name"><a href="" class="username " dir="auto" itemprop="name" data-user-id="" data-xf-init="member-tooltip" id="js-XFUniqueId112">$$username$$</a></h4>
                        <h5 class="userTitle message-userTitle" dir="auto" itemprop="jobTitle">$$badges$$</h5>
    
    
    
                    </div>
    
    
    
    
    
    
                </section>
    
            </div>
    
    
    
            <div class="message-cell message-cell--main">
    
                <div class="message-main js-quickEditTarget">
    
    
    
    
                    <header class="message-attribution message-attribution--split">
                        <ul class="message-attribution-main listInline ">
    
    
                            <li class="u-concealed">
                                <a href="" rel="nofollow">
                                    <time class="u-dt" >$$postedOn$$</time>
                                </a>
                            </li>
    
    
                        </ul>
    
                    </header>
    
    
    
                    <div class="message-content  js-messageContent">
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                        <div class="message-userContent lbContainer js-lbContainer " data-lb-id="post-21670492" data-lb-caption-desc="Offshoreguy · 10 October 2021 at 19:21">
    
    
    
                            <article class="message-body js-selectToQuote">
    
    
    
    
                                <div class="bbWrapper">$$content$$</div>
    
    
    
    
    
                                <div class="js-selectToQuoteEnd"><span class="line">&nbsp;</span></div>
    
    
    
                            </article>
    
    
    
    
                        </div>
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
                    </div>
    
    
    
                    <footer class="message-footer">
    
                    </footer>
    
    
                </div>
    
    
            </div>
    
        </div>
    
    
        <span id="post-footer-21670492"></span>
    
    
    </article>`

        postHTML = postHTML.replace("$$content$$", phoPost.postContent);
        postHTML = postHTML.replace("$$username$$", phoPost.userName);
        postHTML = postHTML.replace("$$postedOn$$", phoPost.postedOn);
        postHTML = postHTML.replace("$$badges$$", phoPost.userBadges);

        container.append(postHTML);
    }

    ShowPHOTopic(phoTopic) {
        //Check if we are already viewing PHO if not viewPHO
        if (!this.isViewingPHO) {
            this.ViewPHO();
        }


        let postContainer = $(".js-replyNewMessageContainer");
        //get all pho posts
        let phoPosts = phoTopic.posts;
        //remove all existing posts
        postContainer.empty();
        //Go trough all post in the topic and insert them into the originalPosterBadgesElement

        phoPosts.forEach((post, i) => {
            this.InsertPHOPost(post);
        });

        //Scroll to top of page after inserting all posts
        window.scrollTo(0, 0);


    }
    //Chages page wide stuff that dosn't change between threads
    ViewPHO() {
        //Save old page
        this.nonPHOpageData = $("#top").html();
        //Set is viewing PHO to true
        this.isViewingPHO = true;

        //Add Navigation
        let backButton = $(".pageNavSimple-el--prev, .pageNav-jump--prev");
        let forwardButton = $(".pageNavSimple-el--next, .pageNav-jump--next");
        let pageNavPages = $(".pageNavSimple-el--current, .pageNav-main");

        //Remove links from back/forward button
        backButton.removeAttr("href");
        forwardButton.removeAttr("href");

        //Chance cursor to hand for back forward button
        backButton.css("cursor", "pointer");
        forwardButton.css("cursor", "pointer");

        //Change button text so users can see this is PHO navigation
        backButton.text("Prev PHO")
        forwardButton.text("Next PHO");

        //Add onclick handler to back/forward backButton
        backButton.click(() => this.NavigatePreviousPHOTopic());
        forwardButton.click(() => this.NavigateNextPHOTopic());

        //Remove center navigation button/page selector
        pageNavPages.remove();

        //Add back to normal view button
        forwardButton.parent().append("<a class='pageNav-jump returnFromPHO'>↩ back to normal view</a>");
        let returnButton = $(".returnFromPHO");
        returnButton.click(() => this.RetrunFromPHO());
    }

    //Retruns back to regular chapter view after viewing pho.
    RetrunFromPHO() {
        this.isViewingPHO = false;
        //restore old page
        $("#top").html(this.nonPHOpageData);
        //reinit magic pho viewer
        this.Init();
        //scroll to pho link
        this.topics[this.currentTopicId].topicNameElement.get(0).scrollIntoView();
    }

    NavigateToPHOTopic(topicId) {
        this.currentTopicId = topicId;
        this.ShowPHOTopic(this.topics[topicId]);
    }

    NavigateNextPHOTopic() {
        console.log("NavNext" + this.currentTopicId + ";" + this.topics.length)
        if (this.currentTopicId < this.topics.length - 1) {
            console.log("NavNextRuns")
            this.currentTopicId++;
            this.NavigateToPHOTopic(this.currentTopicId);
        }
    }

    NavigatePreviousPHOTopic() {
        if (this.currentTopicId > 0) {
            this.currentTopicId--;
            this.NavigateToPHOTopic(this.currentTopicId);
        }
    }

}