import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../../Sidebar/Sidebar";
import { Link } from '@material-ui/core';
import './Admin.css';

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
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/admin/getAdminByUsername?username=';
    fetch(proxy + apiadd, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'token': sessionStorage.getItem('userData'),
      },
    })
      .then(response => response.json())
      .then(resData => {
        console.log(JSON.stringify(resData))
        this.setState({ result: resData.arr });
      })

  }
  add = () => {
    this.setState({ redirect: true });
  }
  render() {
    const { result } = this.state;
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'} />)
    }
    if (this.state.redirect) {
      return (<Redirect to={'/admin/add'} />)
    }
    return (
      <div className="row">
        <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
        <div>
          <h3 className="title">Danh sách admin</h3>
          <div className="admin">
            <Link onClick={this.add}>Thêm</Link>
            <table className="tab">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Username</th>
                  <th>Password</th>
                </tr>
              </thead>
              <tbody>
                {result.map((row, index) => (
                  <tr>
                    <td>{index + 1}</td>
                    <td>{row.username}</td>
                    <td>{row.pass}</td>
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
