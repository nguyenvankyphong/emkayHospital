import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import BenhAn from './BenhAn';
import PatientIndex from './Patient/index';
import {Route} from 'react-router-dom';

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
        <Route exact path={this.props.match.path} component={PatientIndex} />
        <Route path={`${this.props.match.path}/benhan`} component={BenhAn} />
      </div>
    );
  }
}

export default Patient;
