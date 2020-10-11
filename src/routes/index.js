import React from 'react';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Home from '../pages/Home';
import Details from '../pages/Details';
import Favorites from '../pages/Favorites';

const Routes = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route component={Home} exact path="/" />
        <Route component={Details} exact path="/details/:id" />
        <Route component={Favorites} exact path="/favorites" />
      </Switch>
    </BrowserRouter>
  );
};

export default Routes;
