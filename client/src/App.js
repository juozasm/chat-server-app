import React from 'react';
import {BrowserRouter, Route, Switch,Redirect} from 'react-router-dom';
import Chat from './components/Chat';
import User from './components/User';
import Login from './components/Login';
import Register from './components/Register';

const App =()=> {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Chat}/>
          <Route exact path="/user" component={User}/>
          <Route path="/user/:userid" component={User}/>
          <Route path="/login" component={Login}/>
          <Route path="/register" component={Register}/>
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    );
  }

export default App