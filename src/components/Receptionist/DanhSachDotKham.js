import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import leftPad from 'left-pad';
import Grid from '@material-ui/core/Grid';
import { checkErrCode } from '../Layout/checkErrCode';

class Home extends Component {
  constructor(props) {
    super(props);

    const today = new Date();

    const dateOfMonth = today.getDate();
    const monthOfYear = today.getMonth() + 1; // 0 based
    const year = today.getFullYear();

    this.state = {
      redirectToReferrer: false,
      listCaTruc: [],
      day: dateOfMonth,
      month: monthOfYear,
      year: year,
      room: {},
      listRoom: [],
      listDotKham: [],
      redirectThanhToan:false,
      listSidebar: [{ text: "Home", path: "/doctor" },
      { text: "Lịch làm việc", path: "/doctor/lichlamviec" }],
    };

    this.renderListCaTruc = this.renderListCaTruc.bind(this);
    this.renderListCaTruc = this.renderListCaTruc.bind(this);
    this.xemHoaDon = this.xemHoaDon.bind(this);
  }

  componentWillMount() {


  }

  componentDidMount() {
    const formattedDate = [
      leftPad(this.state.year, 4, 0),
      leftPad(this.state.month, 2, 0),
      leftPad(this.state.day, 2, 0)
    ].join("-");
    console.log("get đợt khám");
    var self = this;
    var proxy = 'https://doanhttt.herokuapp.com/'
    fetch(proxy + 'http://168.61.49.94:8080/DOANHTTT/rest/recip/getAllDotKhamTheoNgay?date='+ formattedDate, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Token': localStorage.getItem('userData'),
      },
    })
      .then(response => response.json())
      .then(resData => {
        checkErrCode(resData.errCode);
        console.log("resData đợt khám1");
        console.log(resData);
        this.setState({
          listDotKham: [...resData.result]
        });
         this.loadData(this.state.day, this.state.month, this.state.year)


      })
  }


  loadData(day, month, year) {
    console.log("loaddata");
    const formattedDate = [
      leftPad(year, 4, 0),
      leftPad(month, 2, 0),
      leftPad(day, 2, 0)
    ].join("-");
    console.log(formattedDate);
    var proxy = 'https://doanhttt.herokuapp.com/'
    fetch(proxy + 'http://168.61.49.94:8080/DOANHTTT/rest/recip/getAllDotKhamTheoNgay?date=' + formattedDate, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Token': localStorage.getItem('userData'),
      },
    })
      .then(response => response.json())
      .then(resData => {
        checkErrCode(resData.errCode);
        console.log("resData đợt khám");
        console.log(resData);
        this.setState({ listDotKham: resData.result});

      })

  }


  onChangeMonth = (e) => {
    this.setState({ month: e.target.value });
    this.loadData(this.state.day, e.target.value, this.state.year);
  }

  onChangeYear = (e) => {
    this.setState({ year: e.target.value });
    this.loadData(this.state.day, this.state.month, e.target.value);
  }

  onChangeDay = (e) => {
    this.setState({ day: e.target.value });
    this.loadData(e.target.value, this.state.month, this.state.year);
  }

  renderListCaTruc() {
    return this.state.listCaTruc.map((item, index) => (
      <div key={index}>
        Tên: {item.HoTen}
      </div>
    ))
  }

  renderCalendar() {
    return {

    }
  }
  xemHoaDon(IdHoSoDotKham){
    this.setState({redirectThanhToan: true});
    localStorage.setItem("IdHoSoDotKham",IdHoSoDotKham);
  }
  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'} />)
    }
    if(this.state.redirectThanhToan){
      return (<Redirect to={'/receptionist/thanhtoan'} />)
    }
    console.log(this.state.listDotKham);
    const end = 2020;
    const start = 1900;
    const yearRange = Array.from({ length: (end - start) }, (v, k) => k + start);
    let daysOfMonth = () => {
      return new Date(this.state.year, this.state.month, 0).getDate()
    }

    var dayRange = Array.from({ length: daysOfMonth() }, (v, k) => k + 1);

    const formattedDate = [
      leftPad(this.state.year, 4, 0),
      leftPad(this.state.month, 2, 0),
      leftPad(this.state.day, 2, 0)
    ].join("-");

    var renderDotKham = () => {
      if (this.state.listDotKham.length == 0) {
        return <h5>Hiện không có đợt khám nào đã hoàn thành và chưa thanh toán</h5>
      }
      return <table className="table">
                <thead>
                  <tr>
                    <th className="col_1">STT</th>
                    <th>Tên bệnh nhân</th>
                    <th>Thông tin bệnh</th>
                    <th>Ngày sinh</th>
                    <th>Địa chỉ</th>
                    <th>Số điện thoại</th>
                    <th>Chức năng</th>
                  </tr>
                </thead>
                <tbody>
                {this.state.listDotKham.map((row,index) => (
                   <tr key= {index}>
                    <td>{index+1}</td>
                      <td>{row.tenBenhNhan}</td>
                      <td>{row.ThongTinBenh}</td>
                      <td>{row.ngaySinh}</td>
                      <td>{row.diaChi}</td>
                      <td>{row.soDienThoai}</td>
                      <td><a onClick={()=>this.xemHoaDon(row.IdHoSoDotKham)}>Xem hóa đơn</a></td>
                   </tr>
                  ))

                  }

                </tbody>
              </table>
    }

    return (
      <div>
        <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
        <div className="row" id="Body">
          <div className="App">
            <h2 className="titleA">Danh sách đợt khám</h2>
            <form className="year-selection">
              <Grid container spacing={24}>
                <Grid item xs={3} >
                </Grid>
                <Grid item xs={2}>
                  <label htmlFor="day">Ngày</label>
                  <select name="day" value={this.state.day} onChange={this.onChangeDay}>
                    {dayRange.map((day) => {
                      return <option key={day} value={day}>{day}</option>
                    })}
                  </select>
                </Grid>
                <Grid item xs={2}>
                  <label htmlFor="month">Tháng</label>
                  <select name="month" value={this.state.month} onChange={this.onChangeMonth}>
                    <option value="1">01 - January</option>
                    <option value="2">02 - February</option>
                    <option value="3">03 - March</option>
                    <option value="4">04 - April</option>
                    <option value="5">05 - May</option>
                    <option value="6">06 - June</option>
                    <option value="7">07 - July</option>
                    <option value="8">08 - August</option>
                    <option value="9">09 - September</option>
                    <option value="10">10 - October</option>
                    <option value="11">11 - November</option>
                    <option value="12">12 - December</option>
                  </select>
                </Grid>
                <Grid item xs={2}>
                  <label htmlFor="year">Năm</label>
                  <select name="year" value={this.state.year} onChange={this.onChangeYear}>
                    {yearRange.map((year) => {
                      return <option key={year} value={year}>{year}</option>
                    })}
                  </select>
                </Grid>
              </Grid>
            </form>
            {renderDotKham()}
          </div>

        </div>
      </div>

    );
  }
}

export default Home;
