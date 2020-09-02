import React from 'react';
import logo from './logo.svg';

import jwt_decode from 'jwt-decode'

import Home from './Components/Home'
import News from './Components/News'
import Login from './Components/Login'
import AddNews from './Components/addNews'

import {BrowserRouter as Router, Route,Redirect} from 'react-router-dom'
import Categories from "./Components/Categories";

function App() {



  return (
      <Router>
    <div className="App">
      {!sessionStorage.getItem('token') && <Redirect to="/" />}
      {!sessionStorage.getItem('token') ? <Route exact path={'/'} component = {Login} /> :<Route exact path={'/'} component = {Home} />}

      <Route exact path={'/categories'} component={Categories} />
      <Route exact path={'/news'} component={News} />
      <Route exact path={'/addNews'} component={AddNews} />
    </div>
        </Router>
  );
}

export default App;
