import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../../Sidebar/Sidebar";
import { Link } from '@material-ui/core';
import {checkErrCode} from '../../Layout/checkErrCode';

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      result: [],
      redirect: false,
      redirectToReferrer: '',
      listSidebar: [{ text: "Admin", path: "/admin" },
      { text: "Bác sĩ", path: "/admin/bacsi" },
      { text: "Lễ tân", path: "/admin/letan" },
      { text: "Chuyên khoa", path: "/admin/chuyenkhoa" },
      { text: "Phòng khám", path: "/admin/phongkham" },
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
        checkErrCode(resData.errCode);
        console.log(JSON.stringify(resData))
        console.log(resData.errCode)
        this.setState({ result: resData.arr });
      })

  }
  add = () => {
    this.setState({ redirectToReferrer: 2 });
  }
  edit =(tenChuyenKhoa,idChuyenKhoa)=>{
    this.setState({redirectToReferrer: 3})
    localStorage.setItem("tenChuyenKhoa",tenChuyenKhoa);
    localStorage.setItem("idChuyenKhoa",idChuyenKhoa);
  }
  editBSTK =(idChuyenKhoa,idBacSiTruongKhoa)=>{
    this.setState({redirectToReferrer: 4})
    localStorage.setItem("idChuyenKhoa",idChuyenKhoa);
    localStorage.setItem("idBacSiTruongKhoa",idBacSiTruongKhoa);
  }
  render() {
    const { result } = this.state;
    switch (this.state.redirectToReferrer) {
      case 1:
      return (<Redirect to={'/login'} />)
        break;
      case 2:
      return (<Redirect to={'/admin/chuyenkhoa/add'} />)
        break;
      case 3:
      return (<Redirect to={'/admin/chuyenkhoa/editCK'}/>)
        break;
        case 4:
      return (<Redirect to={'/admin/chuyenkhoa/editBS'}/>)
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
              </tr>
            </thead>
            <tbody>
               {result.map((row, index) => (
                <tr key= {index}>
                  <td>{index+1}</td>
                  <td><Link onClick={() => this.edit(row.tenChuyenkhoa,row.idChuyenKhoa)}>{row.tenChuyenkhoa}</Link></td>
                  <td><Link onClick={() => this.editBSTK(row.idChuyenKhoa,row.idBacSiTruongKhoa)}>{row.tenBacSiTruongKhoa}</Link></td>
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
