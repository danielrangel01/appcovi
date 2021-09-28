import React from 'react'

import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Login from './components/Auth/Login';
import NuevaCuenta from './components/Auth/NuevaCuenta';
import Dashboard from './components/dashboard/Dashboard';
import {AuthProvider} from './components/Auth/context/AuthContext';
import {PrivateRoute} from './components/Auth/PrivateRoute'


function App() {
  return (
    <AuthProvider>

    <Router>

    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
      <PrivateRoute exact path="/dashboard" component={Dashboard} />

    </Switch>

    </Router>

  </AuthProvider>
  );
}

export default App;
