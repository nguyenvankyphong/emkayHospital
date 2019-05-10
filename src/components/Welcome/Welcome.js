import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import './Welcome.css'

class Welcome extends Component {
  render() {
    // if (!localStorage.getItem('userData')) {
    //   return (<Redirect to={'/login'}/>);
    // }
    var btn =() => {
      switch (localStorage.userRole) {
        case "1":
          return <a className="login-btn" href="/patients">Home</a>;
          break;
        case "2":
          return <a className="login-btn" href="/doctor">Home</a>;
          break;
        case "3":
          return <a className="login-btn" href="/receptionist">Home</a>;
          break;
        case "4":
          return <a className="login-btn" href="/admin">Home</a>;
          break;
        default:
          return <a className="login-btn" href="/login">LOGIN</a>

      }
    }
    return (
        <div className="welcome">
          <div>
            {btn()}
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
