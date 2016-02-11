/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.stronquens.amgtwitter;

import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.io.IOException;
import java.io.PrintWriter;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import twitter4j.AccountSettings;
import twitter4j.Paging;
import twitter4j.ResponseList;
import twitter4j.Twitter;
import twitter4j.TwitterException;
import twitter4j.TwitterFactory;
import twitter4j.conf.ConfigurationBuilder;

/**
 *
 * @author Armando
 */
public class ControllerTwitter extends HttpServlet {

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
            throws ServletException, IOException {
        response.setContentType("text/html;charset=UTF-8");
        try (PrintWriter out = response.getWriter()) {
            String op = request.getParameter("op");
            String accesToken = request.getParameter("token");
            String accesTokenSecret = request.getParameter("secret");

            String jsonResult = "";
            Twitter twitter = null;
            ConfigurationBuilder configBuilder = new ConfigurationBuilder();
            Gson gson = new GsonBuilder().setDateFormat("dd/MM/yyyy HH:mm:ss").create();
            // Se crea la instancia de twitter segun los parametros
            if (!"".equalsIgnoreCase(accesToken) && !"".equalsIgnoreCase(accesTokenSecret)) {
                try {
                    configBuilder.setDebugEnabled(true)
                            .setOAuthConsumerKey("nyFJnGU5NfN7MLuGufXhAcPTf")
                            .setOAuthConsumerSecret("QOofP3lOC7ytKutfoexCyh3zDVIFNHoMuuuKI98S78XmeGvqgW")
                            .setOAuthAccessToken(accesToken)
                            .setOAuthAccessTokenSecret(accesTokenSecret);
                    twitter = new TwitterFactory(configBuilder.build()).getInstance();
                } catch (Exception e) {
                    System.out.println(e);
                }
            } else {
                try {
                    configBuilder.setDebugEnabled(true)
                            .setOAuthConsumerKey("nyFJnGU5NfN7MLuGufXhAcPTf")
                            .setOAuthConsumerSecret("QOofP3lOC7ytKutfoexCyh3zDVIFNHoMuuuKI98S78XmeGvqgW");
                    twitter = new TwitterFactory(configBuilder.build()).getInstance();
                } catch (Exception e) {
                    System.out.println(e);
                }
            }
            // Se realizan las diferentes operaciones
            switch (op) {
                case "timeline":
                    try {
                        Paging pagina = new Paging();
                        pagina.setCount(50);
                        ResponseList listado = twitter.getHomeTimeline(pagina);
                        jsonResult = gson.toJson(listado);
                    } catch (TwitterException ex) {
                        System.out.println(ex);
                    }
                    break;
                case "usersettings":
                    try {
                        jsonResult = gson.toJson(twitter.showUser(twitter.getId()));
                    } catch (TwitterException ex) {
                        System.out.println(ex);
                    }
                    break;
                case "pruebas":
                    try {
                      jsonResult = gson.toJson(twitter.showUser(twitter.getId()));
                    } catch (TwitterException ex) {
                        System.out.println(ex);
                    }
                    break;
                default:
                    jsonResult = "{\"eror\":\"la operacion no existe\"}";
            }
            // Se devuelven los valores
            out.println(jsonResult);
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
        processRequest(request, response);
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
        processRequest(request, response);
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
