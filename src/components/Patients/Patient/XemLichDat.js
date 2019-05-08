import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../../Sidebar/Sidebar";
import '../Patient.css';
import {checkErrCode} from '../../Layout/checkErrCode';

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      result:[],
      redirectToReferrer: false,
      redirectAdd: false,
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
    var id= sessionStorage.getItem('id_patient');
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/patient/getListDatLich?idBenhNhan='+id;
    fetch(proxy+apiadd,{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': '',
          'token' : sessionStorage.getItem('userData'),
        },
    })
    .then(response =>  response.json())
    .then(resData => {
      checkErrCode(resData.errCode);
       console.log(JSON.stringify(resData))
       this.setState({result:resData.arr});
    })

  }
  handleTinhTrang(isComplete){
      if(isComplete){
          return "Đặt thành công"
      }else{
          return "Chưa duyệt"
      }
  }
  add_Page=()=>{
this.setState({redirectAdd: true});
  }
  render() {
    const {result} = this.state;
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'} />)
    }
if(this.state.redirectAdd){
  return(<Redirect to={'/patients/patient/dat_lich_kham/add'} />)
}
    return (
      <div className="row">
      <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />   
        <h3>Danh sách đặt lịch</h3>
       <div className="table1">
       <input type="submit" className="button" value="Đặt lịch" onClick={this.add_Page} />
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Thời gian đặt</th>
              <th>Nội dung</th>
              <th>Thời gian khám</th>  
              <th>Tình trạng</th>          
            </tr>
          </thead>
          <tbody>
            {result.map((row, index)=>(
              <tr>
                <td>{index+1}</td>
                <td>{row.timeDat}</td>
                <td>{row.noiDung}</td>                
                <td>{row.timeKham}</td>
              <td>{this.handleTinhTrang(row.isComplete)}</td>                                       
              </tr>
              ))}
          </tbody>
        </table>
       </div>
      </div>
    );
  }
}

export default Home;
