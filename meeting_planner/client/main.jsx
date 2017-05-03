import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { loginRedirect, authenticate } from '../imports/ui/components/loginButton'
import { WelcomePage } from '../imports/ui/pages/WelcomePage'
import { App } from '../imports/ui/App'
import { TabView } from '../imports/ui/pages/TabView'
import { NotFound } from "../imports/ui/pages/NotFound"
import {Groups} from '../imports/api/groups/Groups'
import {Profile} from '../imports/ui/components/profile'

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

Meteor.startup(() => {
    render(
        <App>
            <Router history={ browserHistory }>
                <Route path="/" component={ WelcomePage } onEnter={loginRedirect}/>
                <Route path="/" component={ TabView }>
                    <Route path="/about" component={ About } onEnter={authenticate} />
                    <Route path="/profile" component={Profile} onEnter={authenticate} />
                </Route>
                <Route path="/*" component={ NotFound } />
            </Router>
        </App>,
        document.getElementById( 'render-target' )
      );
});
