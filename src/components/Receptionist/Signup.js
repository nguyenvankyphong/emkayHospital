import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
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
      redirectToReferrer : false,
      listSidebar: [{text: "Home", path: "/receptionist/home"},
                    {text: "Tạo tài khoản", path: "/register"},
                    {text: "Book ca khám", path: "/home"}],
    };

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

    if(this.state.sdt && this.state.ten){
      var request = new XMLHttpRequest()
      var proxy = 'https://doanhttt.herokuapp.com/'

      // Open a new connection, using the GET request on the URL endpoint
      request.open('POST', proxy+'http://168.61.49.94:8080/DOANHTTT/rest/account/register_patient', true)
      request.setRequestHeader("content-type","application/json")
      request.setRequestHeader("Token", sessionStorage.getItem('userData'))


      var list = [];
      list.push(this.state.sdt);
      list.push(this.state.ten);
      list.push(this.state.ngaysinh);
      list.push(this.state.gioitinh);
      list.push(this.state.bhyt);
      list.push(this.state.diachi);
      console.log("show list push");
      console.log(list);
      request.send(JSON.stringify(list));
      var rs = {};

      const scope = this;

      request.onload = function () {
        console.log("response: ");
        console.log(this.response);
        rs = JSON.parse(this.response);
        console.log(rs);
        console.log("role" +rs.qr);

        if (!rs.errCode) {
        console.log(scope.state);
      }
    }
    }
   }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
    console.log(this.state);
   }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }
    var body;
    switch (sessionStorage.getItem("userRole")) {
      case "1": body = "<div> savs</div"
   }

    return (
      <div>
        <Sidebar listSidebar= {this.state.listSidebar} current_path = {window.location.pathname}/>
        <div className="row" id="Body">
        <div className= "row" cid="Body">
         <h1 className="title">EMKAY HOSPITAL</h1>
          <div className="medium-4 columns left">
            <h1>Register</h1>
            <label>Số điện thoại</label>
            <input type="text" ref="someUser" name="sdt" placeholder="Số điện thoại" onChange={this.onChange}/>

            <label>Tên</label>
            <input type="text" ref="someUser" name="ten" placeholder="Tên" onChange={this.onChange}/>

            <label>Ngày sinh</label>
            <input type="text" ref="someUser" name="ngaysinh" placeholder="Ngày sinh" onChange={this.onChange}/>

            <label>Giới tính</label>
            <input type="text" ref="someUser" name="gioitinh" placeholder="Giới tính" onChange={this.onChange}/>

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
      </div>
    );
  }
}

export default Register;
