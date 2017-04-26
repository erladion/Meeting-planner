import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import GoogleLogin from 'react-google-login';

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

export class SignIn extends React.Component{

    render() {
        return (
            <div id="my-signin2"/>
        );
    }

    renderGoogleLoginButton() {
    console.log('rendering google signin button')
    gapi.signin2.render('my-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 200,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSignIn
    });
  }

  componentDidMount() {
    window.addEventListener('google-loaded',this.renderGoogleLoginButton);
  }


}

export class Signout extends React.Component {

    render(){
        return (
            <button onClick={this.signOut}>Log out</button>
        )
    }

    signOut() {
        console.log("user signing out")
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
}
