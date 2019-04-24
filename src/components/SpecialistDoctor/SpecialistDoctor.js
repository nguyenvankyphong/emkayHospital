import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import Home from "./Home";
import HosoKhamBenh from "./HosoKhamBenh";
import CaTruc from "./CaTruc";


class SpecialistDoctor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listSidebar: [{text: "Home", path: "/doctor"},
                    {text: "Thêm hồ sơ khám bệnh", path: "/doctor/hoso"},
                    {text: "Lịch trực", path: "/doctor/lichtruc"}],
      redirectToReferrer: false,
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
            <Route exact path={this.props.match.path} component={Home} />
            <Route path={`${this.props.match.path}/hoso`} component={HosoKhamBenh} />
            <Route path={`${this.props.match.path}/lichtruc`} component={CaTruc} />
      </div>
    );
  }
}

export default SpecialistDoctor;
