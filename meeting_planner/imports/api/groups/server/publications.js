import { Groups, Events } from '../Groups'
import { Users } from '../../users/Users'

Meteor.publish('groups', function() {
    this.autorun(function(computation){
        console.log("groups sent to client");
        var user = Meteor.users.findOne(this.userId, {fields: {groups: 1}});
        var groups = [];
        if (user && user.groups) {
            groups = user.groups;
        }
        return Groups.find({_id: {$in: groups}});
    });
});

Meteor.publish('users', function(){
    if(this.userId){
        var users = Meteor.users.find({_id: this.userId}, { groups: 1, email: 1, picture: 1 });
        return users;
    }
    else{
        this.ready();
    }
});

Meteor.publish('events', function(){
    this.autorun(function(computation){
        // Find the user with the given userId and return only the groups field from that user
        var user = Meteor.users.findOne({_id: this.userId}, {fields: {groups: 1}});
        var eventIds = [];
        if(user && user.groups){
            // Same as above, we return only events list from a given group
            // In this case the groups is a list, so we will return all events from all the groups
            eventIds = Groups.find({_id: {$in: user.groups}}, {events: 1}).fetch();
            var new_arr = eventIds.map(function(group){
                return group.events;
            });

            var array_done = [].concat.apply([], new_arr);
            eventIds = array_done;
        }

        // Return a cursor to the result from the query, use .fetch() on the return value to get an array.
        //return eventIds;
        return Events.find({_id: {$in: eventIds}});
    });
});
