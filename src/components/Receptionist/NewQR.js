import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import ReactDOM from 'react-dom';
import {checkErrCode} from '../Layout/checkErrCode';


class QRImg extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
      };
  }

  render() {
    return <div>
      <h1>QR</h1>
      <img src = {this.props.qr}></img>
    </div>
  }
}

class NewQR extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sdt: '',
      qr: '',
      listSidebar: [{text: "Home", path: "/receptionist"},
      {text: "Tạo tài khoản", path: "/receptionist/register"},
      { text: "Đặt lịch khám", path: "/receptionist/datLich" },
      { text: "Thêm khoản phí", path: "/receptionist/addKhoanPhi" },
      { text: "Xuất hóa đơn", path: "/receptionist/xuatHoaDon" },
      {text: "Tạo QR mới", path: "/receptionist/newqr"}],
    };

    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
  }

  submit() {

    if(this.state.sdt){
      var request = new XMLHttpRequest()
      var proxy = 'https://doanhttt.herokuapp.com/'

      // Open a new connection, using the GET request on the URL endpoint
      request.open('POST', proxy+'http://168.61.49.94:8080/DOANHTTT/rest/account/creatQR', true)
      request.setRequestHeader("content-type","application/json")
      request.setRequestHeader("Token", localStorage.getItem('userData'))

      console.log("sđt:" + this.state.sdt + " - " + JSON.stringify(this.state.sdt));
      request.send(this.state.sdt);
      var rs = {};
      console.log("token:"+ localStorage.getItem('userData'));



      const scope = this;
      request.onload = function () {
        console.log("response: ");
        console.log(this.response);
        rs = JSON.parse(this.response);

      //   if (!rs.errCode) {
      //     scope.setState({qr: rs.value});
      //      ReactDOM.render(<img src = {rs.value}></img>, document.getElementById("qrimg"));
      //   // console.log(scope.state);
      // } else {
      //
      // }
        checkErrCode(rs.errCode);

        switch (rs.errCode) {
          case 0:
            scope.setState({qr: rs.value});
            ReactDOM.render(<img src = {rs.value}></img>, document.getElementById("qrimg"));
            break;
          case 2:
            localStorage.clear();
            scope.setState({redirectToReferrer: true});
        }
    }
    }
   }


   add() {
     ReactDOM.render(<QRImg />, document.getElementById("qrimg"))
   }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
    // console.log(this.state);
   }

  render() {
    console.log("render");
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }

    return (
      <div>
        {console.log(this.state)}
        <Sidebar listSidebar= {this.state.listSidebar} current_path = {window.location.pathname}/>
        <div className="row" id="Body">
          <div className="medium-4 columns left">
              <h1>Tạo mới QR</h1>
              <label>Số điện thoại</label>
              <input type="text" ref="someUser" name="sdt" placeholder="Số điện thoại" onChange={this.onChange}/>
              <div className= "bt">
                <input type="submit" className="button success" value="Tạo mã QR mới" onClick={this.submit} />
                <input type="reset" className="button reset" value="reset" onClick={this.handlereset}/>
              </div>
              <div id="qrimg">
              </div>
          </div>

        </div>
      </div>
    );
  }
}

export default NewQR;
