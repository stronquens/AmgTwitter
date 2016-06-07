
function fTwitterRoutes() {
    
    Path.map("#home").to(function () {
        d1 = new Date();
        ini = d1.getTime();
        $("main").html("");
        oModel.getAjaxTimeline(function(data){
            oView.printTweetsMoustache(data);
        });
    });   
    
    Path.map("#notifications").to(function () {
        d1 = new Date();
        ini = d1.getTime();
        $("main").html("");
        
        oController.pruebas();
    });
    
    Path.map("#hastag").to(function () {
        $("main").html("");
    });   
}

