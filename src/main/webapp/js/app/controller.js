

var Controller = function () {
    this.token = null;
    this.secret = null;
};
Controller.prototype.init = function () {
    if (this.token == null && this.secret == null) {
        this.token = Cookies().leerCookie("amgTwitterToken");
        this.secret = Cookies().leerCookie("amgTwitterSecret");
    }
    oView.printTweets(oModel.getAjaxTimeline(this.token, this.secret));
};
var oController = new Controller();