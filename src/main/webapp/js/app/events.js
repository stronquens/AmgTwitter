
function pageEvents() {

    oController.init();

    $('.logout').click(function() {
        Cookies().eliminarCookie('amgTwitterToken');
        Cookies().eliminarCookie('amgTwitterSecret');
        //window.location = "../index.html";
        return false;
    });

}

