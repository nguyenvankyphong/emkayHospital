import React, { Component } from 'react';
import moment from 'moment';
import MomentCalendarFactory from 'moment-calendar-2/src/api';
import './Calendar.css';
import Grid from '@material-ui/core/Grid';
import SimpleModal from './SimpleModal'


class Calendar extends Component {

  constructor(props) {
    super(props)

    window.moment = moment;

    this.state = {
      date: this.props.date,
      list: this.props.list,
      room: this.props.room
    };

    this.loadCaTrucTrongNgay = this.loadCaTrucTrongNgay.bind(this);

    this.calendar = MomentCalendarFactory.getInstance();
  }

  componentWillReceiveProps(newProps){
    this.setState({
      date: newProps.date,
      list: newProps.list,
      room: newProps.room
    });
  }



  loadCaTrucTrongNgay(day) {
    // console.log("this.state.list")
    // console.log(this.state.list)
    var listOfThisDay = this.state.list.filter((item) => {
      let thisDay = new Date(item.Ngay);
      if (thisDay.getDate() == day) return item;
    })
    var ca1 = listOfThisDay.filter((item) => {
      if (item.Buoi == 1) return item;
    })
    var ca2 = listOfThisDay.filter((item) => {
      if (item.Buoi == 2) return item;
    })
    var ca3 = listOfThisDay.filter((item) => {
      if (item.Buoi == 3) return item;
    })

    var date = new Date(this.props.date);
    date.setDate(day);

    return <Grid container spacing={24} className="">
      <Grid item xs = {12}><SimpleModal name = {day} list={listOfThisDay} room={this.props.room} date={date}/></Grid>
      <Grid item xs = {12} className="caItem">Ca 1({ca1.length})</Grid>
      <Grid item xs = {12} className="caItem">Ca 2({ca2.length})</Grid>
      <Grid item xs = {12} className="caItem">Ca 3({ca3.length})</Grid>
    </Grid>
  }

  render() {

    this.calendar.setCurrentDate(this.state.date);
    const weeks = this.calendar.getWeeksTable(true);
    // console.log("begin");
    // console.log(this.state.date);

    return <div className="calendar">
      {weeks.map( (days, i) => {
        // console.log("week: " + i);
        if (i != 0) {
          return <div className="week ca" key={i}>
            {days.map( (day, di) =>{
              return <div className="day" key={di}>
                        {day == ""? <div><a className="dateItem">{"\u00a0"}</a></div> : <div>
                            {isNaN(day) ? day : this.loadCaTrucTrongNgay(day)}
                          </div>
                        }
                  </div>
            })}
          </div>
        } else {
          return <div className="week" key={i}>
          {days.map( (day, di) =>{
            return <div className="dayTitle caItem" key={di}>
              {day || "\u00a0"}
            </div>
          })}
        </div>
        }
      })}
    </div>
  }
}

export default Calendar;
