import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Groups } from '../../api/groups/Groups'
import BigCalendar from 'react-big-calendar'

export class Calendar extends React.Component{
    constructor(props){
        super(props);
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
            />
        </div>);
    }
}
