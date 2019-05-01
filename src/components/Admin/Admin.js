import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Show from './Admin/Show'
import Add from './Admin/Add'
import IndexRecep from './Receptionist/IndexRecep';
import IndexDoctor from './Doctor/IndexDoctor';
import IndexChuyenKhoa from './ChuyenKhoa/IndexChuyenKhoa';



class Receptionist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listSidebar: [{ text: "Admin", path: "/admin" },
      { text: "Bác sĩ", path: "/admin/doctor" },
      { text: "Lễ tân", path: "/admin/recep" },
      { text: "Chuyên khoa", path: "/admin/chuyen_khoa" },
      { text: "Phòng khám", path: "/admin/phong_kham" },
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
            <Route path={`${this.props.match.path}/chuyen_khoa`} component={IndexChuyenKhoa} />
            <Route path={`${this.props.match.path}/chuyen_khoa`} component={IndexChuyenKhoa} />
            
      </div>
    );
  }
}

export default Receptionist;
