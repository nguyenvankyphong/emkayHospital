import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import Home from "./Home";
import Patient from './Patient';


class Patients extends Component {
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
            <Route exact path={this.props.match.path} component={Home} />
            <Route path={`${this.props.match.path}/patient`} component={Patient} />
      </div>
    );
  }
}

export default Patients;
