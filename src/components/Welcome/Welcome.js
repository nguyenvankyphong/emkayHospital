import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';

import './Welcome.css'

class Welcome extends Component {
  render() {
    if (!sessionStorage.getItem('userData')) {
      return (<Redirect to={'/login'}/>);
    }
    return (
      <div className="row " id="Body">
        <div className="medium-12 columns">
          <h2 id="welcomeText">Welcome to Emkay Hospital</h2>
        </div>
      </div>
    );
  }
}

export default Welcome;
