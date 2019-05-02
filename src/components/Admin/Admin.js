import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Show from './Admin/Show'
import Add from './Admin/Add'
import IndexRecep from './Receptionist/IndexRecep';
import IndexDoctor from './Doctor/IndexDoctor';
import IndexChuyenKhoa from './ChuyenKhoa/IndexChuyenKhoa';
import IndexPhongKham from './PhongKham/IndexPhongKham';



class Receptionist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listSidebar: [{ text: "Admin", path: "/admin" },
      { text: "Bác sĩ", path: "/admin/doctor" },
      { text: "Lễ tân", path: "/admin/recep" },
      { text: "Chuyên khoa", path: "/admin/chuyenKhoa" },
      { text: "Phòng khám", path: "/admin/phongKham" },
      ],
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
            <Route exact path={this.props.match.path} component={Show} />
            <Route path={`${this.props.match.path}/add`} component={Add} />
            <Route path={`${this.props.match.path}/doctor`} component={IndexDoctor} />
            <Route path={`${this.props.match.path}/recep`} component={IndexRecep} />
            <Route path={`${this.props.match.path}/chuyenKhoa`} component={IndexChuyenKhoa} />
            <Route path={`${this.props.match.path}/phongKham`} component={IndexPhongKham} />
            
      </div>
    );
  }
}

export default Receptionist;
