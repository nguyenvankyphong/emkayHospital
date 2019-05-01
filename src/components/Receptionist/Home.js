import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import AddCaKham from "./AddCaKham"

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer : false,
      listSidebar: [{ text: "Home", path: "/receptionist" },
      { text: "Tạo tài khoản", path: "/receptionist/register" },
      { text: "Đặt lịch khám", path: "/receptionist/dat_lich" },
      { text: "Thêm khoản phí", path: "/receptionist/add_khoan_phi" },
      { text: "Xuất hóa đơn", path: "/receptionist/xuat_hoa_don" },
      ],
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
          <AddCaKham/>
        </div>
      </div>
    );
  }
}

export default Home;
