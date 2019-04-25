import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";


class C  extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listSidebar: [{text: "Home", path: "/home"}, {text: "Tạo hóa đơn", path: "/home"}],
    };
  }

  render() {
    return (
      <div>
        <Sidebar listSidebar= {this.state.listSidebar} current_path = {window.location.pathname}/>
        <div className="row" id="Body">
        </div>
      </div>
    );
  }
}

export default ChiefDoctor;
