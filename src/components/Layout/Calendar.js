import React, {Component} from 'react';
import moment from 'moment';

class Calendar extends Component {


  constructor(props) {
    super(props);

    this.state = {
    };


  }

  componentDidMount() {
  }

  weekdayshort = moment.weekdaysShort();


  render() {

    let weekdayshortname = this.weekdayshort.map(day => {
     return (
       <th key={day} className="week-day">
        {day}
       </th>
     );
  });

    return (
      <div>
        Calendar
        {weekdayshortname}
      </div>
    );
  }
}

export default Calendar;
