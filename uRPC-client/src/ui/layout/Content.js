import React from 'react';

import { Route, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import NotFoundPage from '../pages/NotFoundPage';

// Demo
import ReduxDemo from '../demo/ReduxDemo';

const Content = () => (
  <Switch>
    <Route path="/" exact component={HomePage} />
    <Route path="/home" exact component={HomePage} />

    <Route path="/redux-demo" exact component={ReduxDemo} />

    <Route component={NotFoundPage} />
  </Switch>
);

export default Content;
