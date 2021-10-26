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
    posts;

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
        this.postedOnElement = this.topicHeader.nextAll().filter((i, node) => node.textContent.toLowerCase().match("posted on.*$")).first()
        this.postedOn = this.postedOnElement.html();
        //Get End
        this.endElement = this.topicHeader.nextAll().filter((i, node) => 
        node.textContent.match("■.*$")
        .first());
        //Backup End if no last element was found => last element
        if (this.endElement.length === 0) {
            this.endElement = this.topicHeader.nextAll().last();
        }
        //Get posts
        this.posts = this.getPosts();
    }

    getPosts() {
        let topicContent = this.postedOnElement.nextUntil(this.endElement)
        let bold = topicContent.find($("b"));
        let postHeaders = bold.filter(function () { return this.innerHTML.match("►.*") });
        let posts = [this.getOriginalPost()];
        posts.push(...postHeaders.each(() => true).map((index, element) => new PHOpost(element)).toArray());
        //let posts = postHeaders.each(() => true).map((index, element) => new PHOpost(element));
        return posts;
    }

    getOriginalPost() {
        let originalPost = new PHOpost(this.originalPosterElement);
        originalPost.userBadges = this.originalPosterBadges;
        return originalPost;
    }
}