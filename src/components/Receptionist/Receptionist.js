import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Register from "./Register";
import Home from "./Home";
import Add_khoan_phi from './Add_khoan_phi';
import XuatHoaDon from './XuatHoaDon';
import NewQR from "./NewQR";
import DatLich from "./DatLich";
import DanhSachDotKham from "./DanhSachDotKham";
import ChangePass from "../Sidebar/ChangePass";


class Receptionist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listSidebar: [{ text: "Home", path: "/receptionist" },
                    { text: "Tạo tài khoản", path: "/receptionist/register" },
                    { text: "Đặt lịch khám", path: "/receptionist/datLich" },
                    { text: "Thêm khoản phí", path: "/receptionist/addKhoanPhi" },
                    { text: "Xuất hóa đơn", path: "/receptionist/xuatHoaDon" },
                    {text: "Tạo QR mới", path: "/receptionist/newqr"}
                    ],
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
            <Route path={`${this.props.match.path}/changePass`} component={ChangePass} />
            <Route path={`${this.props.match.path}/register`} component={Register} />
            <Route path={`${this.props.match.path}/datLich`} component={DatLich} />
            <Route path={`${this.props.match.path}/addKhoanPhi`} component={Add_khoan_phi} />
            <Route path={`${this.props.match.path}/danhsachdotkham`} component={DanhSachDotKham} />
            <Route path={`${this.props.match.path}/newqr`} component={NewQR} />
      </div>
    );
  }
}

export default Receptionist;
