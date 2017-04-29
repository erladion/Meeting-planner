import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router'
import GoogleLogin from 'react-google-login';

function getIDToken(id_token){

    Meteor.call("addUser", id_token)
}


function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.

    var id_token = googleUser.getAuthResponse().id_token;
    getIDToken(id_token);

    browserHistory.push('/about');
}

export class SignIn extends React.Component{

    constructor(props){
        super(props);
    }

    render() {
        return (
            <div id="my-signin2"/>
        );
    }

  componentDidMount() {
     gapi.signin2.render('my-signin2', {
    'scope': 'https://www.googleapis.com/auth/plus.login',
    'width': 200,
    'height': 50,
    'longtitle': true,
    'theme': 'dark',
    'onsuccess': onSignIn
  });
  }


}

export class Signout extends React.Component {

    render(){
        return (
            <button onClick={this.signOut} className="w3-bar-item w3-button">Log out</button>
        )
    }

    signOut() {
        console.log("user signing out")
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
            browserHistory.push('/');
        });
    }
}


export var loginRedirect = function(){
    load_gapi(function(){
        var auth = gapi.auth2.getAuthInstance();
        if (auth.isSignedIn.get()){
            browserHistory.push('/about');
        }
    });
};

var load_gapi = function(doNext){
    if (gapi.auth2){
        doNext();
    }
    else{
        gapi.load('auth2', function(){
            gapi.auth2.init({
                client_id: '303238355416-evvupbj3fhekvsi1400ob29jfk93qgp9.apps.googleusercontent.com'
            })
            .then(doNext());
        });
    }
};

export var authenticate = function(){
    load_gapi(function(){
        var auth = gapi.auth2.getAuthInstance();
        if (!auth.isSignedIn.get()){
            browserHistory.push('/');
        }
    })
};
