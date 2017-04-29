import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'

export const Users = new Mongo.Collection('users');

Users.schema = new SimpleSchema({
    email: {type: String},
    userID: {type: String},
    username: {type: String, optional: true},
});

Meteor.methods({
    'users.add'(email, userID, username){
        console.log("adding");
        // TODO
        // Check here in the user database if the creator email exists
        // Might also want some kind of security to validate that the user sending the email is the actual user
        var obj = {
            email: email,
            userID: userID,
            username: username,
        };

        console.log(obj);

        Users.schema.validate(obj);
        console.log("validated");
        Users.insert(obj);
        console.log("added");
    },
    'users.remove'(email, userID){
        var user = Users.find({email:email}).next();
        var userid = user.userID;

        if(userid == userID){
            Users.remove({userID:userID});
        }

    },
    'users.changeUserName'(username, userID){
        var userObj = {
            username: username,
        };

        var userToUpdate = Users.Update({userID:userID}, userObj);
    },
});
