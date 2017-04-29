import React from 'react';

export const App = ( { children } ) => (
  <div>
      <div className="w3-container w3-blue">
          <h1>Meeting Planner</h1>
      </div>
    { children }
  </div>
)
