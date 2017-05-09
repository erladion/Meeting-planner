import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'

export const Users = Meteor.users;

Users.schema = new SimpleSchema({
    email: {type: String},
    userID: {type: String},
    username: {type: String, optional: true},
    groups: [String],
});

Meteor.methods({
    'users.add'(){
        var obj = {
            email: email,
            userID: userID,
            username: username,
        };
        console.log("in users.add");
        var user = users.find({userID:userID}).limit(1);
        console.log("user to add " + user);
        // Check if there already exists a user in the database with given userID
        // If there doesn't we add a new user, else do nothing
        if(!user.hasNext()){
            console.log("user does not exist already");
            Users.schema.validate(obj);
            Users.insert(obj);
        }
    },
    'users.updateInfo'(){
        var email = Meteor.users.services.google.email;
        var picture = Meteor.users.services.google.picture;
        var userObj = {
            email: email,
            picture: picture
        };

        Users.update({_id:Meteor.userId()}, {$set: userObj});
    },
    'users.remove'(){
        var groupsToUpdate = Meteor.user().groups;
        Meteor.groups.update({_id: {$in: groupsToUpdate}},
        {
            $pull: {members: Meteor.userId()}
        });
        Users.remove({_id:Meteor.userId()});
    },
    'users.changeUsername'(username){
        var userObj = {
            username: username,
        };

        console.log(username);

        var userToUpdate = Users.update({_id:Meteor.userId()}, {$set: userObj});
        console.log("successfully updated username");
    },
});
