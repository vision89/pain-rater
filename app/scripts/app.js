
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

    app.categoriesEmpty = true;
    app.peopleEmpty = true;
    app.ratingsEmpty = true;

    /**
     * Logout process
     * @return {[type]} [description]
     */
    function _logout () {

      app.selectedCategory = null;
      app.selectedPerson = null;
      app.notes = '';
      app.rating = 1;
      app.$.firebaseRatingId.disconnect();
      app.categoriesDisconnect = true;
      app.peopleDisconnect = true;
      app.categories = [];
      app.people = [];
      app.firebaseCategoriesUrl = '';
      app.firebasePeopleUrl = '';
      app.ratingsUrl = '';
      
    };

    /**
     * Set routes on login
     * @return {[type]} [description]
     */
    function _login () {

      app.firebaseCategoriesUrl = app.firebaseUrl + '/' + app.user.uid + '/categories';
      app.firebasePeopleUrl = app.firebaseUrl + '/' + app.user.uid + '/people';
      app.ratingsUrl = app.firebaseUrl + '/' + app.user.uid + '/ratings'

    };

    /**
     * States if categories collection is empty
     * @return {[type]} [description]
     */
    app.collectionIsEmpty = function ( e ) {

      app.categoriesEmpty = app.categories.length === 0;

    };

    /**
     * States if people collection is empty
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    app.peopleAreEmpty = function ( e ) {

      app.peopleEmpty = app.people.length === 0;

    };

    /**
     * States if the ratings collection is empty
     * @param  {[type]} e [description]
     * @return {[type]}   [description]
     */
    app.areRatingsEmpty = function ( e ) {

      app.ratingsEmpty = app.ratings.length === 0;

    };

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

      _logout();

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

    /**
     * Go to previous list
     * @return {[type]} [description]
     */
    app.goBack = function () {

      page.redirect( app.goBackRoute );

    };

    /**
     * Submit a rating
     * @return {[type]} [description]
     */
    app.rate = function () {

      this.$.firebaseRatingId.add({

          'category': this.selectedCategory.value,
          'person': this.selectedPerson.value,
          'notes': this.notes,
          'rating': this.rating,
          'timestamp': Date.now()

        });

        this.notes = '';
        this.rating = 1;

        document.querySelector( '#noteToast' ).show();

    };

    /**
     * Google Logged in
     * @return {[type]} [description]
     */
    app.googleLoggedIn = function () {

      page.redirect( '/' );
      app.loginType = 'google';
      _login();

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
      _login();

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
      _login();

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