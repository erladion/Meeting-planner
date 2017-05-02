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
                browserHistory.push('/about');
            }
        });
    }
}
