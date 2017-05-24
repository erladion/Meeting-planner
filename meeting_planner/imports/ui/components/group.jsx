import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { browserHistory } from 'react-router'
import Select from 'react-select'
import { Groups } from '../../api/groups/Groups'
import { Calendar } from './calendar'
import BigCalendar from 'react-big-calendar'

export class Group extends React.Component{
    constructor(props){
        super(props);
        this.saveMemberName = this.saveMemberName.bind(this);
        this.addMember = this.addMember.bind(this);
        this.removeGroup = this.removeGroup.bind(this);
        this.removeMember = this.removeMember.bind(this);
        this.changeMemberToRemove = this.changeMemberToRemove.bind(this);
        this.saveGroupName = this.saveGroupName.bind(this);
        this.changeGroupName = this.changeGroupName.bind(this);
        this.saveGroupDescription = this.saveGroupDescription.bind(this);
        this.changeGroupDescription = this.changeGroupDescription.bind(this);
        this.leaveGroup = this.leaveGroup.bind(this);
        this.showBusyEvents = this.showBusyEvents.bind(this);
        this.state = {groupInfo: {name:"",description:"", members:[], creator:""}, newMemberName: '', removedMemberName:'',events:[]};
    }

    render(){
        var group = this.state.groupInfo;
        var memberList = [];
        for (var i = 0; i < group.members.length; i++) {;
            let member = group.members[i];
            memberList.push(<h6>{member}</h6>)
        }
        var creatorStuff = (<p></p>);
        if (Meteor.user() && Meteor.user().services.google.email == group.creator){
            var memberDropDown = [];
            for (var i = 1; i < group.members.length; i++) {
                memberDropDown.push({ value: group.members[i], label: group.members[i]});
            }
            creatorStuff = (
                <div style={{width:'50%'}} className="w3.panel w3-border-top">
                <h3>Admin Page</h3>
                    <div className="w3-panel w3-border w3-leftbar w3-border-blue w3-margin-left">
                        <h4>Add member</h4>
                        <input className="w3-input w3-border" type="text" width="200" value={this.state.newMemberName} onChange={this.saveMemberName}></input>
                        <button className="w3-button w3-blue w3-margin-bottom" color=" #2196F3" width="200" height="30" onClick={this.addMember}>Add member</button>
                    </div>
                    <div className="w3-panel w3-border w3-leftbar w3-border-blue w3-margin-left">
                        <h4>Remove  member</h4>
                        <Select options={memberDropDown} value={this.state.removedMemberName} placeholder='Select a member to remove' onChange={this.changeMemberToRemove} />
                        <button className="w3-button w3-blue w3-margin-bottom" color=" #2196F3" width="200" height="30" onClick={this.removeMember}>Remove this member</button>
                    </div>
                    <div className="w3-panel w3-border w3-leftbar w3-border-blue w3-margin-left">
                        <h4>Change group name</h4>
                        <input className="w3-input w3-border" type="text" width="200" onChange={this.saveGroupName}></input>
                        <button className="w3-button w3-blue w3-margin-bottom" color=" #2196F3" width="200" height="30" onClick={this.changeGroupName}>Change group name</button>
                    </div>
                    <div className="w3-panel w3-border w3-leftbar w3-border-blue w3-margin-left">
                        <h4>Change group description</h4>
                        <input className="w3-input w3-border" type="text" width="200" onChange={this.saveGroupDescription}></input>
                        <button className="w3-button w3-blue w3-margin-bottom" color=" #2196F3" width="200" height="30" onClick={this.changeGroupDescription}>Change group description</button>
                    </div>
                    <div className="w3-panel w3-border w3-leftbar w3-border-blue w3-margin-left">
                        <h4>Remove group</h4>
                        <button className="w3-button w3-blue w3-margin-bottom" color=" #2196F3" width="200" height="30" onClick={this.removeGroup}>Remove this group</button>
                    </div>
                </div>
            );
        }
        return(
            <div style={{width:'100%'}} className="w3-border">
                <div style={{width:'50%'}} className="w3-panel">
                    <h3 className="w3-margin">{group.name}</h3>
                    <h4>{group.description}</h4>
                    <h4>Members:</h4>
                    {memberList}
                    <div className="w3-panel w3-border w3-leftbar w3-border-blue w3-margin-left">
                        <h4>Leave group</h4>
                        <button className="w3-button w3-blue w3-margin-bottom" color=" #2196F3" width="200" height="30" onClick={this.leaveGroup}>Leave this group</button>
                    </div>
                </div>
                <input type="checkbox" onChange={this.showBusyEvents}/>Show busy times
                <Calendar events={this.state.events} name={group._id}/>
                { creatorStuff }
            </div>
        )
    }

    showBusyEvents(evt){
        var self = this;
        if(evt.target.checked){
            Meteor.call('events.getEventsForGroup', this.state.groupInfo._id, function(eve){
                self.setState({events: eve});
            });
        }
        else{
            this.setState({events: []});
        }
    }

    saveMemberName(evt){
        this.setState({newMemberName:evt.target.value});
    }

    changeMemberToRemove(member){
        if (member){
            this.setState({removedMemberName:member.value});
        }
        else {
            this.setState({removedMemberName:""});
        }
    }

    saveGroupName(evt){
        var gInfo = this.state.groupInfo;
        gInfo.name = evt.target.value;
        this.setState({groupInfo: gInfo});
    }

    changeGroupName(){
        Meteor.call("groups.changeName", this.state.groupInfo._id, this.state.groupInfo.name);
    }

    saveGroupDescription(evt){
        var gInfo = this.state.groupInfo;
        gInfo.description = evt.target.value;
        this.setState({groupInfo: gInfo});
    }

    changeGroupDescription(){
        Meteor.call("groups.changeDescription", this.state.groupInfo._id, this.state.groupInfo.description);
    }

    removeMember(){
        if (this.state.removedMemberName == "")
            return;
        Meteor.call("groups.removeMember", this.state.groupInfo._id, this.state.removedMemberName);
        this.setState({removedMemberName:""});
    }

    leaveGroup(){
        Meteor.call("groups.leaveGroup", this.state.groupInfo._id);
        browserHistory.push("/profile");
    }

    addMember(){
        Meteor.call("groups.addMember", this.state.groupInfo._id, this.state.newMemberName);
        this.setState({newMemberName:""});
    }

    removeGroup(){
        Meteor.call("groups.removeGroup", this.state.groupInfo._id);
        browserHistory.push("/profile");
    }

    componentDidMount(){
        Tracker.autorun(() => {
            // This console log is to make sure we rerun this code (and rerender the component) when we switch group tab
            console.log(Session.get('url'));
            var group = Groups.findOne({_id:this.props.params.name});
            if (group)
                this.setState({groupInfo: group});
        });
    }
}
