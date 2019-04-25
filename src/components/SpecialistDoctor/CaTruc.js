import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import Calendar from "../Layout/Calendar";
import leftPad from 'left-pad';
import Grid from '@material-ui/core/Grid';

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
      listSidebar: [{text: "Home", path: "/doctor"},
                    {text: "Thêm hồ sơ khám bệnh", path: "/doctor/hoso"},
                    {text: "Lịch trực", path: "/doctor/lichtruc"}],
    };

    this.renderListCaTruc = this.renderListCaTruc.bind(this);
  }

  componentDidMount() {
    var proxy = 'https://cors-anywhere.herokuapp.com/'
    fetch(proxy+'http://168.61.49.94:8080/DOANHTTT/rest/doctor/getAllCaKham?idPhong=1&month=4&year=2019',{
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
       resData.arr.map(item => (
         this.setState({ listCaTruc: resData.arr})
       ))
       // this.setState({ listBenhNhan: resData.listBenhNhan});

    })
  }

  renderListCaTruc() {
    return this.state.listCaTruc.map((item, index) => (
      <div key = {index}>
      {console.log("a")}
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
                  <Grid item xs = {3}/>
                  <Grid item xs = {3}>
                    <label htmlFor="month">Month</label>
                    <select name="month" value={this.state.month} onChange={(e) => this.setState({month: e.target.value})}>
                      <option value="01">01 - January</option>
                      <option value="02">02 - February</option>
                      <option value="03">03 - March</option>
                      <option value="04">04 - April</option>
                      <option value="05">05 - May</option>
                      <option value="06">06 - June</option>
                      <option value="07">07 - July</option>
                      <option value="08">08 - August</option>
                      <option value="09">09 - September</option>
                      <option value="10">10 - October</option>
                      <option value="11">11 - November</option>
                      <option value="12">12 - December</option>
                    </select>
                  </Grid>
                  <Grid item xs={3}>

                      <label htmlFor="year">Year</label>

                      <select name="year" value={this.state.year} onChange={(e) => this.setState({year: e.target.value})}>
                        {yearRange.map( (year) => {
                          return <option key={year} value={year}>{year}</option>
                        })}
                      </select>

                  </Grid>

                </Grid>
              </form>
              <Calendar date={formattedDate}/>
            </div>
          </div>
      </div>

    );
  }
}

export default LichTruc;
