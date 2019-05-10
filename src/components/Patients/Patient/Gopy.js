import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../../Sidebar/Sidebar";
import '../Patient.css';
import {checkErrCode} from '../../Layout/checkErrCode';

class Home extends Component {


  constructor(props) {
    super(props);
    this.state = {
      redirectToReferrer: false,
      arr:[],
      listSidebar: [{ text: "Home", path: "/patients/patient" },
      { text: "Lịch sử khám bệnh", path: "/patients/patient/history" },
      { text: "Lịch tái khám", path: "/patients/patient/lich_tai_kham" },
      { text: "Đặt lịch khám", path: "/patients/patient/dat_lich_kham" },
      { text: "Góp ý", path: "/patients/patient/gopy" }],
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentWillMount() {
    var proxy = 'https://doanhttt.herokuapp.com/'
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/recip/getChuyenKhoa';
    fetch(proxy + apiadd, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'token': localStorage.getItem('userData'),
      },
    })
      .then(response => response.json())
      .then(resData => {
        checkErrCode(resData.errCode);
        console.log(JSON.stringify(resData))
        this.setState({arr: resData.arr});

      })
  }
  them=()=>{
    var proxy = 'https://doanhttt.herokuapp.com/'
    var idPhongBan= this.refs.chuyenkhoa.value;
    var noidung = this.refs.noidung.value;
    console.log(noidung);
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/patient/comment?idPhongBan='+idPhongBan;
    fetch(proxy + apiadd, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'token': localStorage.getItem('userData'),
      },
      body: noidung
    })
      .then(response => response.json())
      .then(resData => {
        console.log(resData);
        if (resData.errCode==0) {
          alert("Góp ý thành công");
          this.refs.noidung.value ="";
          // window.location.reload();
        }
      })
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value
    });
}
  render() {
    const {arr} = this.state;
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'} />)
    }

    return (
      <div>
        <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
        <div className="gopy">
          <h2>Thêm góp ý</h2>
          <div className="form">
            <select ref="chuyenkhoa" className="select" onChange={this.handleChange}>
            {arr.map(row =>(
              <option key= {row.idChuyenKhoa} value={row.idChuyenKhoa}>{row.tenChuyenkhoa}</option>
            ))}
            </select>
            <textarea rows="4" cols="50" ref= "noidung"  onChange={this.handleChange} name= "noidung"></textarea>
          </div>
          <div className="bt">
            <input type="submit" className="button success" value="Thêm" onClick ={this.them}/>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
