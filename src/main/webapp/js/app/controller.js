var d1;
var ini;

var Controller = function () {
    this.token = Cookies().leerCookie("amgTwitterToken");
    this.secret = Cookies().leerCookie("amgTwitterSecret");
};
Controller.prototype.init = function () { 
    fTwitterRoutes();
    // Inicia el tiempo de cuenta para ver lo que tarda
    d1 = new Date();
    ini = d1.getTime();
    
    oModel.getAjaxUserInfo();
    oModel.getAjaxTimeline();
    //$(".col1").append(oView.printUserInfo(userInfo));
    //oView.printTweets(timeline);
};
var oController = new Controller();