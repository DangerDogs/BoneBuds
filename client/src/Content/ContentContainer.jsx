import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import MapContainer from './Routes/MapContainer';
import UserProfile from './Routes/UserProfile';
import UserPage from './Routes/UserPage';

const ContentContainer = (props) => (
  <main>
    <Switch>
      <Route exact path='/' component={MapContainer} />
      <Route path='/userpage' render={ () => (<UserPage currentUser={props.currentUser}/>) } />
      <Route path='/userprofile' render={ () => (<UserProfile currentUser={props.currentUser}/>) } />
    </Switch>
  </main>
)

export default ContentContainer;