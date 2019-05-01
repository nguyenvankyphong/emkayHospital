import React, { Component } from 'react';
import moment from 'moment';
import MomentCalendarFactory from 'moment-calendar-2/src/api';
import './Calendar.css';
import Grid from '@material-ui/core/Grid';
import SimpleModal from './SimpleModal'
import { Link } from 'react-router-dom'


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

    var item = this.state.list.find((item) => {
      let thisDay = new Date(item.ngay);
      if (thisDay.getDate() == day) return item;
    })
    if (typeof item !== 'undefined') {
      return <Grid container spacing={24} className="">
            <Grid item xs = {12}><a href={"/doctor/khambenh/"+item.idCakham}>{day}</a></Grid>
            <Grid item xs = {12}>Ca {item.buoi} - {item.tenPhong}</Grid>
          </Grid>}
    return <Grid container spacing={24} className="">
                                <Grid item xs = {12}>{day}</Grid>
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
                        {day == ""? <div>{"\u00a0"}</div> : <div>
                            {isNaN(day) ? day : this.loadCaTrucTrongNgay(day)}
                          </div>
                        }
                  </div>
            })}
          </div>
        } else {
          return <div className="week" key={i}>
          {days.map( (day, di) =>{
            return <div className="dayTitle" key={di}>
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
