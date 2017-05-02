import { Groups } from '../Groups'
import { Users } from '../../users/Users'

Meteor.publish('groups', function() {

    return Groups.find({});

  });
