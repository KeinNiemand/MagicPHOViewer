class PHOpost {
    postHeader;
    userNameElement;
    userName;
    userBadgesElement;
    userBadges;
    postedOnElement;
    postedOn;
    postContentElements;
    postContent = "";
    end;

    constructor(postHeader) {
        this.postHeader = $(postHeader)
        this.userNameElement = this.postHeader;
        this.userName = this.userNameElement.text().replace("►", "").replace("\n", "");
        this.userBadgesElement = this.postHeader.parent().filter((idx, element) => element.textContent.match("\(.*\)"));
        this.userBadges = this.userBadgesElement.text().replace("►", "").replace(this.userName, "");
        this.postedOnElement = this.postHeader.parent().nextAll().filter((idx, element) => element.textContent.toLowerCase().match(".*replied on.*$")).first();
        this.postedOn = this.postedOnElement.text().toLowerCase().replace("replied on", "").replace("posted on", "")
        this.end = this.postHeader.parent().nextAll().filter((idx, element) => element.textContent.match("►.*") ||
            element.textContent.match("End of Page.*") ||
            element.textContent.match("Showing Page.*")
        ).first();

        //Combine the diffrent elements in postContentElements to get postContent
        this.postContentElements = this.postHeader.parent().nextUntil(this.end)
            .filter((idx, element) => 
                !element.textContent.toLowerCase().match(".*replied on.*$") &&
                !element.textContent.toLowerCase().match(".*posted on.*") &&
                !element.textContent.match(".*\(Original Poster\).*"));

        this.postContentElements.each((i, element) => this.postContent += element.outerHTML);
    }
}