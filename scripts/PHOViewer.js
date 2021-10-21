"use strict";
let topics;

$( document ).ready(function() {
    console.log( "Magic PHO Viewer Loaded" );
    //$("article.js-selectToQuote").css("color","green")
    topics = GetPHOTopics();
    //Turn topics red for testing purposes
    topics.each((i, element) => element.topicNameElement.css("color", "red"))

    InsertPHOPost();
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

function InsertPHOPost() {
    let container = ".js-replyNewMessageContainer";
    let postHTML = `<article class="message message--post   js-post js-inlineModContainer   is-unread " data-author="Offshoreguy" data-content="post-21670492" id="js-post-21670492">

        <div class="message-inner">
            
                <div class="message-cell message-cell--user">
                    

<section itemscope="" itemtype="https://schema.org/Person" class="message-user">
    <div class="message-avatar ">
        <div class="message-avatar-wrapper">
            <a href="" class="avatar avatar--m avatar--default avatar--default--dynamic" data-user-id="" data-xf-init="member-tooltip" style="background-color: #cc7033; color: #3d220f" id="js-XFUniqueId111">
        <span class="avatar-u67296-m" role="img" aria-label="">O</span> 
    </a>
            
        </div>
    </div>
    <div class="message-userDetails">
        <h4 class="message-name"><a href="" class="username " dir="auto" itemprop="name" data-user-id="" data-xf-init="member-tooltip" id="js-XFUniqueId112">abc</a></h4>
        
        

    </div>
    
        
        
    
</section>

                </div>
            

            
                <div class="message-cell message-cell--main">
                
                    <div class="message-main js-quickEditTarget">

                        
                            

<header class="message-attribution message-attribution--split">
    <ul class="message-attribution-main listInline ">
        
        
        <li class="u-concealed">
            <a href="/threads/i-want-a-refund-tinker-of-fiction-semi-si.84482/post-21670492" rel="nofollow">
                <time class="u-dt" dir="auto" datetime="2021-10-10T19:21:57+0200" data-time="1633886517" data-date-string="10 October 2021" data-time-string="19:21" title="10 October 2021 at 19:21" itemprop="datePublished">10 October 2021</time>
            </a>
        </li>
        
        
    </ul>





    <ul class="message-attribution-opposite message-attribution-opposite--list " data-xf-init="sv-transparent-as-spoiler" data-sv-show-icon="fa fa-eye" data-sv-hide-icon="fa fa-eye-slash">
        
            <li><span class="message-newIndicator">New</span></li>
        
        <li>
            <a href="/threads/i-want-a-refund-tinker-of-fiction-semi-si.84482/post-21670492" class="message-attribution-gadget" data-xf-init="share-tooltip" data-href="/posts/21670492/share" aria-label="Share" rel="nofollow" id="js-XFUniqueId113">
                <i class="fa--xf far fa-share-alt" aria-hidden="true"></i>
            </a>
        </li>
        
            <li>
                
                    




                
            </li>
        
        
            <li>
                <a href="/threads/i-want-a-refund-tinker-of-fiction-semi-si.84482/post-21670492" rel="nofollow">
                    #4,460
                </a>
            </li>
        
    </ul>
</header>

                        

                        <div class="message-content  js-messageContent">
                        

                            
                                






                            

                            
                                

<div class="message-userContent lbContainer js-lbContainer " data-lb-id="post-21670492" data-lb-caption-desc="Offshoreguy · 10 October 2021 at 19:21">

    

    <article class="message-body js-selectToQuote">
        
            
        
        
            <div class="bbWrapper"><span class="line">Test123</span></div>
        
        



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

$(container).append(postHTML);
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