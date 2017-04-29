import React from 'react';
import { IndexLink, Link } from 'react-router';

export const Navigation = () => (
    <div className="w3-bar w3-black">
         <IndexLink to="/one" className="w3-bar-item w3-button">Log out</IndexLink>
         <Link to="/two" className="w3-bar-item w3-button">About</Link>
     </div>
)
