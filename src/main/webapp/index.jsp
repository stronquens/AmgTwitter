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
    <script type="text/javascript" src="/AmgTwitter/js/login.js"></script>
</html>

