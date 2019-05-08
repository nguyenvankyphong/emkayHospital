import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../../Sidebar/Sidebar";
import '../Patient.css';
import { Link } from '@material-ui/core';
import {checkErrCode} from '../../Layout/checkErrCode';

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      result:[],
      redirectToReferrer: false,
      listSidebar: [{ text: "Home", path: "/patients/patient" },
      { text: "Lịch sử khám bệnh", path: "/patients/patient/history" },
      { text: "Lịch tái khám", path: "/patients/patient/lich_tai_kham" },
      { text: "Đặt lịch khám", path: "/patients/patient/dat_lich_kham" },
      { text: "Góp ý", path: "/patients/patient/gopy" }],
    };
    this.componentWillMount= this.componentWillMount.bind(this);
  }

  componentWillMount() {
    var proxy = 'https://doanhttt.herokuapp.com/'
    var id= localStorage.getItem('id_patient');
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/recip/getDotKhamByIdBenhNhan?idBenhNhan='+id;
    fetch(proxy+apiadd,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': '',
          'Token' : localStorage.getItem('userData'),
        },
    })
    .then(response =>  response.json())
    .then(resData => {
      checkErrCode(resData.errCode);
       console.log(JSON.stringify(resData))
       console.log("id :"+id);
       this.setState({result:resData.result});
    })
  }
  hoSoKhamBenh(id){
    var proxy = 'https://doanhttt.herokuapp.com/'
    var id= localStorage.getItem('id_patient');
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/recip/getDotKhamByIdBenhNhan?idBenhNhan='+id;
    fetch(proxy+apiadd,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': '',
          'Token' : localStorage.getItem('userData'),
        },
    })
    .then(response =>  response.json())
    .then(resData => {
      checkErrCode(resData.errCode);
       console.log(JSON.stringify(resData))
       console.log("id :"+id);
       this.setState({result:resData.result});
    })
  }
 
  render() {
    const {result} = this.state;
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'} />)
    }

    return (
      <div className="row">
        <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
        <h3>Danh sách đợt khám</h3>
        <table className="table">
          <thead>
            <tr>
              <th>STT</th>
              <th>Thông tin bệnh</th>
              <th>Ngày khám</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {result.map((row, index)=>(
              <tr>
                <td>{index+1}</td>
                <td><Link onClick= {()=>this.hoSoKhamBenh(row.IdHoSoDotKham)}>{row.ThongTinBenh}</Link></td>
                <td>{row.NgayKham}</td>
                <td>{row.Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}

export default Home;
