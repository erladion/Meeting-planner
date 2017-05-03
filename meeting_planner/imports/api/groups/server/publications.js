import { Groups } from '../Groups'
import { Users } from '../../users/Users'

Meteor.publish('groups', function() {
    var userId = this.userId();
    var groups = Meteor.users.find({_id: userId}, {groups: 1}).next()['groups'];
    if(groups == null){
        groups = [];
    }
    return Groups.find({_id: {$in: groups}});
});
