<%@page import="twitter4j.TwitterException"%>
<%@page import="com.stronquens.bean.AutenticationBean"%>
<%@page import="twitter4j.auth.AccessToken"%>
<%@page import="twitter4j.auth.RequestToken"%>
<%@page import="twitter4j.Twitter"%>
<%@page import="twitter4j.TwitterFactory"%>
<%@page import="twitter4j.conf.ConfigurationBuilder"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>AmgTwitter</title>
        <script src="./js/jquery-2.2.0.min.js"></script>
    </head>
    <body>
        <h1>Login</h1>
        <div id="button"></div>
        <p id="resultado"></p>
    </body>
    <script type="text/javascript">
        $(document).ready(function () {
            var timer = setInterval(checkWindow, 1000);

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
            ;

            function getVerifierToken(verifier) {
                $.ajax({
                    method: "GET",
                    dataType: "json",
                    url: 'http://127.0.0.1:39963/AmgTwitter/login?verifier=' + verifier
                }).done(function (data) {
                    $("#resultado").html("Acces Token: "+ data.token + "<br/>");
                     $("#resultado").append("Acces Secret: " +data.secret);
                });
            }
            ;
        });
    </script>
</html>

