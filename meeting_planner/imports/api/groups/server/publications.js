import { Groups } from '../Groups'
import { Users } from '../../users/Users'

Meteor.publish('groups', function() {
    this.autorun(function(computation){
        console.log("groups sent to client");
        var user = Meteor.users.findOne(this.userId, {fields: {groups: 1}});
        var groups = [];
        if (user) {
            groups = user.groups;
        }
        return Groups.find({_id: {$in: groups}});
    });
});

Meteor.publish('users', function(){
    if(this.userId){
        var users = Meteor.users.find({_id: this.userId}, { groups: 1, services: 1 });
        return users;
    }
    else{
        this.ready();
    }
});
