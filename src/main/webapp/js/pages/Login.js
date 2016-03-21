$(document).ready(function() {
    /*
     * Requiere el uso de Cookies.js -- important --
     */
    $("h1").show(2000);
    function animation() {
        if ($("h1").is(":visible")) {
            $("h1").hide("slow", function() {
                $('.spinner').show("slow");
            });
        } else {
            $(".spinner").hide("slow", function() {
                $('h1').show("slow");
            });
        }
    }
    ;
    // Obtenemos las cookies y si existen las mostramos y sino las creamos
    var cookie1 = Cookies().leerCookie("amgTwitterToken");
    var cookie2 = Cookies().leerCookie("amgTwitterSecret");
    if (cookie1 === null && cookie2 === null) {
        // Crea el boton de iniciar sesion con la url correspondiente
        $.ajax({
            method: "GET",
            dataType: "json",
            async: false,
            url: 'http://127.0.0.1:39963/AmgTwitter/login?op=url'
        }).done(function(data) {
            var button = "<a href='" + data.url + "' target='popup' class='a-login'";
            button += "onClick=\"pop_up = window.open(this.href, this.target, 'width=350,height=420'); return false;\">Log in</a>";
            $("#accion").html(button);
        });
        // Regula las animaciones de welcome y spinner
        $('.a-login').click(function() {
            if ($("h1").is(":visible")) {
                animation();
                var pollTimer = window.setInterval(function() {
                    if (pop_up.closed !== false) { // !== is required for compatibility with Opera
                        window.clearInterval(pollTimer);
                        animation();
                    }
                }, 200);
            }
        });
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
            }).done(function(data) {
                Cookies().crearCookie("amgTwitterToken", data.token);
                Cookies().crearCookie("amgTwitterSecret", data.secret);
                window.location = "./app.html";
            });
        }
        // Comprueba cada segundo el pop up
        var timer = setInterval(checkWindow, 1000);
    } else {
        // Si existen cookies redirige
        window.location = "./app.html";
    }

});
