import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import './Welcome.css'

class Welcome extends Component {
  render() {
    // if (!localStorage.getItem('userData')) {
    //   return (<Redirect to={'/login'}/>);
    // }
    return (
        <div className="welcome">
          <div>
            <a className="login-btn" href="/login">LOGIN</a>
          </div>
          <div className="welcomeContent">
            <h2 id="welcomeText" className="welcomeText">WELCOME TO EMKAY HOSPITAL</h2>
            <p className="welcomeSlogan">Leading the way in medical excellence</p>
          </div>
        </div>
    );
  }
}

export default Welcome;
