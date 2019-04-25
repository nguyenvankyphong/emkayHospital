import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";


class ChiefDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listSidebar: [{text: "Home", path: "/home"},
                    {text: "Lịch trực", path: "/home"},
                    {text: "Thông tin khám bệnh", path: "/home"},
                    {text: "Đơn thuốc", path: "/home"},
                    {text: "Phân công lịch trực", path: "/home"}
                    {text: "Hòm thư góp ý", path: "/home"}],
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
