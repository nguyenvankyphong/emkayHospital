import React, {Component} from 'react';

import './Welcome.css'

class Welcome extends Component {
  render() {
    return (
      <div className="row " id="Body">
        <div className="medium-12 columns">
          <h2 id="welcomeText">Welcome to Emkay Hospital</h2>
          <a href="/login" className="button">Login</a>
        </div>
      </div>
    );
  }
}

export default Welcome;