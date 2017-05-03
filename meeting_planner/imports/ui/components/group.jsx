import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { browserHistory } from 'react-router'
import { Groups } from '../../api/groups/Groups'

export class Group extends React.Component{
    render(){
        var groupInfo = Groups.findOne({_id:this.props.params.name});
        if (!groupInfo) groupInfo = {name:"",description:""};
        return(
            <div>
            <h1>{groupInfo.name}</h1>
            <h3>{groupInfo.description}</h3>

            </div>
        )
    }

    componentDidMount(){
        Tracker.autorun(() => {
            if (Meteor.user())
            this.forceUpdate();
        });
    }

}
