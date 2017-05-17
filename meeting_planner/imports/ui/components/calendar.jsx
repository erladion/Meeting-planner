import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Groups, Events } from '../../api/groups/Groups'
import BigCalendar from 'react-big-calendar'

export class Calendar extends React.Component{
    constructor(props){
        super(props);
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
            />
        </div>);
    }
}
