import React, { useState } from 'react';
import axios from 'axios';
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
  const [users, setUsers] = useState([]);
  const [repos, setRepos] = useState([]);
  const [user, setUser] = useState({});
  const [loading, handleLoading] = useState(false);
  const [alert, handleAlert] = useState(null);

  // get users repos
  const getUserRepos = async username => {
    handleLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&?client_id${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    );
    setRepos(res.data);
    handleLoading(false);
  };

  // get single github user
  const getUser = async username => {
    handleLoading(true);
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id${
        process.env.REACT_APP_GITHUB_CLIENT_ID
      }&client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET}`,
    );
    setUser(res.data);
    handleLoading(false);
  };

  // clear users from state
  const clearUsers = () => {
    setUser([]);
    handleLoading(false);
  };

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
                    <Search
                      showClear={(users || []).length > 0}
                      clearUsers={clearUsers}
                      setAlert={setAlert}
                    />
                    <Users loading={loading} users={users} />
                  </>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={props => (
                  <User
                    loading={loading}
                    {...props}
                    getUser={getUser}
                    getUserRepos={getUserRepos}
                    repos={repos}
                    user={user}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    </GithubState>
  );
};

export default App;
