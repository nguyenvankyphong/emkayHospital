import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import Calendar from "./CaTruc/Calendar";
import leftPad from 'left-pad';
import Grid from '@material-ui/core/Grid';
import {checkErrCode} from '../Layout/checkErrCode';

class LichTruc extends Component {


  constructor(props) {
    super(props);

    const today = new Date();

    const dateOfMonth = today.getDate();
    const monthOfYear = today.getMonth() + 1; // 0 based
    const year        = today.getFullYear();

    this.state = {
      redirectToReferrer : false,
      listCaTruc: [],
      day: dateOfMonth,
      month: monthOfYear,
      year: year,
      room: {},
      listRoom: [],
      listSidebar: [{text: "Home", path: "/doctor"},
                    {text: "Lịch trực", path: "/doctor/lichtruc"}],
    };

    this.renderListCaTruc = this.renderListCaTruc.bind(this);
    this.renderListCaTruc = this.renderListCaTruc.bind(this);
  }

  componentWillMount() {


  }

  loadRoom() {
    var proxy = 'https://cors-anywhere.herokuapp.com/'
    fetch(proxy+'http://168.61.49.94:8080/DOANHTTT/rest/doctor/getListPhongKham',{
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
      checkErrCode(resData.errCode);
        this.setState({ listRoom: [...resData.arr]});
        this.setState({ room: {...resData.arr[0]}});

    })
  }

  componentDidMount() {
    if (localStorage.truongKhoa === "true") {
      let listSidebar = [...this.state.listSidebar];
      listSidebar.push({text: "Lịch trực", path: "/doctor/lichtruc"});
      this.setState({ listSidebar });
    }
    var self = this;
    var proxy = 'https://cors-anywhere.herokuapp.com/'
    fetch(proxy+'http://168.61.49.94:8080/DOANHTTT/rest/doctor/getListPhongKham',{
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
      checkErrCode(resData.errCode);
        this.setState({
          listRoom: [...resData.arr],
          room: {...resData.arr[0]}
        });
        this.loadData(this.state.room, this.state.month, this.state.year)

    })
  }

  loadData(room, month, year) {
    console.log("load data");
    var proxy = 'https://cors-anywhere.herokuapp.com/'
    fetch(proxy+'http://168.61.49.94:8080/DOANHTTT/rest/doctor/getAllCaKham?idPhong='+localStorage.idPhongKham+'&month='+month+'&year='+year,{
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
      checkErrCode(resData.errCode);
      console.log(resData);
      console.log(resData);
      this.setState({ listCaTruc: resData.arr});
      console.log(this.state);
    })

  }

  onChangeMonth = (e) => {
    this.setState({ month: e.target.value });
    this.loadData(this.state.room, e.target.value, this.state.year);
  }

  onChangeYear = (e) => {
    this.setState({ year: e.target.value });
    this.loadData(this.state.room, this.state.month, e.target.value);
  }

  onChangeRoom = (e) => {
    console.log("onchange room");
    console.log(e.target.value);
    var b = document.getElementById('selectRoom');

    var room = this.state.listRoom.find((item) => {return item.idPhongKham == e.target.value})
    b.value = room.idPhongKham;
    localStorage.setItem('idPhongKham', room.idPhongKham);
    this.setState({ room: {...room} });
    this.loadData(room, this.state.month, this.state.year);
  }

  renderListCaTruc() {
    return this.state.listCaTruc.map((item, index) => (
      <div key = {index}>
        Tên: {item.HoTen}
      </div>
    ))
  }

  renderCalendar() {
    return {

    }
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }



    const end = 2020;
    const start = 1900;
    const yearRange = Array.from({length: (end - start)}, (v, k) => k + start);

    const formattedDate = [
      leftPad(this.state.year, 4, 0),
      leftPad(this.state.month, 2, 0),
      leftPad(this.state.day, 2, 0)
    ].join("-");


    return (
      <div>
        <Sidebar listSidebar= {this.state.listSidebar} current_path = {window.location.pathname}/>
          <div className="row" id="Body">
            <div className="App">
              <form className="year-selection">
                <Grid container spacing={24}>
                  <Grid item xs = {4} >
                    <label htmlFor="room">Room</label>
                    <select name="room" onChange={this.onChangeRoom} id="selectRoom" value={localStorage.idPhongKham}>
                      {this.state.listRoom.map( (room) => {
                        return <option key={room.idPhongKham} value={room.idPhongKham}>{room.SoPhong}-{room.TenPhong}</option>
                      })}
                    </select>
                  </Grid>
                  <Grid item xs = {4}>
                    <label htmlFor="month">Month</label>
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
                  <Grid item xs={4}>

                      <label htmlFor="year">Year</label>

                      <select name="year" value={this.state.year} onChange={this.onChangeYear}>
                        {yearRange.map( (year) => {
                          return <option key={year} value={year}>{year}</option>
                        })}
                      </select>

                  </Grid>

                </Grid>
              </form>

              <div id="calendar">
                <Calendar date={formattedDate} list={this.state.listCaTruc} room={this.state.room}/>
              </div>
            </div>
          </div>
      </div>

    );
  }
}

export default LichTruc;
