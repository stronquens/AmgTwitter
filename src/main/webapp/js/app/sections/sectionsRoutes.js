
function fSectionRoutes() {
    
    Path.map("#home").to(function () {
        $("main").html("");
        oSectionsModel.getAjaxTimeline(function(data){
            oSectionsView.printTweets(data);
        });
    });   
    
    Path.map("#notifications").to(function () {
        $("main").html("");
        oSectionsController.pruebas();
    });
    
    Path.map("#hastag").to(function () {
        $("main").html("");
    });   
}

