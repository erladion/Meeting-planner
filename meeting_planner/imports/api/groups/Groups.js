import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema'

export const Groups = new Mongo.Collection('groups');
export const Events = new Mongo.Collection('events');

Groups.schema = new SimpleSchema({
    name: {type: String},
    creator: {type: String},
    members: [String],
    events: [String],
    description: {type: String, optional: true},
});

Events.schema = new SimpleSchema({
    name: {type: String},
    creator: {type: String},
    location: {type: String},
    startTime: {type: Date},
    endTime: {type: Date},
    description :{type: String, optional: true},
});

Meteor.methods({
    'groups.insert'(name, creator, description){
        // TODO
        // Check here in the user database if the creator email exists
        // Might also want some kind of security to validate that the user sending the email is the actual user
        var obj = {
            name: name,
            creator: creator,
            description: description
        };

        Groups.schema.validate(obj);

        Groups.insert(obj);
    },
    'groups.addMember'(groupID,creator, member){
        Groups.update(
            {_id: groupID, creator: creator},
            {
                $push: {members: member}
            }
        );
    },
    'groups.removeMember'(groupID, creator, member){
        Groups.update(
            {_id: groupID, creator: creator},
            {
                $pull: {members: member}
            }
        );
    },
    'groups.addEvent'(groupID, eventObj){
        Events.Insert(eventObj);
        var eventObj = Events.find().sort({$natural:-1}).limit(1).next();
        var eventObjID = eventObj._id;
        Groups.update(
            {_id: groupID},
            {
                $push: {events: eventObjID}
            }
        );
    },
    'groups.removeEvent'(groupID,remover, eventID){
        var eventToBeRemoved = Events.find({_id: eventID}).next();
        var eventCreator = eventToBeRemoved.creator;

        var group = Groups.find({_id:groupID}).next();
        var groupCreator = group.creator;

        if(remover == groupCreator || remover == eventCreator){
            Groups.update(
                {_id: groupID},
                {
                    $pull: {events: eventID}
                }
            );
            Events.remove({_id: eventID});
        }
    },
    'groups.changeEvent'(groupID, eventID, eventObj){
        var eventToBeChanged = Events.find({_id: eventID}).next();
        var eventCreator = eventToBeChanged.creator;

        var group = Groups.find({_id:groupID}).next();
        var groupCreator = group.creator;

        if(remover == groupCreator || remover == eventCreator){
            Events.update(
                {_id:eventID},
                eventObj
            );
        }
    },
    'groups.changeName'(groupID, creator, name){
        var group = Groups.find({_id:groupID}).next();
        var groupCreator = group.creator;

        if(creator == groupCreator){
            Groups.update(
                {_id:groupID},
                {
                    $set: {name: name}
                }
            );
        }
    },
    'groups.changeDescription'(groupID, description){
        var group = Groups.find({_id:groupID}).next();
        var groupCreator = group.creator;

        if(creator == groupCreator){
            Groups.update(
                {_id:groupID},
                {
                    $set: {description: description}
                }
            );
        }
    },
    'groups.removeGroup'(groupID, creator){
        var group = Groups.find({_id:groupID}).next();
        var groupCreator = group.creator;

        if(creator == groupCreator){
            Groups.remove({_id: groupID});
        }
    },
});
