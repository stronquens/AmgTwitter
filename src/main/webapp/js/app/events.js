
function pageEvents() {

    oController.init();

    $('.logout').click(function() {
        //Cookies().eliminarCookie('amgTwitterToken');
        //Cookies().eliminarCookie('amgTwitterSecret');
        Cookies().crearCookie("amgTwitterToken", null);
        Cookies().crearCookie("amgTwitterSecret", null);
        //window.location = "../index.html";
        return false;
    });

}

