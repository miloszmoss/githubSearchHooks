import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import GithubState from './context/github/GithubState';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import User from './components/users/User';

import './App.css';

const App = () => {
  const [alert, handleAlert] = useState(null);

  const setAlert = (msg, type) => {
    setAlert({ msg, type });
    setTimeout(() => handleAlert(null), 5000);
  };
  return (
    <GithubState>
      <Router>
        <div className="App">
          <Navbar title={'Github Finder'} icon={'fab fa-github'} />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                path="/"
                exact
                render={() => (
                  <>
                    <Search setAlert={setAlert} />
                    <Users />
                  </>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route exact path="/user/:login" component={User} />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
