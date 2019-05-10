import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Sidebar from "../../Sidebar/Sidebar";

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
      <div className="row">
        <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
        zxcsd
      </div>
    );
  }
}

export default Receptionist;
