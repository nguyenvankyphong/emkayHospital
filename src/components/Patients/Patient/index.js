import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../../Sidebar/Sidebar";
import InfoPatient from './InfoPatient';
import BenhAn from '../BenhAn';

class index extends Component {


  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer : false,
      listSidebar: [{ text: "Home", path: "/patients/patient" },
                    { text: "Lịch sử khám bệnh", path: "/patients/patient/history" },
                    { text: "Lịch tái khám", path: "/patients/patient/lich_tai_kham" },
                    { text: "Đặt lịch khám", path: "/patients/patient/dat_lich_kham" },
                    { text: "Góp ý", path: "/patients/patient/gopy" }],
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
        <Sidebar listSidebar= {this.state.listSidebar} />
        <div className="row" id="Body">
            <InfoPatient />
        </div>
      </div>
    );
  }
}

export default index;
