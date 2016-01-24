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
            ConfigurationBuilder cb = new ConfigurationBuilder();
            cb.setDebugEnabled(true)
                    .setOAuthConsumerKey("nyFJnGU5NfN7MLuGufXhAcPTf")
                    .setOAuthConsumerSecret("QOofP3lOC7ytKutfoexCyh3zDVIFNHoMuuuKI98S78XmeGvqgW");
            Twitter OAuthTwitter = new TwitterFactory(cb.build()).getInstance();

            RequestToken requestToken = null;
            AccessToken accessToken = null;
            String url = null;

            requestToken = OAuthTwitter.getOAuthRequestToken();
            %><p>Request Tokens obtenidos con éxito</p><%
            %>
            <p>Request Token: <%= requestToken.getToken() %>
            <%
            %>
            <p>Request Token secret: <%= requestToken.getTokenSecret()%>  
            <%
            /*
                Creamos la url para hacer el login y despues nos redirigira al otro jsp
            */
            url = requestToken.getAuthorizationURL();
            %><p>URL: <%= url %> </p></br>
            <a href="<%= url %>" target="popup" onClick="window.open(this.href, this.target, 'width=350,height=420'); return false;">
                <img src="./img/sign-in-with-twitter-gray.png"></img>
            </a>
            <%
                
        %>
</html>


