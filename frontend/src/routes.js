import React, { useContext } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';

import { Context } from './Context/AuthContext';

import Login from './pages/Login'
import Register from './pages/Register'
import Perfil from './pages/Perfil'

function CustomRoute({ isPrivate, ...rest }) {
  const { loading, authenticated } = useContext(Context);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (isPrivate && !authenticated) {
    return <Redirect to="/login" />
  }

  return <Route {...rest} />;
}

export default function Routes() {
  return (
    <Switch>
      <CustomRoute exact path="/login" component={Login} />
      <CustomRoute exact path="/register" component={Register} />
      <CustomRoute isPrivate exact path="/perfil" component={Perfil} />
    </Switch>
  );
}