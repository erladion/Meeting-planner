import { Meteor } from 'meteor/meteor';
import userDB from '../imports/api/users/Users'
import groupDB from '../imports/api/groups/Groups'
import publications from '../imports/api/groups/server/publications'
import { Groups, Events } from '../imports/api/groups/Groups'

Meteor.startup(() => {
    /*
    var start = new Date(2017, 4, 17, 14, 0,0,0);
    var end = new Date(2017, 4, 17, 16, 0,0,0);
    var eventObj = {
        title: "test",
        creator: "johan.jansson94@gmail.com",
        location: "hej",
        start: start,
        end: end,
        description: "",
    };

    Meteor.call('groups.addEvent', "LiJCHdgw357sbMd8Z", eventObj);
    */
    //Meteor.call('groups.addEvent', )
    // code to run on server at startup
});
