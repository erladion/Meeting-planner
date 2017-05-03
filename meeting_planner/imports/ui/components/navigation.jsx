import React from 'react';
import { ReactDOM } from 'react-dom';
import { IndexLink, Link, browserHistory } from 'react-router';
import { SignoutButton } from './loginButton'

export class Navigation extends React.Component{
    render(){
        return (
            <div className="w3-bar w3-black">
                <button className="w3-bar-item w3-button" onClick={(evt) => this.highlightSelectedTab(evt, "/profile")}>Profile</button>
                <button className="w3-bar-item w3-button" onClick={(evt) => this.highlightSelectedTab(evt, "/about")}>About</button>
                <SignoutButton className="tablink"/>
             </div>
        )
    }

    highlightSelectedTab(evt, url){
        tablinks = evt.currentTarget.parentNode.childNodes;
        for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" w3-red", "");
        }
        evt.currentTarget.className += " w3-red";
        console.log(evt.currentTarget.className);
        browserHistory.push(url);
    }
}
