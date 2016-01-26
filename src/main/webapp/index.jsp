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
        <%
            HttpSession sesion = request.getSession();
            String pin = request.getParameter("verifier");
            RequestToken requestToken = null;
            AccessToken accessToken = null;
            Twitter OAuthTwitter = null;
            String url = null;
            if (pin == null || pin == "") {
                ConfigurationBuilder configBuilder = new ConfigurationBuilder();
                configBuilder.setDebugEnabled(true)
                        .setOAuthConsumerKey("nyFJnGU5NfN7MLuGufXhAcPTf")
                        .setOAuthConsumerSecret("QOofP3lOC7ytKutfoexCyh3zDVIFNHoMuuuKI98S78XmeGvqgW");
                OAuthTwitter = new TwitterFactory(configBuilder.build()).getInstance();
                sesion.setAttribute("twitter", OAuthTwitter);
                try {
                    //System.out.println("==============================================");
                    requestToken = OAuthTwitter.getOAuthRequestToken();
                    sesion.setAttribute("requestToken", requestToken);
                    //System.out.println("Request Tokens obtenidos con éxito.");
                    //System.out.println("Request Token: " + requestToken.getToken());
                    //System.out.println("Request Token secret: " + requestToken.getTokenSecret());
                    url = requestToken.getAuthenticationURL();
                    //System.out.println("URL:" + url);
                } catch (TwitterException ex) {
                }
            }
            if (pin != null && pin.length() > 0) {

                OAuthTwitter = (Twitter) sesion.getAttribute("twitter");
                requestToken = (RequestToken) sesion.getAttribute("requestToken");
                sesion.removeAttribute("twitter");
                sesion.removeAttribute("requestToken");
                //System.out.println("----------------------------------------");
                accessToken = OAuthTwitter.getOAuthAccessToken(requestToken, pin);
                sesion.setAttribute("accesToken", accessToken);
                //System.out.println("Access Tokens obtenidos con éxito.");
                System.out.println("Access Token: " + accessToken.getToken());
                //System.out.println("Access Token secret: " + accessToken.getTokenSecret());
            }

        %>

        <a href="<%= url%>" target="popup" onClick="pop_up = window.open(this.href, this.target, 'width=350,height=420'); return false;">
            <img src="./img/sign-in-with-twitter-gray.png"></img>
        </a><br/>
</html>

<script type="text/javascript">
    $(document).ready(function () {
        var timer = setInterval(checkWindow, 1000);
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
                url: 'http://127.0.0.1:39963/AmgTwitter/?verifier=' + verifier
            }).done(function (data) {
                console.log("AccesToken obtenido")
            });
        }
        ;
    });
</script>

