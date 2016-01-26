
$(document).ready(function () {

    // Crear Cookie
    var crearCookie = function (key, value) {
        expires = new Date();
        expires.setTime(expires.getTime() + 86400000);
        cookie = key + "=" + value + ";expires=" + expires.toUTCString();
        console.log("crearCookie: " + cookie);
        return document.cookie = cookie;
    }

    // Leer Cookie
    var leerCookie = function (key) {
        keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
        if (keyValue) {
            console.log("getCookie: " + key + "=" + keyValue[2]);
            return keyValue[2];
        } else {
            console.log("getCookie: " + key + "=" + "null");
            return null;
        }
    }

    // Eliminar Cookie
    var eliminarCookie = function (key) {
        console.log("eliminarCookie: " + key);
        return document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    }
    // Obtenemos las cookies y si existen las mostramos y sino las creamos
    var cookie1 = leerCookie("amgTwitterToken");
    var cookie2 = leerCookie("amgTwitterSecret");
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
                button += "<img src='./img/sign-in-with-twitter-gray.png'></img></a>";
                $("#button").html(button);
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

                crearCookie("amgTwitterToken", data.token);
                crearCookie("amgTwitterSecret", data.secret);
            });
        }
        // Comprueba cada segundo el pop up
        var timer = setInterval(checkWindow, 1000);
    } else {
        // Muestra las cookies creadas
        $("#resultado").html("Acces Token Cookie: " + cookie1 + "<br/>");
        $("#resultado").append("Acces Secret Cookie: " + cookie2);
    }

});


