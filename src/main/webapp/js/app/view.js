
var View = function() {
};
View.prototype.getClassName = function() {
    return this.clase;
};
View.prototype.printTweets = function(data) {
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
View.prototype.printUserInfo = function(data) {

    /*
     "profileBackgroundColor":"022330",
     "profileTextColor":"333333",
     "profileLinkColor":"0084B4",
     "profileSidebarFillColor":"C0DFEC",
     "profileSidebarBorderColor":"A8C7F7",
     */
    var html = "<div class='info-user'>";
    if (data.profileBannerImageUrl != null) {
        // Profile 1
        html += "<div class='head-info-user' style='background-image: url(" + data.profileBannerImageUrl + ")';></div>";
        // Profile 2
        $('nav').css('background-image',"url(" + data.profileBannerImageUrl + ")");
    } else {
        html += "<div class='head-info-user' style='background-color:#" + data.profileLinkColor + ";'></div>";
    }
    // Profile 1
    html += "<img class='img-avatar' src='" + data.profileImageUrl.replace("normal","bigger") + "' />";
    html += "<div class='user-name'>" + data.name + " <span>@" + data.screenName + "</span></div>";
    // Profile 2
    $('.profile').html("<img class='avatar' src='" + data.profileImageUrl.replace("normal","400x400") + "' />");
    $('.profile').append("</br><div class='screenname'>@" + data.screenName + "</div></br><div class='name'>" + data.name + "</div>");
    // Profile 1
    html += "<div class='ProfileCardStats'><ul class='ProfileCardStats-statList'>";
    html += "<li class='ProfileCardStats-stat'><a href='#'><span class='ProfileCardStats-statLabel'>TWEETS</span><span class='ProfileCardStats-statValue'>" + data.statusesCount + "</span></a></li>";
    html += "<li class='ProfileCardStats-stat'><a href='#'><span class='ProfileCardStats-statLabel'>SIGUIENDO</span><span class='ProfileCardStats-statValue'>" + data.friendsCount + "</span></li>";
    html += "<li class='ProfileCardStats-stat'><a href='#'><span class='ProfileCardStats-statLabel'>SEGUIDORES</span><span class='ProfileCardStats-statValue'>" + data.followersCount + "</span></li></ul></div>";

    return html += "</div>";
};
var oView = new View();

