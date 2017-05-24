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
    title: {type: String},
    creator: {type: String},
    location: {type: String},
    start: {type: Date},
    end: {type: Date},
    description :{type: String, optional: true},
    groupId: {type:String},
});

Meteor.methods({
    'groups.insert'(name, description){
        var creator = Meteor.user().services.google.email;
        if(name){
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
            return {successful: true, message: "Group was successfully created"};
        }
        return {successful: false, message: "Can not create a group with no name"};
    },
    'groups.addMember'(groupID, member){
        var creator = Meteor.user().services.google.email;
        var user = Meteor.users.findOne({'services.google.email': member});
        // Don't mind this magic happening here. just javascript things
        // indexOf() returns -1 if it does not exist, ~ makes it so that -1
        // becomes 0 and everything else becomes something that isn't 0
        var userInGroup = ~Groups.findOne({_id:groupID}).members.indexOf(member);

        if(user && !userInGroup){
            Groups.update(
                {_id: groupID, creator: creator},
                {
                    $push: {members: member}
                }
            );
            Meteor.users.update(
                {_id: user._id},
                {
                    $push: {groups: groupID}
                }
            );
            return {successful: true, message: "Member was successfully added"};
        }
        return {successful: false, message: "Member does not exist"};
    },
    'groups.leaveGroup'(groupID){
        var group = Groups.findOne({_id: groupID});
        console.log(group);
        if(group){
            if(group.members.length == 1){
                console.log("alone");
                //Meteor.call('groups.removeGroup', groupID);
                removeGroup(groupID);
            }
            else{
                console.log("begin removed");
                removeMember(groupID, Meteor.user().email);
                //Meteor.call('groups.removeMember', groupID,Meteor.user().email);
                console.log("finish removed");
                // Probably should be called owner instead of creator, but oh well.
                // We have to get the group again to be able to update the creator,
                // if we don't we are going to use the old members list and set the creator to the get who was creator but left
                group = Groups.findOne({_id: groupID});
                var newCreator = group.members[0];
                console.log(newCreator);
                console.log(group.members);
                Groups.update(
                    {_id: groupID},
                    {
                        $set: {creator: newCreator}
                    }
                );
            }
        }
    },
    'groups.removeMember'(groupID, member){
        var removedMember = removeMember(groupID, member);

        if(removedMember){
            return {successful: true, message: "Member successfully removed"};
        }
        else{
            return {successful: false, message: "Member does not exist"};
        }
    },
    'groups.addEvent'(groupID, eventObj){
        var eventObjID = Events.insert(eventObj);
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
    'groups.changeEvent'(groupID, eventObj){
        var eventToBeChanged = Events.findOne({_id: eventObj._id});
        var eventCreator = eventToBeChanged.creator;

        var group = Groups.findOne({_id:groupID});
        var groupCreator = group.creator;

        if(Meteor.user().email == groupCreator || Meteor.user().email == eventCreator){
            Events.update(
                {_id:eventObj._id},
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
        var removedGroup = removeGroup(groupID);
        if(removedGroup){
            return {successful: false, message: "Could not remove the group since you are not the creator of it"};
        }
        else{
            return {successful: false, message: "Successfully removed the group"};
        }
    },
    'events.getEventsForGroup'(groupId){
        var usersInGroup = Groups.find({_id: groupId}, {members: 1}).fetch();
        var eventsInGroup = Groups.find({_id: groupId}, {events: 1}).fetch();

        var groups = Groups.find({members:{$in: usersInGroup}},
            {_id: 1}).fetch().map(function(gr){
                return gr._id;
            });

        var groupsSet = new Set(groups);

        groupsSet.delete(groupId);

        groups = Array.from(groupsSet);
        var events = Events.find({_id: {$in: groups}}).fetch();

        var memberEvents = usersInGroup.map(function(us){
            return us.events;
        });

        var memberEventsDone = [].concat.apply([], memberEvents);

        events = events.concat(memberEventsDone);

        var realEvents = Events.find({_id: {$in: events}}, {start: 1, end: 1}).fetch();

        return realEvents;
    },
});

function removeGroup(groupID){
    var creator = Meteor.user().email;
    var group = Groups.findOne({_id:groupID});
    var membersInGroup = group.members;
    var groupCreator = group.creator;

    if(creator == groupCreator){
        Meteor.users.update(
            {"email": {$in: membersInGroup}},
            {
                $pull: {groups: groupID}
            }
        );
        Groups.remove({_id: groupID});
        return false;
    }
    return true;
}

function removeMember(groupID, member){
    var creator = Groups.findOne({_id: groupID}).creator;
    if (Meteor.user().email != creator && Meteor.user().email != member){
        return false;
    }
    var user = Meteor.users.findOne({email: member});
    if(user){
        Meteor.users.update({_id: user._id},
            {
                $pull: {groups: groupID}
            }
        );
        Groups.update(
            {_id: groupID, creator: creator},
            {
                $pull: {members: member}
            }
        );
        return true;
    }
    return false;
}
