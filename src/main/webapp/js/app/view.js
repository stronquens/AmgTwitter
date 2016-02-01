
var View = function () {
};
View.prototype.getClassName = function () {
    return this.clase;
};
View.prototype.printTweets = function (data) {
    if (data != null) {
        for (var i = 0; i < data.length; i++) {
            var html = "<li class='tweet' id='" + data[i].id + "'>";
            html += "<a class='account-group'><img class='avatar' src='" + data[i].user.profileImageUrl + "'/>"
            html += "<div class='tweet-user'>" + data[i].user.name + " @" + data[i].user.screenName + "</a></div>";
            html += "<div class='time'>" + data[i].createdAt + "</div>";
            html += "<div class='tweet-text'>" + data[i].text + "</div>";
            html += "</li>";
            $(".stream-items").append(html);
        }
    } else {
        console.log("data error");
    }
};
View.prototype.printUserInfo = function (data) {

    /*
     "profileBackgroundColor":"022330",
     "profileTextColor":"333333",
     "profileLinkColor":"0084B4",
     "profileSidebarFillColor":"C0DFEC",
     "profileSidebarBorderColor":"A8C7F7",
     */
    var html = "<div class='info-user'>";
    html += "<img src='" + data.profileImageUrl + "' />";
    html += "<div class='user-tweets'><span>TWEETS</span>" + data.statusesCount + "</div>";
    html += "<div class='user-friends'><span>SIGUIENDO</span>" + data.friendsCount + "</div>";
    html += "<div class='user-followers'><span>SEGUIDORES</span>" + data.followersCount + "</div>";
    return html += "</div>";
};
var oView = new View();

