import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import GoogleLogin from 'react-google-login';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

const About = () => (
  <div>
    <h2>About</h2>
  </div>
)

const Topic = ({ match }) => (
  <div>
    <h3>{match.params.topicId}</h3>
  </div>
)

const Topics = ({ match }) => (
  <div>
    <h2>Topics</h2>
    <ul>
      <li>
        <Link to={`${match.url}/rendering`}>
          Rendering with React
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </li>
      <li>
        <Link to={`${match.url}/props-v-state`}>
          Props v. State
        </Link>
      </li>
    </ul>

    <Route path={`${match.url}/:topicId`} component={Topic}/>
    <Route exact path={match.url} render={() => (
      <h3>Please select a topic.</h3>
    )}/>
  </div>
)

const BasicExample = () => (
  <Router>
    <div>

      <SignIn />
      <Signout />
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/topics">Topics</Link></li>
      </ul>

      <hr/>

      <Route exact path="/" component={Home}/>
      <Route path="/about" component={About}/>
      <Route path="/topics" component={Topics}/>
    </div>
  </Router>
)

function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}

class SignIn extends React.Component{

    render() {
        return (
            <div id="my-signin2"/>
        );
    }

    renderGoogleLoginButton() {
    console.log('rendering google signin button')
    gapi.signin2.render('my-signin2', {
      'scope': 'https://www.googleapis.com/auth/plus.login',
      'width': 200,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
      'onsuccess': onSignIn
    });
  }

  componentDidMount() {
    window.addEventListener('google-loaded',this.renderGoogleLoginButton);
  }


}

class Signout extends React.Component {

    render(){
        return (
            <button onClick={this.signOut}>Log out</button>
        )
    }

    signOut() {
        console.log("user signing out")
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
            console.log('User signed out.');
        });
    }
}

Meteor.startup(() => {

  render(<BasicExample />, document.getElementById('render-target'));

});
