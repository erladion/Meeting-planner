import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Groups } from '../../api/groups/Groups'
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
            console.log(this.props.name);
            eventsToShow = Groups.findOne({_id: this.props.name}).events;
        }
        return(<div>
            <BigCalendar
                events = {eventsToShow}
                defaultView = 'week'
                selectable
                onSelectSlot={(slotInfo) => this.openDialog(slotInfo)}/>
            />
            <NewEventPopup ref="simpleDialog" slotInfo={this.state.slotInfo}/>
        </div>);
    }

    openDialog(slotInfo){
        this.setState({'slotInfo': slotInfo});
        this.refs.simpleDialog.refs.dialog.show()
    }
}
