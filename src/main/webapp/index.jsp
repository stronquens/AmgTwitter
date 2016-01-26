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
        <link rel="stylesheet" type="text/css" href="/AmgTwitter/css/login.css">
        <link href='https://fonts.googleapis.com/css?family=Playfair+Display:700' rel='stylesheet' type='text/css'>
    </head>
    <body>
        <div class="marco">
            <h1><span>AMG</span> Twitter</h1>
            <p>Conéctate con tus amigos y otras personas fascinantes. 
               Obtén actualizaciones instantáneas de las cosas que te interesan. 
               Mira los eventos que se están desarrollando, en tiempo real, desde 
               todos los ángulos.
            </p>
            <div id="accion"></div>
        </div>
        <p id="resultado"></p>
    </body>
    <script src="./js/jquery-2.2.0.min.js"></script>
    <script type="text/javascript" src="/AmgTwitter/js/login.js"></script>
</html>

