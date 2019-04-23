import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import InfoPatient from './InfoPatient';
import HistoryPatient from './HistoryPatient';

class Patient extends Component {


  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer : false,
      listSidebar: [{text: "Home", path: "/patients"},
                    {text: "All patients", path: "/register"},
                    {text: "This", path: "/patients/patient"}],
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
        <Sidebar listSidebar= {this.state.listSidebar} current_path = {window.location.pathname}/>
        <div className="row" id="Body">
            <InfoPatient />
            <HistoryPatient />
        </div>
      </div>
    );
  }
}

export default Patient;
