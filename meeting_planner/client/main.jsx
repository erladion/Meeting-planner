import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import { SignIn, Signout, loginRedirect, authenticate } from '../imports/ui/components/googleSignin'
import { App } from '../imports/ui/App'
import {Groups} from '../imports/api/groups/Groups'

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)



Meteor.startup(() => {
    render(
        <Router history={ browserHistory }>
          <Route path="/" component={ App }>
            <IndexRoute component={ SignIn } onEnter={loginRedirect}/>
            <Route path="/one" component={ Signout } onEnter={authenticate} />
            <Route path="/two" component={ About } onEnter={authenticate} />
          </Route>
        </Router>,
        document.getElementById( 'render-target' )
      );
  //render(<BasicExample />, document.getElementById('render-target'));

});
