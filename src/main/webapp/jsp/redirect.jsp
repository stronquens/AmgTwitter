<%-- 
    Document   : redirect
    Created on : 24-ene-2016, 16:45:39
    Author     : Armando
--%>

<%@page import="com.stronquens.amgtwitter.Autentication"%>
<%@page import="com.stronquens.bean.AutenticationBean"%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>Redirect</title>
    </head>
    <body>
        <%
            HttpSession sesion = request.getSession();
            Autentication aut = new Autentication();
            AutenticationBean autBean = (AutenticationBean) sesion.getAttribute("autentication");
                           
            autBean.setOauth_token(request.getParameter("oauth_token"));
            autBean.setOauth_verifier(request.getParameter("oauth_verifier"));
            
            autBean = aut.getAccesToken(autBean);
            sesion.setAttribute("autentication", autBean);
                       
        %>
        <h1>Redirigiendo...</h1>
        
        <p>Oauth_token: <%= autBean.getOauth_token() %></p>
        <p>Oauth_verifier: <%= autBean.getOauth_verifier() %></p>
        <p>Acces_Token: <%= autBean.getAccessToken().getToken() %></p>
        <p>Acces_Token_Secret: <%= autBean.getAccessToken().getTokenSecret() %></p>
    </body>
</html>
