import React from 'react';
import { ReactDOM } from 'react-dom';
import { IndexLink, Link, browserHistory } from 'react-router';
import { SignoutButton } from './loginButton'
import { Groups } from '../../api/groups/Groups'
import { Group } from './group'

export class Navigation extends React.Component{
    render(){
        var groupTabs = [];
        if (Meteor.user()){
            var groups = Groups.find({}).fetch();
            for (index in groups){
                var id = groups[index]._id;
                var name = groups[index].name;
                var idString = '/groups/' + id;
                groupTabs.push(<button className='w3-bar-item w3-button' onClick={(evt) => this.highlightSelectedTab(evt, idString)}>{name}</button>);
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
        browserHistory.push(url);
    }
}
