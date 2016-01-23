<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>AmgTwitter</title>
        <script src="./js/hello.all.js"></script>
        <script src="./js/twitter.js"></script>
    </head>
    <body>
        <h1>Pagina 2</h1>
        <button onclick="hello('twitter').login()">twitter</button>
        <div id="result"></div>
        <script class="pre">
            function login(network) {
                // Twitter instance
                var twitter = hello(network);
                // Login
                twitter.login().then(function (r) {
                    // Get Profile
                    return twitter.api('me');},log)
                        .then(function (p) {
                            // Put in page
                            document.getElementById('login').innerHTML = "<img src='" + p.thumbnail + "' width=24/>Connected to " + network + " as " + p.name;
                        }, log);
            }
        </script>
        <script class="pre">
            hello.init(
                    {'twitter': 'nyFJnGU5NfN7MLuGufXhAcPTf'},
                    {redirect_uri: './redirect.html',
                     oauth_proxy: 'https://auth-server.herokuapp.com/proxy'});
        </script>
    </body>
</html>

