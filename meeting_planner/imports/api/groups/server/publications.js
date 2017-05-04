import { Groups } from '../Groups'
import { Users } from '../../users/Users'

Meteor.publish('groups', function() {
    var userId = this.userId;
    var groups = Meteor.users.find({_id: userId}, {groups: 1}).fetch()[0]['groups'];
    console.log(groups);
    if(groups == null){
        groups = [];
    }
    return Groups.find({_id: {$in: groups}});
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
