import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer : false,
      listSidebar: [{text: "Home", path: "/doctor"},
                    {text: "Thêm hồ sơ khám bệnh", path: "/doctor/hoso"},
                    {text: "Lịch trực", path: "/doctor/lichtruc"}],
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
            aa
          </div>
      </div>
    );
  }
}

export default Home;
