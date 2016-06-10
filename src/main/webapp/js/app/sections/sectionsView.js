
var SectionsView = function() {
};
SectionsView.prototype.getClassName = function() {
    return this.clase;
};
SectionsView.prototype.printTweets = function(data) {
    data = {"tweets": data};
    // Lee el archivo de template, genera la vista y la inserta
    $.get("../js/templates/tweets-template.html", function(source) {
        var template = Handlebars.compile(source);
        $("main").html(template(data));
    });
};
SectionsView.prototype.printUserInfo = function(data) {
    // Estandar ES6 templating por defecto en navegadores *nuevo
    $('nav').css('background-image', `url(${data.profileBannerImageUrl})`);
    $('.profile').html(
      `<img class='avatar' src='${data.profileImageUrl.replace("normal", "400x400")}' /></br>
      <div class='screenname'>@${data.screenName}</div></br>
      <div class='name'>${data.name}</div>`
     );

    $('.submenu').prepend(
        `<div class='sm2'>
            <a href='#' class='tweetsCount'><span>TWEETS</span><br/>${data.statusesCount}</a>
            <a href='#' class='friendsCount'><span>SIGUIENDO</span><br/>${data.friendsCount}</a>
            <a href='#' class='followersCount'><span>SEGUIDORES</span><br/>${data.followersCount}</a>
        </div>`
    );
};
SectionsView.prototype.bindInitEvents = function() {
    // Nav scroll change
    var nav = $('nav');
    var heightToChange = nav.offset().top + nav.height() - $('.menu').height();
    $(window).on('scroll', function() {
        var stop = Math.round($(window).scrollTop());
        if (stop > heightToChange) {
            $('.menu').addClass('menu-scroll');
        } else {
            $('.menu').removeClass('menu-scroll');
        }
    });
    // Button Menu
    var menuButton = $('.menu-button');
    menuButton.click(function() {
        $({deg: 0}).animate({deg: 180}, {
            duration: 400,
            step: function(now) {
                menuButton.css({
                    transform: 'rotate(' + now + 'deg)'
                });
            }
        });
        $('.desplegable').toggle(500);
    })
};
var oSectionsView = new SectionsView();

