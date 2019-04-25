import React, { Component } from 'react';
import moment from 'moment';
import MomentCalendarFactory from 'moment-calendar-2/src/api';
import './Calendar.css';
import Grid from '@material-ui/core/Grid';

class Calendar extends Component {

  constructor(props) {
    super(props)

    window.moment = moment;

    this.state = {
      date: this.props.date
    }

    this.calendar = MomentCalendarFactory.getInstance();
  }

  componentWillReceiveProps(newProps){
    this.setState({
      date: newProps.date
    });
  }

  render() {

    this.calendar.setCurrentDate(this.state.date);
    const weeks = this.calendar.getWeeksTable(true);

    return <div className="calendar">
      {weeks.map( (days, i) => {
        return <div className="week" key={i}>
          {days.map( (day, di) =>{
            return <div className="day" key={di}>
                <Grid container spacing={24}>
                    <Grid item xs = {12}>
                        {day || "\u00a0"}
                        {console.log(day == "")}
                    </Grid>
                  </Grid>
                </div>
          })}
        </div>
      })}
    </div>
  }
}

export default Calendar;
