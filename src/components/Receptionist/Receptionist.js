import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Register from "./Register";
import Home from "./Home";
import Add_khoan_phi from './Add_khoan_phi';
import XuatHoaDon from './XuatHoaDon';


class Receptionist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listSidebar: [{ text: "Home", path: "/receptionist" },
      { text: "Tạo tài khoản", path: "/receptionist/register" },
      { text: "Đặt lịch khám", path: "/receptionist/dat_lich" },
      { text: "Thêm khoản phí", path: "/receptionist/add_khoan_phi" },
      { text: "Xuất hóa đơn", path: "/receptionist/xuat_hoa_don" },
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
            <Route path={`${this.props.match.path}/register`} component={Register} />
            <Route path={`${this.props.match.path}/dat_lich`} component={Register} />
            <Route path={`${this.props.match.path}/add_khoan_phi`} component={Add_khoan_phi} />
            <Route path={`${this.props.match.path}/xuat_hoa_don`} component={XuatHoaDon} />
      </div>
    );
  }
}

export default Receptionist;
