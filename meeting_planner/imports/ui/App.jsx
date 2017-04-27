import React from 'react';
import { Navigation } from '../ui/components/navigation';

export const App = ( { children } ) => (
  <div>
    <Navigation />
    { children }
  </div>
)
