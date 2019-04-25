import React, { Component } from 'react';

import './styles/foundation.min.css';
import './styles/custom.css';
import './App.css';

import Routes from './routes';

class App extends Component {

  constructor(){
    super();
    this.state={
      appName: "Banana",
      home: false
    }
  }

  render() {
    return (
      <div className="off-canvas-wrapper">
      <div className="off-canvas-wrapper-inner" data-off-canvas-wrapper>
        <div className="off-canvas-content" data-off-canvas-content>
          <Routes name={this.state.appName}/>
        </div>
      </div>
    </div>
    );
  }
}

export default App;
