import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { browserHistory } from 'react-router'

export class LoginButton extends React.Component{

    render(){
        return(
            <button onClick={ this.login }>Log in with Google</button>
        );
    }

    login(){
        Meteor.loginWithGoogle({
            requestPermissions: ['profile', 'email']
        }, (err) => {
            if (err) {
                // handle error
            } else {
                browserHistory.push('/profile');
            }
        });
    }
}


export class SignoutButton extends React.Component {

    render(){
        return (
            <button onClick={this.logout} className="w3-bar-item w3-button  w3-right">Log out</button>
        )
    }

    logout() {
        Meteor.logout(function(){
            browserHistory.push('/');
        });
    }
}

export function authenticate(){
    if (Meteor.userId() == null){
        browserHistory.push('/');
    }
}

export function loginRedirect(){
    if (Meteor.userId()){
        browserHistory.push('/profile');
    }
}
