import React from 'react';
import {BrowserRouter,  Route,  Switch} from 'react-router-dom';

import Welcome from '././components/Welcome/Welcome';
import Home from '././components/Home/Home';
import Login from '././components/Login/Login';
import Patient from '././components/Patient/Patient';
import NotFound from '././components/NotFound/NotFound';
import Admin from './components/Admin/Admin';
import Receptionist from './components/Receptionist/Receptionist';
import Patients from './components/Receptionist/Patients';
import Signup from './components/Receptionist/Signup';
import Doctor from './components/Doctor/Doctor';


const Routes = () => (
  <BrowserRouter >
      <Switch>
          <Route exact path="/" component={Welcome}/>
          <Route path="/home" component={Home}/>
          <Route path="/login" component={Login}/>
          <Route path="/signup" component={Signup}/>
          <Route path="/patient" component={Patient}/>
          <Route path="/admin" component={Admin}/>
          <Route path="/doctor" component={Doctor}/>
          <Route path="/receptionist" component={Receptionist}/>
          <Route path="/patients" component={Patients}/>
          <Route path="/register" component={Signup}/>
          <Route path="*" component={NotFound}/>
      </Switch>
  </BrowserRouter>
);

export default Routes;
