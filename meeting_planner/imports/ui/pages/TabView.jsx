import React from 'react';
import { Navigation } from '../components/navigation';

export const TabView = ( { children } ) => (
  <div>
    <Navigation />
    { children }
  </div>
)
