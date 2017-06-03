import React from 'react';
import GoogleLogin from 'react-google-login';
import { Tracker } from 'meteor/tracker'
import { Calendar } from './calendar'

export class Profile extends React.Component{
    constructor(props){
        super(props);
        this.saveUsername = this.saveUsername.bind(this);
        this.changeUsername = this.changeUsername.bind(this);
        this.saveGroupname = this.saveGroupname.bind(this);
        this.addGroup = this.addGroup.bind(this);
        this.forceReRender = this.forceReRender.bind(this);
        this.state = {username: '', newGroupName: ''};
        this.forceReRender();
    }

    render(){
        var username = Meteor.user() ? (Meteor.user().username ? Meteor.user().username : Meteor.user().email) : "";
        var image = Meteor.user() ? Meteor.user().picture : "";
        return(
            <div style={{width:'50%'}} className="w3-border">
                <div className="w3-panel w3-border-bottom">
                    <img style={{float: "left"}} src={image} width="150px" className="w3-margin"/>
                    <h3 style={{float: "left"}} className="w3-margin">{username}</h3>
                </div>
                <div className="w3-panel w3-border-bottom">
                    <Calendar name="profile"/>
                </div>
                <div className="w3-panel w3-border w3-leftbar w3-border-blue w3-margin-left">
                    <h4>Change username</h4>
                    Current username: { username }
                    <input className="w3-input w3-border" type="text" value={this.state.username} onChange={this.saveUsername}></input>
                    <button className="w3-button w3-blue w3-margin-bottom" color="#2196F3" width="200" height="30" onClick={this.changeUsername}>Change username</button>
                </div>
                <div className="w3-panel w3-border w3-leftbar w3-border-blue w3-margin-left">
                    <h4>Create new group</h4>
                    <input className="w3-input w3-border" type="text" width="200" value={this.state.newGroupName} onChange={this.saveGroupname}></input>
                    <button className="w3-button w3-blue w3-margin-bottom" color="#2196F3" width="200" height="30" onClick={this.addGroup}>Create group</button>
                </div>
            </div>
        );
    }

    componentDidMount(){
        Tracker.autorun(() => {
            if (Meteor.user())
            this.setState(this.state);
        });
    }

    forceReRender(){
        Tracker.autorun(() => {
            var t = Session.get("profile");
            this.setState(this.state)
        });
    }

    addGroup(){
        Meteor.call("groups.insert", this.state.newGroupName);
        this.setState({newGroupName: ""});
    }

    saveUsername(evt){
        this.setState({username: evt.target.value});
    }

    saveGroupname(evt){
        this.setState({newGroupName: evt.target.value});
    }

    changeUsername(){
        var self = this;
        Meteor.call("users.changeUsername",this.state.username);
        this.setState({username: ""});
    }
}
