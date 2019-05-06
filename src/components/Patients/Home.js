import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import DependentPatient from './DependentPatient';

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      listSidebar: [{ text: "Home", path: "/patients" }]
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
        <DependentPatient/>
      </div>
    );
  }
}

export default Home;
