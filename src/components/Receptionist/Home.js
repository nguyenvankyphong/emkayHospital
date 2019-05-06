import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import AddCaKham from "./AddCaKham"

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer : false,
      listSidebar: [{text: "Home", path: "/receptionist"},
                    {text: "Tạo tài khoản", path: "/receptionist/register"},
                    { text: "Đặt lịch khám", path: "/receptionist/datLich" },
                    { text: "Thêm khoản phí", path: "/receptionist/addKhoanPhi" },
                    { text: "Xuất hóa đơn", path: "/receptionist/xuatHoaDon" },
                    {text: "Tạo QR mới", path: "/receptionist/newqr"}],
    };
  }

  componentWillMount() {

  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }

    switch (localStorage.userRole) {
      case "1":
        return (<Redirect to={'/patients'}/>)
        break;
      case "2":
        return (<Redirect to={'/doctor'}/>)
        break;
      case "4":
        return (<Redirect to={'/admin'}/>)
        break;
    }


    return (
      <div>
        <Sidebar listSidebar= {this.state.listSidebar} current_path = {window.location.pathname}/>
        <div className="row" id="Body">
          <AddCaKham/>
        </div>
      </div>
    );
  }
}

export default Home;
