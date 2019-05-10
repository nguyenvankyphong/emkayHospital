import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import './Add.css';


class Receptionist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
    };
  }

  componentWillMount() {

  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }
    return (
      <div>
        <button id="viewRs" className="button1 buttonAdd">SHOW KQ</button>
          <button id="myBtn" className="button1 buttonAdd">Preview</button>
        <br></br>
        <button id="firstNode" className="button1 buttonAdd">+</button>
        <div className="phongphong">
            <div>
            </div>
          </div>
          <div id="root">
          </div>
        <div id="myModal" className="modal">

          <div className="modal-content" >
            <span className="close">&times;</span>
          <div id="modal-content"> </div>

          </div>

        </div>
          <script src="/js/hien.js">

          </script>
      </div>
    );
  }
}

export default Receptionist;
