import React, {Component, Fragment} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Users from './components/users/Users';
import Search from './components/users/Search';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import axios from 'axios'

import './App.css';
import { render } from '@testing-library/react';
 
class App extends Component{

  state = {
    users:[],
    loading: false,
    alert: null
  }
  //Search Github Users
  searchUsers = async text => {
    this.setState({loading:true});
    const res = await axios.get(`https://api.github.com/search/users?q=${text}&
      client_id=${process.env.REACT_APP_GITHUB_CLIENT_ID}&
      client_secret=${process.env.REACT_APP_GITHUB_CLIENT_SECRET }`); 
    this.setState({ users: res.data.items, loading:false }); 
  }
  //Clear Users
  clearUsers = () => {
    this.setState({users: []});
  }

  //Alert Function
  setAlert = (msg, type) => {
    this.setState({alert: {msg, type}});
    setTimeout(() => this.setState({alert:null}), 5000);
  }

  render(){
    return (
      <Router>
        <div className="App">
          <Navbar/>
          <div className="container">
            <Alert alert={this.state.alert} />
            <Switch>
              <Route
               exact
               path='/'
               render={props => (
                <Fragment>
                <Search 
                  searchUsers={this.searchUsers} 
                  clearUsers={this.clearUsers} 
                  usersLength={this.state.users.length} 
                  setAlert={this.setAlert}/>
                <Users loading={this.state.loading} users={this.state.users} />
                </Fragment>
              )} />
              <Route
               exact
               path='/about'
               component={About} />
            </Switch>

          </div>
        </div>
      </Router>
    );
  }
}

export default App;
