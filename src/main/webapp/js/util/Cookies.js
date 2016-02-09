
var Cookies = function () {
    return {
        crearCookie: function (key, value) {
            expires = new Date();
            expires.setTime(expires.getTime() + 86400000); // Un dia
            cookie = key + "=" + value + ";expires=" + expires.toUTCString();
            //console.log("crearCookie: " + cookie);
            return document.cookie = cookie;
        },
        leerCookie: function (key) {
            keyValue = document.cookie.match("(^|;) ?" + key + "=([^;]*)(;|$)");
            if (keyValue) {
                //console.log("getCookie: " + key + "=" + keyValue[2]);
                return keyValue[2];
            } else {
                console.log("getCookie: " + key + "=" + "null");
                return null;
            }
        },
        eliminarCookie: function (key) {
            //console.log("eliminarCookie: " + key);
            return document.cookie = key + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        }
    }
};
