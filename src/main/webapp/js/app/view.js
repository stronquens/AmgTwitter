
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
var oView = new View();

