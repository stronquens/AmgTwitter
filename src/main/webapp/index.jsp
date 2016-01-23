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
                    .setOAuthConsumerSecret("QOofP3lOC7ytKutfoexCyh3zDVIFNHoMuuuKI98S78XmeGvqgW")
                    .setOAuthAccessToken("235606843-VD2uNU0Z8u6GoMBPCoLBus4QPn6GpvY6cgluQI4w")
                    .setOAuthAccessTokenSecret("ofPARUOgpqSOfqZboAyzytx9c1yOyk0CrlU0oUPA5txUR");
            TwitterFactory tf = new TwitterFactory(cb.build());
            Twitter twitter = tf.getInstance();


        %>
</html>


