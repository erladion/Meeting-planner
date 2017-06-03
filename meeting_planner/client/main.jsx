import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { loginRedirect, authenticate } from '../imports/ui/components/loginButton'
import { WelcomePage } from '../imports/ui/pages/WelcomePage'
import { App } from '../imports/ui/App'
import { TabView } from '../imports/ui/pages/TabView'
import { NotFound } from "../imports/ui/pages/NotFound"
import { Groups } from '../imports/api/groups/Groups'
import { Profile } from '../imports/ui/components/profile'
import { Group, Events } from '../imports/ui/components/group'
import 'react-select/dist/react-select.css';
import 'react-big-calendar/lib/css/react-big-calendar';
import BigCalendar from 'react-big-calendar';
import moment from 'moment';

BigCalendar.momentLocalizer(moment);

Meteor.startup(() => {
    Meteor.subscribe('groups');
    Meteor.subscribe('users');
    Meteor.subscribe('events');
    render(
        <App>
            <Router history={ browserHistory }>
                <Route path="/" component={ WelcomePage } onEnter={loginRedirect}/>
                <Route path="/" component={ TabView }>
                    <Route path="/profile" component={Profile} onEnter={authenticate} />
                    <Route path="/groups/:name" component={ Group } onEnter={authenticate} />
                </Route>
                <Route path="/*" component={ NotFound } />
            </Router>
        </App>,
        document.getElementById( 'render-target' )
      );
});
