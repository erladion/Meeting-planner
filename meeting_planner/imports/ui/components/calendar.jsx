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
        if(this.props.name){
            var eventIdsToShow = Groups.findOne({_id: this.props.name}).events;
            eventsToShow = Events.find({_id: {$in: eventIdsToShow}}).fetch();
        }
        return(<div>
            <BigCalendar
                events = {eventsToShow}
                defaultView = 'week'
                selectable
                onSelectSlot={(slotInfo) => this.openDialog(slotInfo)}/>
            />
            <NewEventPopup ref="simpleDialog" group={this.props.name}/>
        </div>);
    }

    openDialog(slotInfo){
        this.setState({'slotInfo': slotInfo});
        console.log("hej");
        this.refs.simpleDialog.setSlotInfo(slotInfo);
        console.log("hej");
        this.refs.simpleDialog.refs.dialog.show()
    }
}
