import React from 'react';
import { render } from 'react-dom';
import { LoginButton } from '../components/loginButton';

export class WelcomePage extends React.Component{
    render(){
        return (
            <div>
                <br/>
                <div className="w3-container">
                    <LoginButton />
                    <p>This is Meeting Planner! <br/>A smart application for planning meetings within a group. Go ahead and try it out!</p>
                </div>
            </div>
        );
    }
}
