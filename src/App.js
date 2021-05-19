
import React from 'react'
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './PrivateRoute'
import Home from './views/Home'
import Login from './views/Login'

function App() {
  return (
    <Router>
        <div>
        <Switch>
          <PrivateRoute exact path="/" component={Home} />
          <Route path="/login" component={Login} />
        </Switch>
        </div>
    </Router>
  );
}

export default App;
