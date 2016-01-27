$(document).ready(function () {
    /*
     * Requiere el uso de Cookies.js -- important --
     */

// Obtenemos las cookies y si existen las mostramos y sino las creamos
    var cookie1 = Cookies().leerCookie("amgTwitterToken");
    var cookie2 = Cookies().leerCookie("amgTwitterSecret");
    if (cookie1 == null && cookie2 == null) {
        // Crea el boton de iniciar sesion con la url correspondiente
        (function getButton() {
            $.ajax({
                method: "GET",
                dataType: "json",
                url: 'http://127.0.0.1:39963/AmgTwitter/login?op=url'
            }).done(function (data) {
                var button = "<a href='" + data.url + "' target='popup' ";
                button += "onClick=\"pop_up = window.open(this.href, this.target, 'width=350,height=420'); return false;\"> ";
                button += "<img class='boton' src='./img/login/boton.png'></img></a>";
                $("#accion").html(button);
            });
        })();
        // Comprueba cada segundo si el pop up ha devuelto los parametros y lo cierra
        function checkWindow() {
            try {
                var ur = pop_up.location.href;
                if (ur.indexOf('oauth_verifier') !== -1) {
                    var verifier = "";
                    clearInterval(timer);
                    pop_up.close();
                    ur = ur.substring(ur.indexOf('?') + 1);
                    var urPartes = ur.split('&');
                    for (i = 0; i < urPartes.length; i++) {
                        if (urPartes[i].indexOf('oauth_verifier') !== -1) {
                            verifier = urPartes[i].split('=')[1];
                        }
                    }
                    getVerifierToken(verifier);
                }
            } catch (e) {
                console.log(e);
            }
        }
        // Obtiene el acces token/secret y crea una cookie
        function getVerifierToken(verifier) {
            $.ajax({
                method: "GET",
                dataType: "json",
                url: 'http://127.0.0.1:39963/AmgTwitter/login?verifier=' + verifier
            }).done(function (data) {
                $("#resultado").html("Acces Token: " + data.token + "<br/>");
                $("#resultado").append("Acces Secret: " + data.secret);

                Cookies().crearCookie("amgTwitterToken", data.token);
                Cookies().crearCookie("amgTwitterSecret", data.secret);
            });
        }
        // Comprueba cada segundo el pop up
        var timer = setInterval(checkWindow, 1000);
    } else {
        $("#accion").html("<p>Ya estas logueado: <a href='./html/home.html'>Ir a mi home</a></p>");
        window.location = "./html/home.html";
        // Muestra las cookies creadas
        $("#resultado").html("Acces Token Cookie: " + cookie1 + "<br/>");
        $("#resultado").append("Acces Secret Cookie: " + cookie2);
    }

});
