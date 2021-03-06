import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../../Sidebar/Sidebar";
import { Link } from '@material-ui/core';
import { checkErrCode } from '../../Layout/checkErrCode';

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      result: [],
      redirect: false,
      redirectToReferrer: false,
      list: [],
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
    var id = localStorage.getItem('idDK');
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/admin/getDoctorByName?HoTen=';
    fetch(proxy + apiadd, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Token': localStorage.getItem('userData'),
      },
    })
      .then(response => response.json())
      .then(resData => {
        checkErrCode(resData.errCode);
        console.log(JSON.stringify(resData))
        this.setState({ result: resData.arr });
      })

  }
  componentDidMount() {
    var proxy = 'https://doanhttt.herokuapp.com/'
    var id = localStorage.getItem('idDK');
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/recip/getChuyenKhoa';
    fetch(proxy + apiadd, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Token': localStorage.getItem('userData'),
      },
    })
      .then(response => response.json())
      .then(resData => {
        checkErrCode(resData.errCode);
        console.log(JSON.stringify(resData))
        this.setState({ list: resData.arr });
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
    const { result, list } = this.state;
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'} />)
    }
    if (this.state.redirect) {
      return (<Redirect to={'/admin/bacsi/add'} />)
    }
    return (
      <div className="row">
        <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
        <div className="hoso">
          <h3>Danh sách bác sĩ</h3>
          <Link onClick={this.add}>Thêm</Link>
           
          {typeof result == "undefined"? (
                <div>Chưa có bác sĩ</div>
              ) : (
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Họ tên</th>
                <th>Chuyên khoa</th>
                <th>Giới tính</th>
                <th>SĐT</th>
              </tr>
            </thead>
            <tbody>
              {result.map((row, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{row.HoTen}</td>
                  {list.map((row1, index) => (
                    row1.idChuyenKhoa == row.idPhongBan ?
                      <td>{row1.tenChuyenkhoa}</td> :
                      ""
                  ))}

                  <td>{this.handleGender(row.gender)}</td>
                  <td>{row.SoDienThoai}</td>
                </tr>
              ))
              }
            </tbody>
          </table>
            )
          }
        </div>
      </div>
    );
  }
}

export default Home;
