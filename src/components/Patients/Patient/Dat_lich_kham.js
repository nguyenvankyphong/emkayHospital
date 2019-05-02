import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../../Sidebar/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer: false,
      time: '',
      thongTinBenh: '',
      startDate: new Date(),
      listSidebar: [{ text: "Home", path: "/patients/patient" },
      { text: "Lịch sử khám bệnh", path: "/patients/patient/history" },
      { text: "Lịch tái khám", path: "/patients/patient/lich_tai_kham" },
      { text: "Đặt lịch khám", path: "/patients/patient/dat_lich_kham" },
      { text: "Góp ý", path: "/patients/patient/gopy" }],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeDate = this.handleChangeDate.bind(this);
  }
  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }
  handleChangeDate(date) {
    this.setState({
      startDate: date
    });
  }
  componentWillMount() {

  }
  add = () => {
    var arr = [];
    var id_patient = sessionStorage.getItem("id_patient");
    arr.push(this.state.thongTinBenh);
    var aDate = this.state.startDate;
    console.log(aDate)
    arr.push(aDate.getFullYear() + "-" + (parseInt(aDate.getMonth())+1) + "-" + aDate.getDate());
    console.log(arr);
    var proxy = 'https://doanhttt.herokuapp.com/'
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/patient/datLichKham?idBenhNhan=' + id_patient;
    fetch(proxy + apiadd, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'token': sessionStorage.getItem('userData'),
      },
      body: (JSON.stringify(arr)),
    })
      .then(response => response.json())
      .then(resData => {
        this.setState({ redirect: true })
        console.log(resData.errCode)
      })

  }
  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'} />)
    }
    if (this.state.redirect) {
      return (<Redirect to={'/patients/patient/dat_lich_kham'} />)
    }
    return (
      <div>
        <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
        <div className="row" id="Body">
          <h2 className="title">Đặt lịch khám</h2>
          <div className="medium-3 columns" id="tt">
            <h6>Thời gian:</h6>
            <DatePicker
              dateFormat="yyyy-MM-dd"
              selected={this.state.startDate}
              onChange={this.handleChangeDate}
              minDate={new Date()}
              placeholderText="Select date"
            />
            <h6>Thông tin bệnh:</h6>
            <textarea rows="4" cols="50" name="thongTinBenh" onChange={this.handleChange} >
             
            </textarea>
            <div className="bt">
              <input type="submit" className="button success" value="Đặt lịch" onClick={this.add} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
