/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.stronquens.amgtwitter;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.auth.AccessToken;
import twitter4j.auth.RequestToken;
import twitter4j.conf.ConfigurationBuilder;

/**
 *
 * @author Armando
 */
public class ControllerOAuth extends HttpServlet {

    /**
     * Processes requests for both HTTP <code>GET</code> and <code>POST</code>
     * methods.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    protected void processRequest(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException, TwitterException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {           
            // Parametros del request
            HttpSession sesion = request.getSession();
            String verifier = request.getParameter("verifier");
            String op = request.getParameter("op");
            
            // Definimos variables
            RequestToken requestToken = null;
            AccessToken accessToken = null;
            Twitter OAuthTwitter = null;
            String url = null;
            
            // Devolemos la url generada          
            if ((verifier == null || verifier == "") && "url".equalsIgnoreCase(op)) {
                ConfigurationBuilder configBuilder = new ConfigurationBuilder();
                configBuilder.setDebugEnabled(true)
                        .setOAuthConsumerKey("nyFJnGU5NfN7MLuGufXhAcPTf")
                        .setOAuthConsumerSecret("QOofP3lOC7ytKutfoexCyh3zDVIFNHoMuuuKI98S78XmeGvqgW");
                OAuthTwitter = new TwitterFactory(configBuilder.build()).getInstance();
                sesion.setAttribute("twitter", OAuthTwitter);
                try {
                    requestToken = OAuthTwitter.getOAuthRequestToken();
                    sesion.setAttribute("requestToken", requestToken);
                    url = requestToken.getAuthenticationURL();
                    out.println("{\"url\":\""+url+"\"}");
                } catch (TwitterException ex) {
                }
            }
            
            // Devolvemos el acces token generado
            if (verifier != null && verifier.length() > 0) {
                OAuthTwitter = (Twitter) sesion.getAttribute("twitter");
                requestToken = (RequestToken) sesion.getAttribute("requestToken");
                accessToken = OAuthTwitter.getOAuthAccessToken(requestToken, verifier);
                sesion.setAttribute("accesToken", accessToken);
                sesion.removeAttribute("twitter");
                sesion.removeAttribute("requestToken");            
                out.println("{\"token\":\""+ accessToken.getToken() +"\",\"secret\":\""+accessToken.getTokenSecret()+"\"}");
            }

        }
    }

    // <editor-fold defaultstate="collapsed" desc="HttpServlet methods. Click on the + sign on the left to edit the code.">
    /**
     * Handles the HTTP <code>GET</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (TwitterException ex) {
            Logger.getLogger(ControllerOAuth.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Handles the HTTP <code>POST</code> method.
     *
     * @param request servlet request
     * @param response servlet response
     * @throws ServletException if a servlet-specific error occurs
     * @throws IOException if an I/O error occurs
     */
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        try {
            processRequest(request, response);
        } catch (TwitterException ex) {
            Logger.getLogger(ControllerOAuth.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    /**
     * Returns a short description of the servlet.
     *
     * @return a String containing servlet description
     */
    @Override
    public String getServletInfo() {
        return "Short description";
    }// </editor-fold>

}
