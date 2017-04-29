import React from 'react';
import { IndexLink, Link } from 'react-router';
import { Signout } from './googleSignin'

export const Navigation = () => (
    <div className="w3-bar w3-black">
        <IndexLink to="/two" className="w3-bar-item w3-button">About</IndexLink>
        <Signout/>
     </div>
)
