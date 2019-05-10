import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import DatePicker from 'react-datepicker';
import { checkErrCode } from '../Layout/checkErrCode';
import leftPad from 'left-pad';

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
      startDate: new Date(),
      listSidebar: [{text: "Home", path: "/receptionist"},
                    {text: "Tạo tài khoản", path: "/receptionist/register"},
                    { text: "Đặt lịch khám", path: "/receptionist/datLich" },
                    { text: "Thêm khoản phí", path: "/receptionist/addKhoanPhi" },
                    { text: "Xuất hóa đơn", path: "/receptionist/xuatHoaDon" },
                    {text: "Tạo QR mới", path: "/receptionist/newqr"}],
    };

    this.newAccount = this.newAccount.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChangeRadio = this.handleChangeRadio.bind(this);
    this.register = this.register.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }

  componentWillMount() {

  }

  convertTime(created) {
    let date = new Date(created * 1000);
    return date;
  }

  register() {
    console.log(this.state.startDate);
    var a = this.state.startDate;
    const formattedDate = [
      leftPad(a.getFullYear(), 4, 0),
      leftPad(a.getMonth()+1, 2, 0),
      leftPad(a.getDate(), 2, 0)
    ].join("-");

    console.log(formattedDate);
    

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
      list.push(formattedDate);
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
        console.log(rs.errCode);
        checkErrCode(rs.errCode);
        if (!rs.errCode) {
          scope.setState({ isRegistered: true });
          scope.setState({ qr: rs.value });
        }
      }
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    // console.log(this.state);
  }
  handleChangeDate(date) {
    this.setState({
      startDate: date
    });
  }
  newAccount() {
    // console.log("vô đc");
    this.setState({ isRegistered: false });
    this.setState({ qr: '' });

  }

   handleChangeRadio(e) {
     console.log("e");
     console.log(e);
     this.setState({[e.target.name]:e.target.value});
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
          <h1 className="title">EMKAY HOSPITAL</h1>
          <div className="medium-4 columns left">
            <h1>Register</h1>
            <label>Số điện thoại</label>
            <input type="text" ref="someUser" name="sdt" placeholder="Số điện thoại" onChange={this.onChange}/>

            <label>Tên</label>
            <input type="text" ref="someUser" name="ten" placeholder="Tên" onChange={this.onChange}/>

            <label>Ngày sinh</label>
           <div>
           <DatePicker
            dateFormat="yyyy-MM-dd"
            selected={this.state.startDate}
            onChange={this.handleChangeDate}
            peekNextMonth
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            />

           </div>
            <label>Giới tính</label>
            <select onChange={this.onChange} ref="gender">
              <option key="0" value="0">Nam</option>
              <option key="1" value="1">Nữ</option>
            </select>

            <label>Địa chỉ</label>
            <input type="text" ref="someUser" name="diachi" placeholder="Địa chỉ" onChange={this.onChange}/>

            <label>Số BHYT</label>
            <input type="text" ref="someUser" name="bhyt" placeholder="Số BHYT" onChange={this.onChange}/>
            <div className= "bt">
              <input type="submit" className="button success" value="Register" onClick={this.register} />
              <input type="reset" className="button reset" value="reset" onClick={this.handlereset}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;
