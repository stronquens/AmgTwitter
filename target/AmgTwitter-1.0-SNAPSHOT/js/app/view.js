
var View = function() {
};
View.prototype.getClassName = function() {
    return this.clase;
};
View.prototype.printTweetsManual = function(data) {
    if (data != null) {
        var html = "<div class='align'><div class='timeline'><ol class='stream-items'>";
        for (var i = 0; i < data.length; i++) {
            html += "<li class='tweet' id='" + data[i].id + "'>";
            html += "<a class='account-group'><img class='avatar' src='" + data[i].user.profileImageUrl + "'/>"
            html += "<div class='tweet-user'>" + data[i].user.name + " @" + data[i].user.screenName + "</a></div>";
            html += "<div class='time'>" + data[i].createdAt + "</div>";
            html += "<div class='tweet-text'>" + data[i].text + "</div>";
            html += "</li>";
            
        }
        html += "</ol></div></div>";
        $("main").append(html);
    // Mostramos el tiempo que ha tardado desde la llamada    
    var d2 = new Date();
    var fin = d2.getTime();
    console.log("Tiempo mostrar tweets home timeline: "+(fin-ini));
    } else {
        console.log("error: generando vista tweets");
    }
};
View.prototype.printTweetsMoustache = function(data) {
    data = {"tweets":data};
    // Lee el archivo de template, genera la vista y la inserta
    $.get( "../js/views/tweets-template.html", function( source ) {
        var template = Handlebars.compile(source);
        $("main").html(template(data));
    });
    // Mostramos el tiempo que ha tardado desde la llamada    
    var d2 = new Date();
    var fin = d2.getTime();
    console.log("Tiempo mostrar tweets home timeline: "+(fin-ini));
};
View.prototype.printUserInfo = function(data) {
    /*
     "profileBackgroundColor":"022330",
     "profileTextColor":"333333",
     "profileLinkColor":"0084B4",
     "profileSidebarFillColor":"C0DFEC",
     "profileSidebarBorderColor":"A8C7F7",
     */
    $('nav').css('background-image',"url(" + data.profileBannerImageUrl + ")");
    $('.profile').html("<img class='avatar' src='" + data.profileImageUrl.replace("normal","400x400") + "' />");
    $('.profile').append("</br><div class='screenname'>@" + data.screenName 
            + "</div></br><div class='name'>" + data.name + "</div>");
    
    // tweets statusesCount; Siguiendo friendsCount; seguidores followersCount
    $('.submenu').prepend("<div class='sm2'>\n\
    <a href='#' class='tweetsCount'><span>TWEETS</span><br/>"+data.statusesCount+"</a>\n\
    <a href='#' class='friendsCount'><span>SIGUIENDO</span><br/>"+data.friendsCount+"</a>\n\
    <a href='#' class='followersCount'><span>SEGUIDORES</span><br/>"+data.followersCount+"</a></div>");


};
var oView = new View();

