/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.stronquens.amgtwitter;

import com.stronquens.bean.AutenticationBean;
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
public class Autentication {

    private ConfigurationBuilder cb = null;
    private Twitter OAuthTwitter = null;

    private String consumer_key = "nyFJnGU5NfN7MLuGufXhAcPTf";
    private String consumer_secret = "QOofP3lOC7ytKutfoexCyh3zDVIFNHoMuuuKI98S78XmeGvqgW";

    public Autentication() {
        cb = new ConfigurationBuilder();
        cb.setDebugEnabled(true)
                .setOAuthConsumerKey(consumer_key)
                .setOAuthConsumerSecret(consumer_secret);
        OAuthTwitter = new TwitterFactory(cb.build()).getInstance();
    }

    public AutenticationBean getRequestToken(AutenticationBean autBean) throws TwitterException {
        RequestToken requestToken = OAuthTwitter.getOAuthRequestToken();
        autBean.setRequest_token(requestToken);
        autBean.setUrl(requestToken.getAuthorizationURL());
        return autBean;
    }

    public AccessToken getAccesToken(RequestToken request_token, String pin) throws TwitterException {
        AccessToken accessToken = OAuthTwitter.getOAuthAccessToken(request_token, pin);
        return accessToken;
    }
}
