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
            <div>
            <h1>{groupInfo.name}</h1>
            <h3>{groupInfo.description}</h3>

            </div>
        )
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
