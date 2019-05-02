import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../../Sidebar/Sidebar";
import { Link } from '@material-ui/core';

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      result: [],
      redirect: false,
      redirectToReferrer: '',
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
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/recip/getChuyenKhoa';
    fetch(proxy + apiadd, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        
      },
    })
    .then(response => response.json())
      .then(resData => {
        console.log(JSON.stringify(resData))
        console.log(resData.errCode)
        this.setState({ result: resData.arr });
      })

  }
  add = () => {
    this.setState({ redirectToReferrer: 2 });
  }
  edit =(idChuyenKhoa)=>{
    this.setState({redirectToReferrer: 3})
    sessionStorage.setItem("idChuyenKhoa",idChuyenKhoa);
  }
  render() {
    const { result } = this.state;
    switch (this.state.redirectToReferrer) {
      case 1:
      return (<Redirect to={'/login'} />)
        break;
      case 2:
      return (<Redirect to={'/admin/chuyenKhoa/add'} />)
        break;
      case 3:
      return (<Redirect to={'/admin/chuyenKhoa/edit'}/>)
        break;
    }
    return (
      <div className="row">
        <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
        <div className="hoso">
          <h3>Danh sách chuyên khoa</h3>
          <Link onClick={this.add}>Thêm</Link>
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên chuyên khoa</th>
                <th>Tên bác sĩ trưởng khoa</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
               {result.map((row, index) => (
                <tr>
                  <td>{index+1}</td>
                  <td>{row.tenChuyenkhoa}</td>
                  <td>{row.tenBacSiTruongKhoa}</td>
                  <td><Link onClick={() => this.edit(row.idChuyenKhoa)}>Sửa</Link></td>
                </tr>
              ))

              } 

            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default Home;
