<%@page import="com.stronquens.bean.AutenticationBean"%>
<%@page import="com.stronquens.amgtwitter.Autentication"%>
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
            Autentication aut = new Autentication();
            AutenticationBean autBean = new AutenticationBean();
            autBean = aut.getRequestToken(autBean);

            String token = request.getParameter("token");
            String verifier = request.getParameter("verifier");

            if (verifier != null) {
                System.out.println("token: " + token);
                System.out.println("verifier: " + verifier);
                autBean.setOauth_verifier(verifier);
                AccessToken accessToken = aut.getAccesToken(autBean.getRequest_token(), verifier);
                System.out.println(accessToken.getToken());
            }
        %>

        <p>Request Tokens obtenidos con éxito</p>        
        <p>Request Token: <%= autBean.getRequest_token().getToken()%>                      
        <p>Request Token secret: <%= autBean.getRequest_token().getTokenSecret()%>  
        <p>URL: <%= autBean.getUrl()%> </p></br>
        <a href="<%= autBean.getUrl()%>" target="popup" onClick="pop_up = window.open(this.href, this.target, 'width=350,height=420'); return false;">
            <img src="./img/sign-in-with-twitter-gray.png"></img>
        </a>
        <p id="oauth_token">oauth_token: </p>
        <p id="oauth_verifier">oauth_verifier: </p>
</html>

<script type="text/javascript">
    $(document).ready(function () {
        var timer = setInterval(checkWindow, 1000);

        function checkWindow() {
            try {
                var ur = pop_up.location.href;
                if (ur.indexOf('oauth_verifier') !== -1) {
                    var verifier = "";
                    var token = "";
                    clearInterval(timer);
                    pop_up.close();
                    ur = ur.substring(ur.indexOf('?') + 1);
                    var urPartes = ur.split('&');
                    for (i = 0; i < urPartes.length; i++) {
                        if (urPartes[i].indexOf('oauth_verifier') !== -1) {
                            verifier = urPartes[i].split('=')[1];
                        }
                        if (urPartes[i].indexOf('oauth_token') !== -1) {
                            token = urPartes[i].split('=')[1];
                        }
                    }
                    $("#oauth_token").append(verifier);
                    $("#oauth_verifier").append(token);
                    getAccesToken(token, verifier);
                }
            } catch (e) {
                console.log(e);
            }
        }
        ;

        function getAccesToken(token, verifier) {
            $.ajax({
                method: "GET",
                url: 'http://127.0.0.1:39963/AmgTwitter/?token=' + token + '&verifier=' + verifier
            }).done(function (data) {
                $('#ServletResponse').append(JSON.stringify(data))
            });
        }
        ;
    });
</script>

