import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'

export const Users = new Mongo.Collection('users');

Users.schema = new SimpleSchema({
    email: {type: String},
    userID: {type: String},
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
    'users.remove'(email, userID){
        var user = Users.find({email:email}).next();
        var userid = user.userID;

        if(userid == userID){
            Users.remove({userID:userID});
        }

    },
    'users.changeUsername'(username, userID){
        var userObj = {
            username: username,
        };

        console.log(username);

        var userToUpdate = Users.Update({userID:userID}, userObj);
        console.log("successfully updated username");
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
