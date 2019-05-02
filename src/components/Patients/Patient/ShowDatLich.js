import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Route} from 'react-router-dom';
import XemLichDat from './XemLichDat';
import Dat_lich_kham from './Dat_lich_kham';


class Patient extends Component {


  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer : false,
      listSidebar: [{text: "Home", path: "/patients/patient"},
                    {text: "Lịch sử khám bệnh", path: "/register"},
                    {text: "Lịch tái khám", path: "/patients/patient"},
                    {text: "Đặt lịch khám", path: "/patients/patient"},
                    {text: "Góp ý", path: "/patients/patient"}],
    };
  }

  componentWillMount() {

  }
  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }

    return (
      <div>
        <Route exact path={this.props.match.path} component={XemLichDat} />
        <Route path={`${this.props.match.path}/add`} component={Dat_lich_kham} />
      </div>
    );
  }
}

export default Patient;
