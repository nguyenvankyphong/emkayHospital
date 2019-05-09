import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../../../Sidebar/Sidebar";
import '../../Patient.css';
import Hoa_don from './Hoa_don';
import KetQuaKhamBenh from './KetQuaKhamBenh';
import ReactDOM from 'react-dom';
import Grid from '@material-ui/core/Grid';
import {checkErrCode} from '../../../Layout/checkErrCode';

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
    var id= localStorage.getItem('idDK');
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/recip/getHoSoByDotKham?idHSDK='+id;
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
      this.setState({result:resData.result});
    })

  }

  chonHoSo(IdHSKB) {
    // console.log("chọn hồ sơ");
    // console.log(IdHSKB);
    ReactDOM.render(<div></div>, document.getElementById("ketquakham"));
    localStorage.setItem("idHoSoKhamBenh", IdHSKB);

    ReactDOM.render(<KetQuaKhamBenh idHoSo={IdHSKB}/>, document.getElementById("ketquakham"));
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
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'} />)
    }

    return (
      <div className="row">
        <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
        <Grid container spacing={24}>
          <Grid item xs={5}>
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
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{row.soPhong}</td>
                    <td>{row.tenPhong}</td>
                    {row.status == 2?
                    <td>{row.time}</td>:
                    <td></td>
                  }
                  <td><a onClick={() => this.chonHoSo(row.IdHSKB)}>{this.handleStatus(row.status)}</a></td>
                </tr>

                ))}
            </tbody>
          </table>
          <div className = "hoadon">
            <Hoa_don />
          </div>
          </Grid>
          <Grid item xs={7}>
            <div id = "hosokhambenh">
              Kết quả khám bệnh
              <div id = "ketquakham"></div>

            </div>
          </Grid>
        </Grid>

      </div>
    );
  }
}

export default Home;
