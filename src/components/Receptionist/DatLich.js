import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import AddCaKham from "./AddCaKham"
import { checkErrCode } from '../Layout/checkErrCode';
import './DatLich.css';



class DatLich extends Component {
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

      this.duyetDatLich = this.duyetDatLich.bind(this);
    }

    componentDidMount() {
      var proxy = 'https://doanhttt.herokuapp.com/'
      var id= localStorage.getItem('id_patient');
      var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/recip/getListDatLich';
      fetch(proxy+apiadd,{
          method: 'GET',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Origin': '',
            'token' : localStorage.getItem('userData'),
          },
      })
      .then(response =>  response.json())
      .then(resData => {
        checkErrCode(resData.errCode);
          console.log("resData");
          console.log(resData);
         this.setState({result:resData.arr});
      })

    }

    loadGender(i) {
      switch (i) {
        case "0":
          return "Nữ";
          break;
        case "1":
          return "Nam";
        default:
          return "Khác";

      }
    }

    reloadAfterAccept(iddatLich) {
      // var a = document.getElementById("datlich"+iddatLich);
      // a.hidden = true;
      this.setState({result: this.state.result.filter((rs) =>
        rs.iddatLich != iddatLich
      )});
    }

    duyetDatLich(iddatLich) {
      if(confirm("Phê duyệt yêu cầu đặt lịch này?")){//eslint-disable-line
        var proxy = 'https://doanhttt.herokuapp.com/'
        var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/recip/datLichThanhCong?idDatLich=' + iddatLich;
        fetch(proxy + apiadd, {
          method: 'POST',
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
            console.log(resData);
            // this.setState({ redirect: true })
            // console.log(resData.errCode)
            this.reloadAfterAccept(iddatLich);
          })

      }
    }

    render() {
      const {result} = this.state;
      if (this.state.redirectToReferrer) {
        return (<Redirect to={'/login'} />)
      }
      return (
        <div className="row">
        <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
          <h3>Danh sách đặt lịch</h3>
         <div className="tableDatlich">
          <table>
            <thead>
              <tr>
                <th className="col_1">STT</th>
                <th>Tên bệnh nhân</th>
                <th>Giới tính</th>
                <th>Ngày sinh</th>
                <th>Số điện thoại</th>
                <th>Địa chỉ</th>
                <th>Nội dung</th>
                <th>Thời gian đặt</th>
                <th>Thời gian khám</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
            {console.log("rs phong:")}
            {console.log(result)}
              {result.map((row, index)=>(
                <tr key={index} id={"datlich"+row.iddatLich}>
                  <td>{index+1}</td>
                  <td>{row.tenBenhNhan}</td>
                  <td>{this.loadGender(row.gioiTinh)}</td>
                  <td>{row.ngaySinh}</td>
                  <td>{row.phone}</td>
                  <td>{row.diaChi}</td>
                  <td>{row.noiDung}</td>
                  <td>{row.timeDat}</td>
                  <td>{row.timeKham}</td>
                <td><a onClick={()=> this.duyetDatLich(row.iddatLich)}>Duyệt</a></td>
                </tr>
                ))}
            </tbody>
          </table>
         </div>
        </div>
      );
    }
}

export default DatLich;
