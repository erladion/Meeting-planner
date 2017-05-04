import { Meteor } from 'meteor/meteor';
import userDB from '../imports/api/users/Users'
import groupDB from '../imports/api/groups/Groups'
import publications from '../imports/api/groups/server/publications'


Meteor.startup(() => {
  // code to run on server at startup
});
