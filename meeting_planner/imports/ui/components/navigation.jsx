import React from 'react';
import { ReactDOM } from 'react-dom';
import { IndexLink, Link, browserHistory } from 'react-router';
import { SignoutButton } from './loginButton'
import { Groups } from '../../api/groups/Groups'
import { Group } from './group'

export class Navigation extends React.Component{
    render(){
        var groupTabs = [];
        var id = 4;
        var idString = '/groups/FutAYWE7p2SH4iFNQ';
        groupTabs.push(<button className='w3-bar-item w3-button' onClick={(evt) => this.highlightSelectedTab(evt, idString)}>{idString}</button>);
        if (Meteor.user()){
            console.log("groups: " + Meteor.user().groups);
            for (index in Meteor.user().groups){
                var id = Meteor.user().groups[index];
                console.log(id);
                groupTabs.push(<button className='w3-bar-item w3-button' onClick={(evt) => this.highlightSelectedTab(evt, '/groups/{id}')}>{id}</button>);
            }
        }
        return (
            <div className="w3-bar w3-black">
                <button className="w3-bar-item w3-button" onClick={(evt) => this.highlightSelectedTab(evt, "/profile")}>Profile</button>
                <button className="w3-bar-item w3-button" onClick={(evt) => this.highlightSelectedTab(evt, "/about")}>About</button>
                {groupTabs}
                <SignoutButton />
             </div>
        )
    }

    componentDidMount(){
        Tracker.autorun(() => {
            if (Meteor.user())
            this.forceUpdate();
        });
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
