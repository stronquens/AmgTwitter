

var Controller = function () {
    this.token = Cookies().leerCookie("amgTwitterToken");
    this.secret = Cookies().leerCookie("amgTwitterSecret");
};
Controller.prototype.init = function () {   
    var infoUserHtml = oView.printUserInfo(oModel.getAjaxUserInfo(this.token, this.secret));
    $(".col1").append(infoUserHtml);
    oView.printTweets(oModel.getAjaxTimeline(this.token, this.secret));
};
var oController = new Controller();