import React from 'react';
import  SkyLight from 'react-skylight'
import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'
import moment from 'moment'

export class NewEventPopup extends React.Component{
    constructor(props){
        super(props);
        this.setName = this.setName.bind(this);
        this.setDescription = this.setDescription.bind(this);
        this.setLocation = this.setLocation.bind(this);
        this.updateTime = this.updateTime.bind(this);
        this.setSlotInfo = this.setSlotInfo.bind(this);
        this.createEvent = this.createEvent.bind(this);
        //console.dir(props);
        this.state = {title:"", description:"", location: "", start:new Date(), end:new Date(), mode:""};
    }

    setEventInfo(eventInfo, mode){
        this.setState(eventInfo);
        this.setState({mode: mode});
    }

    setSlotInfo(slotInfo){
        this.setState({start:slotInfo.start, end:slotInfo.end, mode:"create"});
        console.dir(this.state);
    }

    getTimeString(date){
        return ("0" + date.getHours()).slice(-2)   + ":" +
                ("0" + date.getMinutes()).slice(-2);
    }

    render(){
        //state = {title:this.state.title, description:this.state.description, location: this.state.location, start:this.props.slotInfo.start, end:this.props.slotInfo.end};
        //var info = this.props.slotInfo;
        var slotText = (<p/>);
        var editText = (<p/>);
        //console.dir(info);
        if (this.state.start){
            if (this.state.mode != "create"){
                slotText = (
                    <div>
                        <h3>{this.state.title}</h3>
                        Start of event:<br/>
                        {moment(this.state.start).format("YYYY-MM-DD hh:mm")}<br/>
                        End of event:<br/>
                        {moment(this.state.end).format("YYYY-MM-DD hh:mm")}<br/><br/>
                        {this.state.description}<br/>
                        Location: {this.state.location}
                    </div>
                );
            }
            if (this.state.mode != "view"){
                var createButton = (this.state.mode == "create" ? (<button onClick={this.createEvent}>Create Event</button>) : <button onClick={this.createEvent}>Edit Event</button>)
                var title = (this.state.mode == "create" ? (<h4>Create event</h4>) : (<h4>Edit event</h4>));
                editText = (
                    <div>
                        {title}
                        Start of event:<br/>
                        <DateField
                            defaultValue={this.state.start.getTime()}
                            dateFormat="YYYY-MM-DD"
                        />
                        <input defaultValue={this.getTimeString(this.state.start)} onChange={(evt) => this.updateTime(evt,'start')}/><br/>
                        End of event: <br/>
                        <DateField
                            defaultValue={this.state.end.getTime()}
                            dateFormat="YYYY-MM-DD"
                        />
                        <input defaultValue={this.getTimeString(this.state.end)} onChange={(evt) => this.updateTime(evt,'end')}/><br/>
                        Name:<br/>
                        <input type="text" value={this.state.title} onChange={this.setName}/><br/>
                        Location:<br/>
                        <input value={this.state.location} onChange={this.setLocation}/><br/>
                        Description:<br/>
                        <input value={this.state.description} onChange={this.setDescription}/><br/>
                        {createButton}
                    </div>
                );
            }
        }
        var dialogStyle = {
          height: '600px',
        };
        return (
            <SkyLight dialogStyles={dialogStyle} hideOnOverlayClicked ref="dialog">
                {slotText}
                {editText}
            </SkyLight>
        );
    }

    updateTime(evt,when){
        if (evt.target.value.indexOf(':') == -1) return;
        var timeString = evt.target.value.split(':');
        var hours = parseInt(timeString[0]);
        if (hours > 23) return;
        var minutes = parseInt(timeString[1]);
        if (minutes > 59) return;
        this.state[when].setHours(hours,minutes);
    }

    setName(evt){
        //console.log(evt.target.value);
        this.setState({title:evt.target.value});
        //console.log(this.state.title);
    }

    setLocation(evt){
        this.setState({location:evt.target.value});
    }

    setDescription(evt){
        this.setState({description:evt.target.value});
    }


    createEvent(){
        var groupId = this.props.group;
        if (groupId == "profile")
            groupId = "";
        var creatorId = Meteor.user().email;
        var eventObj = {
            title: this.state.title,
            creator: creatorId,
            location: this.state.location,
            start: this.state.start,
            end: this.state.end,
            description: this.state.description,
            groupId: groupId,
        };
        console.dir(eventObj);
        if (this.state.mode == "edit"){
            eventObj._id = this.state._id;
            if (groupId == ""){
                Meteor.call('users.changeEvent', eventObj);
            }
            else{
                Meteor.call('groups.changeEvent', groupId, eventObj);
            }
        }
        else if (this.state.mode == "create"){
            if (groupId == ""){
                Meteor.call('users.addEvent', eventObj);
            }
            else{
                Meteor.call('groups.addEvent', groupId, eventObj);
            }
        }
        this.refs.dialog.hide();
        this.state = {title:"", description:"", location: "", start:new Date(), end:new Date()};
    }


}
