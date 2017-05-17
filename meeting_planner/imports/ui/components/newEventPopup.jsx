import React from 'react';
import  SkyLight from 'react-skylight'
import { DateField } from 'react-date-picker'
import 'react-date-picker/index.css'

export class NewEventPopup extends React.Component{
    constructor(props){
        super(props);
        this.state = {eventInfo: {}};
    }

    getTimeString(date){
        return ("0" + date.getHours()).slice(-2)   + ":" +
                ("0" + date.getMinutes()).slice(-2);
    }

    render(){
        var info = this.props.slotInfo;
        var slotText = (<div/>);
        //console.dir(info);
        if (info.start){
            slotText = (
                <div>
                    Start of event:<br/>
                    <DateField
                        defaultValue={info.start.getTime()}
                        dateFormat="YYYY-MM-DD"
                    />
                    <input defaultValue={this.getTimeString(info.start)}/><br/>
                    End of event: <br/>
                    <DateField
                        defaultValue={info.end.getTime()}
                        dateFormat="YYYY-MM-DD"
                    />
                    <input defaultValue={this.getTimeString(info.end)}/><br/>
                    Name:<br/>
                    <input/><br/>
                    Location:<br/>
                    <input/><br/>
                    Description:<br/>
                    <input/><br/>
                </div>
            );
        }
        return (
            <SkyLight ref="dialog">
                {slotText}
            </SkyLight>
        );
    }

    setName(evt){
        this.setState({title:evt.target.value});
    }

    setLocation(evt){
        this.setState({location:evt.target.value});
    }

    setDescription(evt){
        this.setState({description:evt.target.value});
    }


    createEvent(name, location, startTime, endTime, description){
        var groupId = this.state.groupInfo._id;
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
    }
}
