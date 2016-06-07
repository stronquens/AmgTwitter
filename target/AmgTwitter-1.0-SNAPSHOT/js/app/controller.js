var d1;
var ini;

var Controller = function () {
    this.token = Cookies().leerCookie("amgTwitterToken");
    this.secret = Cookies().leerCookie("amgTwitterSecret");
};
Controller.prototype.init = function () { 
    // Inicia el tiempo de cuenta para ver lo que tarda
    d1 = new Date();
    ini = d1.getTime();
    oModel.getAjaxUserInfo(function(data){
        oView.printUserInfo(data);
    });
    oModel.getAjaxTimeline(function(data){
        oView.printTweetsMoustache(data);
    });
};

Controller.prototype.pruebas = function () { 
};
var oController = new Controller();