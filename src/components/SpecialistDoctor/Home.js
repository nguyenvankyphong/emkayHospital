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
                    {text: "Lịch làm việc", path: "/doctor/lichlamviec"}],
    };
  }

  componentWillMount() {

  }

  componentDidMount() {
    if (localStorage.truongKhoa === "true") {
      let listSidebar = [...this.state.listSidebar];
      listSidebar.push({text: "Lịch trực", path: "/doctor/lichtruc"});
      this.setState({ listSidebar });
    }
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }



    return (
      <div className="home">
        <div>
          <Sidebar listSidebar= {this.state.listSidebar} current_path = {window.location.pathname}/>
        </div>
        <div className="quotesContent">
          <p className="quotesStogan">We Care for Your Health Every Moment</p>
        </div>
      </div>
    );
  }
}

export default Home;
