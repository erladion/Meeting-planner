# TDDD27/2017 - Meeting planner
#### A project for the course TDDD27 - Advanced Web Programming given at Linköping University

###### By Johan Jansson (johja118) and Filip Magnusson (filma035)

## Functional Specification
A web application to schedule meetings for groups.  
###### The application will have the following features:
* Create and join groups.
* Ability to schedule a meeting for a given group of people and to have that meeting show up in their schedule.  
* A "meeting" will have a name, location, description etc.
* Show free times in common to everyone in a given group.
* Ability to mark a given time frame as "busy" without actually having a meeting at that time.

###### Might do features:
* Ability to import schedules from for example Google Calendar
* Ability to export schedules

## Technical Specification
* [Meteor](https://www.meteor.com/) for back-end
* [React](https://facebook.github.io/react/) for front-end
* [mongoDB](https://www.mongodb.com/)
* [Google Sign-In](https://developers.google.com/identity/) for authentication
* [Big Calendar](https://github.com/intljusticemission/react-big-calendar) for displaying calendars and schedules
* [Postman](https://www.getpostman.com/) for back-end testing  


## Installation
```
curl https://install.meteor.com/ | sh
meteor npm install --save react react-dom
meteor npm install --save react react-router
meteor npm install --save react react-router-dom
meteor add aldeed:simple-schema

```
