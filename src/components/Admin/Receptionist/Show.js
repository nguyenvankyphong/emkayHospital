import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../../Sidebar/Sidebar";
import { Link } from '@material-ui/core';
import './Recep.css';
import {checkErrCode} from '../../Layout/checkErrCode';

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      result: [],
      redirect: false,
      redirectToReferrer: false,
      listSidebar: [{ text: "Admin", path: "/admin" },
      { text: "Bác sĩ", path: "/admin/doctor" },
      { text: "Lễ tân", path: "/admin/recep" },
      { text: "Chuyên khoa", path: "/admin/chuyenKhoa" },
      { text: "Phòng khám", path: "/admin/phongKham" },
      ],
    };
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    var proxy = 'https://doanhttt.herokuapp.com/'
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/admin/getRecepByName?name=';
    fetch(proxy + apiadd, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'token': localStorage.getItem('userData'),
      },
    })
      .then(response => response.json())
      .then(resData => {
        checkErrCode(resData.errCode);
        console.log(JSON.stringify(resData))
        this.setState({ result: resData.arr });
      })

  }
  add = () => {
    this.setState({ redirect: true });
  }
  handleGender(gender) {
    if (gender == 1) {
      return "Nữ"
    } else {
      return "Nam"
    }
  }
  render() {
    const { result } = this.state;
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'} />)
    }
    if (this.state.redirect) {
      return (<Redirect to={'/admin/recep/add'} />)
    }

    return (
      <div className="row">
        <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
        <div>
          <h3 className="title">Danh sách lễ tân</h3>
          <div className = "recep">
            <Link onClick={this.add}>Thêm</Link>
            <table className="tab">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Họ tên</th>
                  <th>Ngày sinh</th>
                  <th>Giới tính</th>
                  <th>Địa chỉ</th>
                  <th>Số điện thoại</th>
                </tr>
              </thead>
              <tbody>
                {result.map((row, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{row.name}</td>
                    <td>{row.ngaysinh}</td>
                    <td>{this.handleGender(row.gioitinh)}</td>
                    <td>{row.diachi}</td>
                    <td>{row.sodienthoai}</td>
                  </tr>
                ))

                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
