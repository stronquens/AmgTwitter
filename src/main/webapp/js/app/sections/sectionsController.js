
var SectionsController = function () {
    this.token = Cookies().leerCookie("amgTwitterToken");
    this.secret = Cookies().leerCookie("amgTwitterSecret");
};
SectionsController.prototype.init = function () { 

    oSectionsModel.getAjaxUserInfo(function(data){
        oSectionsView.printUserInfo(data);
    });
    oSectionsModel.getAjaxTimeline(function(data){
        oSectionsView.printTweets(data);
    });
    
    oSectionsView.bindInitEvents();
};

SectionsController.prototype.pruebas = function () { 
    // TODO
};
var oSectionsController = new SectionsController();