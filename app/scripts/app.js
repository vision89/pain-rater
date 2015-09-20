/*
Copyright (c) 2015 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/

(function(document) {
  'use strict';

  // Grab a reference to our auto-binding template
  // and give it some initial binding values
  // Learn more about auto-binding templates at http://goo.gl/Dx1u2g
  var app = document.querySelector('#app');

  // See https://github.com/Polymer/polymer/issues/1381
  window.addEventListener('WebComponentsReady', function() {
    // imports are loaded and elements have been registered
    
    /**
     * login button clicked
     * @return {[type]} [description]
     */
    app.loginClicked = function () {

      //Login page
      page.redirect( '/login' );

    };

    /**
     * logout button clicked
     * @return {[type]} [description]
     */
    app.logoutClicked = function () {

      switch ( app.loginType ) {

        case 'facebook':

          //Trigger the auto logout process
          app.facebookAutoLogin = true;
          break;
        case 'google':

          //Trigger the auto logout process
          app.googleAutoLogin = true;
          break;
        case 'twitter':

          //Trigger the auto logout process
          app.twitterAutoLogin = true;
          break;    

      }

    };

    app.goBack = function () {

      page.redirect( app.goBackRoute );

    };

    /**
     * Google Logged in
     * @return {[type]} [description]
     */
    app.googleLoggedIn = function () {

      page.redirect( '/' );
      app.loginType = 'google';

    };

    /**
     * Google Logged out
     * @return {[type]} [description]
     */
    app.googleLoggedOut = function () {

      page.redirect( '/' );
      app.loginType = undefined;

    };

    /**
     * Facebook Logged in
     * @return {[type]} [description]
     */
    app.facebookLoggedIn = function () {

      page.redirect( '/' );
      app.loginType = 'facebook';

    };

    /**
     * Facebook Logged out
     * @return {[type]} [description]
     */
    app.facebookLoggedOut = function () {

      page.redirect( '/' );
      app.loginType = undefined;

    };

    /**
     * Twitter Logged in
     * @return {[type]} [description]
     */
    app.twitterLoggedIn = function () {

      page.redirect( '/' );
      app.loginType = 'twitter';

    };

    /**
     * Twitter Logged out
     * @return {[type]} [description]
     */
    app.twitterLoggedOut = function () {

      page.redirect( '/' );
      app.loginType = undefined;

    };

  });

})(document);
