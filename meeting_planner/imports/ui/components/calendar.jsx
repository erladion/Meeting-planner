import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Groups, Events } from '../../api/groups/Groups'
import BigCalendar from 'react-big-calendar'
import { NewEventPopup } from './newEventPopup'

export class Calendar extends React.Component{
    constructor(props){
        super(props);
        this.state = {'slotInfo': {}};
        this.openDialog = this.openDialog.bind(this);
    }

    render(){
        var eventsToShow = [];
        if(this.props.name == "profile"){
            
        }
        else if(this.props.name){
            var eventIdsToShow = Groups.findOne({_id: this.props.name}).events;
            eventsToShow = Events.find({_id: {$in: eventIdsToShow}}).fetch();
        }
        return(<div>
            <BigCalendar
                events = {eventsToShow}
                defaultView = 'week'
                selectable
                onSelectSlot={(slotInfo) => this.openDialog(slotInfo)}
                onSelectEvent={(eventInfo) => this.openEvent(eventInfo)}/>
            <NewEventPopup ref="simpleDialog" group={this.props.name}/>
        </div>);
    }

    openEvent(eventInfo){
        var group_owner = Groups.findOne({_id: this.props.name}).creator;
        var mode = (eventInfo.creator == Meteor.user().email || group_owner == Meteor.user().email) ? "edit" : "view";
        this.refs.simpleDialog.setEventInfo(eventInfo, mode);
        if (mode == "view") this.refs.simpleDialog.refs.dialog.dialogStyles = {height: "300px"};
        else this.refs.simpleDialog.refs.dialog.dialogStyles = {height: "600px"};
        this.refs.simpleDialog.refs.dialog.show()
    }

    openDialog(slotInfo){
        this.setState({'slotInfo': slotInfo});
        console.log("hej");
        this.refs.simpleDialog.setSlotInfo(slotInfo);
        this.refs.simpleDialog.refs.dialog.dialogStyles = {height: "300px"};
        console.log("hej");
        this.refs.simpleDialog.refs.dialog.show()
    }
}
