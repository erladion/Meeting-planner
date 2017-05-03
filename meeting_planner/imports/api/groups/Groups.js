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
    'groups.insert'(name, description){
        var creator = Meteor.user().services.google.email;

        var obj = {
            name: name,
            creator: creator,
            description: description,
            members:[creator],
            events:[]
        };

        console.log("validating");
        Groups.schema.validate(obj);

        console.log("inserting");
        var id = Groups.insert(obj);
        console.log(id);
        Meteor.users.update({_id:Meteor.userId()}, {
            $push: {groups: id}
        });
        console.log("done inserting")
    },
    'groups.addMember'(groupID, member){
        var creator = Meteor.user().services.google.email;
        Groups.update(
            {_id: groupID, creator: creator},
            {
                $push: {members: member}
            }
        );
    },
    'groups.removeMember'(groupID, member){
        var creator = Meteor.user().services.google.email;
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
    'groups.removeEvent'(groupID, eventID){
        var remover = Meteor.user().services.google.email;
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
    'groups.changeName'(groupID, name){
        var creator = Meteor.user().services.google.email;
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
        var creator = Meteor.user().services.google.email;
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
    'groups.removeGroup'(groupID){
        var creator = Meteor.user().services.google.email;
        var group = Groups.find({_id:groupID}).next();
        var groupCreator = group.creator;

        if(creator == groupCreator){
            Groups.remove({_id: groupID});
        }
    },
});
