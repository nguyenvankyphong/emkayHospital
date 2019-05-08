import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sdt: '',
      ngaysinh: '',
      ten: '',
      gioitinh: '',
      bhyt: '',
      diachi: '',
      redirectToReferrer: false,
      isRegistered: false,
      qr: '',
      listSidebar: [{text: "Home", path: "/receptionist"},
      {text: "Tạo tài khoản", path: "/receptionist/register"},
      { text: "Đặt lịch khám", path: "/receptionist/datLich" },
      { text: "Thêm khoản phí", path: "/receptionist/addKhoanPhi" },
      { text: "Xuất hóa đơn", path: "/receptionist/xuatHoaDon" },
      {text: "Tạo QR mới", path: "/receptionist/newqr"}],
    };

    this.newAccount = this.newAccount.bind(this);
    this.onChange = this.onChange.bind(this);
    this.register = this.register.bind(this);
    this.convertTime = this.convertTime.bind(this);
  }

  componentWillMount() {

  }

  convertTime(created) {
    let date = new Date(created * 1000);
    return date;
  }

  register() {

    if (this.state.sdt && this.state.ten) {
      var request = new XMLHttpRequest()
      var proxy = 'https://doanhttt.herokuapp.com/'

      // Open a new connection, using the GET request on the URL endpoint
      request.open('POST', proxy + 'http://168.61.49.94:8080/DOANHTTT/rest/account/register_patient', true)
      request.setRequestHeader("content-type", "application/json")
      request.setRequestHeader("Token", localStorage.getItem('userData'))


      var list = [];
      list.push(this.state.sdt);
      list.push(this.state.ten);
      list.push(this.state.ngaysinh);
      list.push(this.refs.gender.value);
      list.push(this.state.bhyt);
      list.push(this.state.diachi);
      request.send(JSON.stringify(list));
      var rs = {};

      console.log("list");
      console.log(list);

      const scope = this;
      request.onload = function () {
        console.log("response: ");
        console.log(this.response);
        rs = JSON.parse(this.response);
        // console.log(rs);
        // console.log("role" +rs.qr);

        if (!rs.errCode) {
          scope.setState({ isRegistered: true });
          scope.setState({ qr: rs.value });
          // console.log(scope.state);
        }
      }
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state);
  }

  newAccount() {
    // console.log("vô đc");
    this.setState({ isRegistered: false });
    this.setState({ qr: '' });

  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'} />)
    }

    if (this.state.isRegistered) {
      return (
        <div>
          <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
          <div className="row" id="Body">
            <div className="row" cid="Body">
              <div className="medium-4 columns left">
                <h1>Register</h1>
                <img src={this.state.qr}></img>
                <input type="submit" className="button success" value="New account" onClick={this.newAccount} />
              </div>
            </div>
          </div>
        </div>
      );
    }
    var body;
    switch (localStorage.getItem("userRole")) {
      case "1": body = "<div> savs</div"
    }

    return (
      <div>
        <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
        <div className="row" id="Body">
          <div className="row" cid="Body">
            <div className="medium-4 columns left">
              <h1>Register</h1>
              <label>Số điện thoại</label>
              <input type="text" ref="someUser" name="sdt" placeholder="Số điện thoại" onChange={this.onChange} />

              <label>Tên</label>
              <input type="text" ref="someUser" name="ten" placeholder="Tên" onChange={this.onChange} />

              <label>Ngày sinh</label>
              <input type="text" ref="someUser" name="ngaysinh" placeholder="Ngày sinh" onChange={this.onChange} />

              <label>Giới tính</label>
              <select onChange={this.onChange} ref="gender">
                <option key="0" value="0">Nam</option>
                <option key="1" value="1">Nữ</option>
              </select>

              <label>Địa chỉ</label>
              <input type="text" ref="someUser" name="diachi" placeholder="Địa chỉ" onChange={this.onChange} />

              <label>Số BHYT</label>
              <input type="text" ref="someUser" name="bhyt" placeholder="Số BHYT" onChange={this.onChange} />
              <div className="bt">
                <input type="submit" className="button success" value="Register" onClick={this.register} />
                <input type="reset" className="button reset" value="reset" onClick={this.handlereset} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
