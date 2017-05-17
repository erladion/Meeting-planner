import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { browserHistory } from 'react-router'
import groupDB from '../../api/groups/Groups'

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
                Meteor.call('users.updateInfo');
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
    // If we are not logged in, go to login page instead
    if (Meteor.userId() == null){
        browserHistory.push('/');
    }
}

export function loginRedirect(){
    // If we entered the login page but were already logged in, go to profile page
    if (Meteor.userId()){
        browserHistory.push('/profile');
    }
}
