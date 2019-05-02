import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../../../Sidebar/Sidebar";
import '../../Patient.css';
import Hoa_don from './Hoa_don';

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      result:[],
      result1:[],
      redirectToReferrer: false,
      listSidebar: [{ text: "Home", path: "/patients/patient" },
      { text: "Lịch sử khám bệnh", path: "/patients/patient/history" },
      { text: "Lịch tái khám", path: "/patients/patient/lich_tai_kham" },
      { text: "Đặt lịch khám", path: "/patients/patient/dat_lich_kham" },
      { text: "Góp ý", path: "/patients/patient/gopy" }],
    };
    this.componentWillMount= this.componentWillMount.bind(this);
    this.chonHoSo= this.chonHoSo.bind(this);
  }

  componentWillMount() {
    var proxy = 'https://doanhttt.herokuapp.com/'
    var id= sessionStorage.getItem('idDK');
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/recip/getHoSoByDotKham?idHSDK='+id;
    fetch(proxy+apiadd,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': '',
          'Token' : sessionStorage.getItem('userData'),
        },
    })
    .then(response =>  response.json())
    .then(resData => {
       console.log(JSON.stringify(resData))
       this.setState({result:resData.result});
    })

  }

  chonHoSo() {

  }

  handleStatus(status){
      if(status == 2){
          return "Đã khám"
      }else{
          return "Chưa khám"
      }
  }
  render() {
    const {result,result1} = this.state;
    console.log("rs:");
    console.log(result);
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'} />)
    }

    return (
      <div className="row">
      <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
        <div className ="hoso">
          <h3>Hồ sơ khám bệnh</h3>
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Số phòng</th>
                <th>Tên phòng</th>
                <th>Thời gian</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody>
              {result.map((row, index)=>(
                <tr>
                    <td>{index+1}</td>
                    <td>{row.soPhong}</td>
                    <td>{row.tenPhong}</td>
                    {row.status == 2?
                    <td>{row.time}</td>:
                    <td></td>
                  }
                  <td><a onClick={this.chonHoSo}>{this.handleStatus(row.status)}</a></td>
                </tr>

                ))}
            </tbody>
          </table>
          <div className = "hoadon">
            <Hoa_don />
          </div>
        </div>
        <div className = "ketquakham">
          Kết quả khám bệnh
          <Hoa_don />
        </div>
        <div className="clear"></div>
      </div>
    );
  }
}

export default Home;
