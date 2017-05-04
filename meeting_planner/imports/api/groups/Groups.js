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
        var user = Meteor.users.findOne({email: member});
        if(user){
            Groups.update(
                {_id: groupID, creator: creator},
                {
                    $push: {members: member}
                }
            );
            return {successful: true, message: "Member was successfully added"};
        }
        return {successful: false, message: "Member does not exist"};
    },
    'groups.removeMember'(groupID, member){
        var creator = Meteor.user().services.google.email;
        var user = Meteor.users.findOne({email: member});
        if(user){
            Groups.update(
                {_id: groupID, creator: creator},
                {
                    $pull: {members: member}
                }
            );
            return {successful: true, message: "Member successfully removed"};
        }
        return {successful: false, message: "Member does not exist"};
    },
    'groups.addEvent'(groupID, eventObj){
        var eventObjID = Events.Insert(eventObj);
        Groups.update(
            {_id: groupID},
            {
                $push: {events: eventObjID}
            }
        );
    },
    'groups.removeEvent'(groupID, eventID){
        var remover = Meteor.user().services.google.email;
        var eventToBeRemoved = Events.findOne({_id: eventID});
        var eventCreator = eventToBeRemoved.creator;

        var group = Groups.findOne({_id:groupID});
        var groupCreator = group.creator;

        if(remover == groupCreator || remover == eventCreator){
            Groups.update(
                {_id: groupID},
                {
                    $pull: {events: eventID}
                }
            );
            Events.remove({_id: eventID});
            return {successful: true, message: "Event successfully removed"};
        }
        return {successful: false, message: "You can't remove the group since you are not the creator of the group nor the event"};
    },
    'groups.changeEvent'(groupID, eventID, eventObj){
        var eventToBeChanged = Events.findOne({_id: eventID});
        var eventCreator = eventToBeChanged.creator;

        var group = Groups.find({_id:groupID}).next();
        var groupCreator = group.creator;

        if(remover == groupCreator || remover == eventCreator){
            Events.update(
                {_id:eventID},
                eventObj
            );
            return {successful: true, message: "Successfully updated the event"};
        }
        return {successful: false, message: "Could not update the event"};
    },
    'groups.changeName'(groupID, name){
        var creator = Meteor.user().services.google.email;
        var group = Groups.findOne({_id:groupID});
        var groupCreator = group.creator;

        if(creator == groupCreator){
            Groups.update(
                {_id:groupID},
                {
                    $set: {name: name}
                }
            );
            return {successful: true, message: "Successfully changed the group name"};
        }
        return {successful: false, message: "Could not update the group name"};
    },
    'groups.changeDescription'(groupID, description){
        var creator = Meteor.user().services.google.email;
        var group = Groups.findOne({_id:groupID});
        var groupCreator = group.creator;

        if(creator == groupCreator){
            Groups.update(
                {_id:groupID},
                {
                    $set: {description: description}
                }
            );
            return {successful: true, message: "Successfully updated the description"};
        }
        return {successful: false, message: "Could not change the description"};
    },
    'groups.removeGroup'(groupID){
        var creator = Meteor.user().services.google.email;
        var group = Groups.findOne({_id:groupID});
        var groupCreator = group.creator;

        if(creator == groupCreator){
            Groups.remove({_id: groupID});
            return {successful: false, message: "Successfully removed the group"};
        }
        return {successful: false, message: "Could not remove the group since you are not the creator of it"};
    },
});
