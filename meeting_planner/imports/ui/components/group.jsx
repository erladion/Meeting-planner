import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { browserHistory } from 'react-router'
import { Groups } from '../../api/groups/Groups'

export class Group extends React.Component{
    render(){
        var groupInfo = Groups.find({_id:this.props.name}).next();
        return(
            <div>
            <h1>{groupInfo.name}</h1>
            <h3>{groupInfo.description}</h3>

            </div>
        )
    }




}
