import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'

export const Users = new Mongo.Collection('users');

Users.schema = new SimpleSchema({
    email: {type: String, unique: true},
    userID: {type: String, unique: true},
    username: {type: String, optional: true},
    groups: [String],
});

Meteor.methods({
    'users.add'(email, userID, username){
        var obj = {
            email: email,
            userID: userID,
            username: username,
        };

        var user = users.find({userID:userID});
        // Check if there already exists a user in the database with given userID
        // If there doesn't we add a new user, else do nothing
        if(!user.hasNext()){
            Users.schema.validate(obj);
            Users.insert(obj);
        }
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
    'users.addGroup'(groupID,userID){
        users.update(
            {userID: userID},
            {
                $push: {groups: groupID}
            }
        );
    },
});
