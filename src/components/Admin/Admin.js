import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Show from './Admin/Show'
import Add from './Admin/Add'
import IndexRecep from './Receptionist/IndexRecep';
import IndexDoctor from './Doctor/IndexDoctor';
import IndexChuyenKhoa from './ChuyenKhoa/IndexChuyenKhoa';
import IndexPhongKham from './PhongKham/IndexPhongKham';
import MauHoSo from './MauHoSo/MauHoSo';



class Receptionist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listSidebar: [{ text: "Admin", path: "/admin" },
      { text: "Bác sĩ", path: "/admin/bacsi" },
      { text: "Lễ tân", path: "/admin/letan" },
      { text: "Chuyên khoa", path: "/admin/chuyenkhoa" },
      { text: "Phòng khám", path: "/admin/phongkham" },
      { text: "Mẫu hồ sơ", path: "/admin/mauhoso" },
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
            <Route path={`${this.props.match.path}/bacsi`} component={IndexDoctor} />
            <Route path={`${this.props.match.path}/letan`} component={IndexRecep} />
            <Route path={`${this.props.match.path}/chuyenkhoa`} component={IndexChuyenKhoa} />
            <Route path={`${this.props.match.path}/phongkham`} component={IndexPhongKham} />
            <Route path={`${this.props.match.path}/mauhoso`} component={MauHoSo} />

      </div>
    );
  }
}

export default Receptionist;
