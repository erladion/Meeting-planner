import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { browserHistory } from 'react-router'
import groupDB from '../../api/groups/Groups'
//import btn from './button'


export class LoginButton extends React.Component{

    render(){
        return(
            <img ref="login" src="btn_normal.png" style={{cursor:'pointer'}}onMouseEnter={this.hover} onMouseLeave={this.unHover} onMouseDown={this.mouseDown} onClick={ this.login }/>
            //<button onClick={ this.login }>Log in with Google</button>
            //<button src="button.png" onClick={ this.login }></button>
        );
    }

    // Functions that change what image to show when the user hovers over the button and clicks on it.
    hover(evt){
        evt.target.setAttribute('src', 'btn_focus.png');
    }

    unHover(evt){
        evt.target.setAttribute('src', 'btn_normal.png');
    }

    mouseDown(evt){
        evt.target.setAttribute('src', 'btn_pressed.png');
    }

    login(){

        Meteor.loginWithGoogle({
            requestPermissions: ['profile', 'email']
        }, (err) => {
            if (err) {
                // handle error
            } else {
                Meteor.call('users.updateInfo');
                if (Session.get('beforeLogin'))
                    browserHistory.push(Session.get('beforeLogin'));
                else{
                    browserHistory.push('/profile');
                }
                Session.set('beforeLogin', "");
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
        // Remember where we were
        Session.set('beforeLogin', browserHistory.getCurrentLocation().pathname);
        browserHistory.push('/');
    }
}

export function loginRedirect(){
    // If we entered the login page but were already logged in, go to profile page
    if (Meteor.userId()){
        browserHistory.push('/profile');
    }
}
