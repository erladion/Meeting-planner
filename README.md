# TDDD27/2017 - Meeting planner
#### A project for the course TDDD27 - Advanced Web Programming given at Linköping University

###### By Johan Jansson (johja118) and Filip Magnusson (filma035)

## Functional Specification
A web application to schedule meetings for groups.
###### The application has the following features:
* Create and join groups.
* Ability to schedule a meeting for a given group of people and to have that meeting show up in their schedule.
* A "meeting" will have a name, location, description etc.
* Show times where at least one person in the group is busy.
* Ability to create personal events on the profile page (and that shows as "busy times" on the group page)

###### Possible future features:
* Ability to import schedules from for example Google Calendar
* Ability to export schedules

## Technical Specification
* [Meteor](https://www.meteor.com/) for back-end
* [React](https://facebook.github.io/react/) for front-end
* [mongoDB](https://www.mongodb.com/)
* [Google Sign-In](https://developers.google.com/identity/) for authentication
* [Big Calendar](https://github.com/intljusticemission/react-big-calendar) for displaying calendars and schedules
* [W3.CSS](https://www.w3schools.com/w3css/default.asp) for CSS classes

#### Some other plugins
* react-select for dropdown menus
* react-skylight for new event popup
* react-date-picker for date-picking for events

## Installation
```
curl https://install.meteor.com/ | sh
meteor npm install --save react react-dom react-router react-router-dom google-auth-library simpl-schema react-select react-big-calendar react-skylight react-date-picker
meteor npm i --save react-router@3.0.2
meteor add aldeed:simple-schema
meteor add peerlibrary:reactive-publish
meteor add momentjs:moment

```
