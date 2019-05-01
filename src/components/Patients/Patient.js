import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import BenhAn from './BenhAn';
import {Route} from 'react-router-dom';
import index from './Patient/index';
import update_Info from './Patient/Update_Info';
import History_kham_benh from './Patient/History/History_kham_benh';
import Lich_tai_kham from './Patient/Lich_tai_kham';
import Dat_lich_kham from './Patient/Dat_lich_kham';
import Gopy from './Patient/Gopy';


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
        <Route exact path={this.props.match.path} component={index} />
        <Route path={`${this.props.match.path}/update_Info`} component={update_Info} />
        <Route path={`${this.props.match.path}/history`} component={History_kham_benh} />
        <Route path={`${this.props.match.path}/lich_tai_kham`} component={Lich_tai_kham} />
        <Route path={`${this.props.match.path}/dat_lich_kham`} component={Dat_lich_kham} />
        <Route path={`${this.props.match.path}/gopy`} component={Gopy} />
      </div>
    );
  }
}

export default Patient;
