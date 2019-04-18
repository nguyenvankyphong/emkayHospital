import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import Patients from "./Patients";


class Patient extends Component {

  render() {
    return (
      <div>
        <Sidebar/>
        <div className="row" id="Body">
          <Patients/>
        </div>
      </div>
    );
  }
}

export default Patient;
