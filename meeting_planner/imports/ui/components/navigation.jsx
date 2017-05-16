import React from 'react';
import { ReactDOM } from 'react-dom';
import { IndexLink, Link, browserHistory } from 'react-router';
import { SignoutButton } from './loginButton'
import { Groups } from '../../api/groups/Groups'
import { Group } from './group'

export class Navigation extends React.Component{

    constructor(props){
        super(props);
    }

    render(){
        var groupTabs = [];
        if (Meteor.user()){
            var groups = Groups.find({}).fetch();
            for (index in groups){
                let id = groups[index]._id;
                let name = groups[index].name;
                let idString = '/groups/' + id;
                let selectedClass = (browserHistory.getCurrentLocation().pathname == idString ? ' w3-red' : '')
                groupTabs.push(<button className={'w3-bar-item w3-button' + selectedClass} onClick={(evt) => this.changeTab(evt, idString)}>{name}</button>);
            }
        }
        var profileSelected = (browserHistory.getCurrentLocation().pathname == '/profile' ? ' w3-red' : '')
        return (
            <div className="w3-bar w3-black">
                <button className={"w3-bar-item w3-button" + profileSelected} id='/profile' onClick={(evt) => this.changeTab(evt, "/profile")}>Profile</button>
                {groupTabs}
                <SignoutButton />
             </div>
        )
    }

    componentDidMount(){
        Tracker.autorun(() => {
            if (Groups.find({}).fetch() || Session.get('url')){
                this.forceUpdate();
            }
        });
    }

    changeTab(evt,url){
        browserHistory.push(url);
    }
}
