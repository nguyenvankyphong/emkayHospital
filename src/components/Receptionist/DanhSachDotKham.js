import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import leftPad from 'left-pad';
import Grid from '@material-ui/core/Grid';
import {checkErrCode} from '../Layout/checkErrCode';

class Home extends Component {
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
                    {text: "Lịch làm việc", path: "/doctor/lichlamviec"}],
    };

    this.renderListCaTruc = this.renderListCaTruc.bind(this);
    this.renderListCaTruc = this.renderListCaTruc.bind(this);
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
    fetch(proxy+'http://168.61.49.94:8080/DOANHTTT/rest/recip/getCaKhamByDate?date='+formattedDate,{
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
        console.log("resData đợt khám");
        console.log(resData);
        this.setState({
          // listCaTruc: [...resData.arr]
        //   listRoom: [...resData.arr],
        //   room: {...resData.arr[0]}
        });
        // this.loadData(this.state.room, this.state.month, this.state.year)

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
      fetch(proxy+'http://168.61.49.94:8080/DOANHTTT/rest/recip/getCaKhamByDate?date='+formattedDate,{
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
          console.log("resData đợt khám");
          console.log(resData);
         // this.setState({ listCaTruc: resData.arr});

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
    let daysOfMonth = () => {
      return new Date(this.state.year, this.state.month, 0).getDate()
    }

    var dayRange = Array.from({length: daysOfMonth()}, (v, k) => k + 1);

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
              <h2 className="titleA">Lịch Làm Việc</h2>
              <form className="year-selection">
                <Grid container spacing={24}>
                  <Grid item xs = {3} >
                  </Grid>
                  <Grid item xs={2}>
                      <label htmlFor="day">Day</label>
                      <select name="day" value={this.state.day} onChange={this.onChangeDay}>
                        {dayRange.map( (day) => {
                          return <option key={day} value={day}>{day}</option>
                        })}
                      </select>
                  </Grid>
                  <Grid item xs = {2}>
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
                  <Grid item xs={2}>
                      <label htmlFor="year">Year</label>
                      <select name="year" value={this.state.year} onChange={this.onChangeYear}>
                        {yearRange.map( (year) => {
                          return <option key={year} value={year}>{year}</option>
                        })}
                      </select>
                  </Grid>
                </Grid>
              </form>
            </div>
          </div>
      </div>

    );
  }
}

export default Home;
