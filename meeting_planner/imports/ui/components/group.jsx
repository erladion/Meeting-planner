import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { browserHistory } from 'react-router'
import { Groups } from '../../api/groups/Groups'

export class Group extends React.Component{
    constructor(props){
        super(props);
        this.createEvent = this.createEvent.bind(this);
        this.saveMemberName = this.saveMemberName.bind(this);
        this.addMember = this.addMember.bind(this);
        this.state = {groupInfo: {}, newMemberName: ''};
    }

    render(){
        var groupInfo = Groups.findOne({_id:this.props.params.name});
        if (!groupInfo) groupInfo = {name:"",description:""};
        console.log(groupInfo);
        return(
            <div style={{width:'50%'}} className="w3-border">
                <div className="w3-panel w3-border-bottom">
                    <h3 className="w3-margin">{groupInfo.name}</h3>
                    <h4>{groupInfo.description}</h4>
                </div>
                <div className="w3-panel w3-border w3-leftbar w3-border-blue w3-margin-left">
                    <h4>Add member</h4>
                    <input className="w3-input w3-border" type="text" width="200" value={this.state.newMemberName} onChange={this.saveMemberName}></input>
                    <button className="w3-button w3-blue w3-margin-bottom" color="#2196F3" width="200" height="30" onClick={this.addMember}>Add </button>
                </div>
            </div>
        )
    }

    saveMemberName(evt){
        this.setState({newMemberName:evt.target.value});
    }

    addMember(){
        Meteor.call("groups.addMember", this.state.groupInfo._id, this.state.newMemberName);
        this.setState({newMemberName:""});
    }

    componentDidMount(){
        this.setState({groupInfo: Groups.findOne({_id:this.props.params.name})});
        Tracker.autorun(() => {
            if (Meteor.user())
            this.forceUpdate();
        });
    }

    createEvent(name, location, startTime, endTime, description){
        var groupId = this.state.groupInfo._id;
        var creatorId = Meteor.user().email;
        var eventOjb = {
            name: name,
            creator: creatorId,
            location: location,
            startTime: startTime,
            endTime: endTime,
            description: description || "",
        };
        Meteor.call('groups.addEvent', groupId, eventObj);
    }

    removeEvent(eventId){
        var groupId = this.state.groupInfo._id;
        Meteor.call('removeEvent', groupId, eventId);
    }
}
