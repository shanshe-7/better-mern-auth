import React from 'react';
import Navbar from './components/Header/Navbar/Navbar';
import Home from './components/Header/Home/Home';
import authGuard from './components/HOCs/authGuard';
import Signin from './components/Header/Signin/Signin';
import Signup from './components/Header/Signup/Signup';
import Secret from './components/Secret/Secret';

import { Route, Switch } from 'react-router-dom';

export const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path='/secret' component={authGuard(Secret)} />
        <Route exact path='/signup' component={Signup} />
        <Route exact path='/signin' component={Signin} />
      </Switch>
    </>
  );
};
