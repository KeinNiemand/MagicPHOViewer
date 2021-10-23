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
        this.userName = this.userNameElement.text().replace("►", "");
        this.userBadgesElement = this.postHeader.parent().filter((idx, element) => element.textContent.match("\(.*\)"));
        this.userBadges = this.userBadgesElement.text().replace("►", "").replace(this.userName, "");
        this.postedOnElement = this.postHeader.parent().nextAll().filter((idx, element) => element.textContent.match(".*Replied On.*$")).first();
        this.postedOn = this.postedOnElement.text().replace("Replied On", "").replace("Posted On", "")
        this.end = this.postHeader.parent().nextAll().filter((idx, element) => element.textContent.match("►.*") ||
            element.textContent.match("End of Page.*") ||
            element.textContent.match("Showing Page.*")
        ).first();

        //Combine the diffrent elements in postContentElements to get postContent
        this.postContentElements = this.postHeader.parent().nextUntil(this.end)
            .filter((idx, element) => !element.textContent.match(".*Replied On.*$") &&
                !element.textContent.match(".*Posted On.*") &&
                !element.textContent.match(".*\(Original Poster\).*"));

        this.postContentElements.each((i, element) => this.postContent += element.outerHTML);
    }
}