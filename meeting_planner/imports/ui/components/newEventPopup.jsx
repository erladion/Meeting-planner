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
        this.state = {title:"", description:"", location: "", start:new Date(), end:new Date()};
    }

    setSlotInfo(slotInfo){
        this.setState({start:slotInfo.start, end:slotInfo.end});
        console.dir(this.state);
    }

    getTimeString(date){
        return ("0" + date.getHours()).slice(-2)   + ":" +
                ("0" + date.getMinutes()).slice(-2);
    }

    render(){
        //state = {title:this.state.title, description:this.state.description, location: this.state.location, start:this.props.slotInfo.start, end:this.props.slotInfo.end};
        //var info = this.props.slotInfo;
        var slotText = (<div/>);
        //console.dir(info);
        if (this.state.start){
            slotText = (
                <div>
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
                    <button onClick={this.createEvent}>Create Event</button>
                </div>
            );
        }
        return (
            <SkyLight ref="dialog">
                {slotText}
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
        var groupId = this.props.group ;
        var creatorId = Meteor.user().email;
        var eventObj = {
            title: this.state.title,
            creator: creatorId,
            location: this.state.location,
            start: this.state.start,
            end: this.state.end,
            description: this.state.description,
        };
        Meteor.call('groups.addEvent', groupId, eventObj);
        this.refs.dialog.hide();
        this.state = {title:"", description:"", location: "", start:new Date(), end:new Date()};
    }
}
