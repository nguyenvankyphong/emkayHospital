import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import Sidebar from "../../Sidebar/Sidebar";
import { Link } from '@material-ui/core';
import './PhongKham.css';
import {checkErrCode} from '../../Layout/checkErrCode';
import Edit from '@material-ui/icons/Edit';
import Delete from '@material-ui/icons/Delete';

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      arr: [],
      redirectToReferrer: '',
      redirect: false,
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
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/doctor/getListPhongKham';
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
        console.log("resData phong kham")
        console.log(resData)
        this.setState({ arr: resData.arr });
      })

  }
  add = () => {
    this.setState({ redirectToReferrer: 2 });
  }
  edit(id){
    this.setState({redirectToReferrer: 3})
    localStorage.setItem("idPhongKham",id);
  }
  delete(idPhongKham){
    var {arr} = this.state;
    if(confirm("Bạn có chắc chắn muốn xóa không?")){//eslint-disable-line
      var proxy = 'https://doanhttt.herokuapp.com/'
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/admin/deleteLab?idPhongKham='+idPhongKham;
    fetch(proxy + apiadd, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Origin': '',
        'Token': localStorage.getItem('userData'),
      },
    })
      
      .then(resData => {
        
        if(resData.errCode == 0){
          var index= this.findIndex(arr,idPhongKham);
          if(index !== -1){
            arr.slice(index,1);
            this.setState({arr: arr});
          }
        }
      })
    }
    

  }
  findIndex=(arr,id)=>{
    var result= -1;
    arr.forEach((element, index)=> {
      if(element.idPhongKham == id){
        result= index;
      }
    });
    return result;
  }
  render() {
    var { arr } = this.state;
    switch (this.state.redirectToReferrer) {
      case 1:
      return (<Redirect to={'/login'} />)
        break;
      case 2:
      return (<Redirect to={'/admin/phongKham/add'} />)
        break;
      case 3:
      return (<Redirect to={'/admin/phongKham/edit'}/>)
        break;
    }
    return (
      <div className="showPK">
        <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />       
          <h3>Phòng khám</h3>
         <div className="add">
         <a onClick={this.add}>Thêm</a>
         {typeof arr == "undefined"? (
                <div>Chưa có phòng khám</div>
              ) : (
          <table className="list">
            <thead>
              <tr>
                <th>STT</th>
                <th>Số phòng</th>
                <th>Tên phòng</th>
                <th>Chức năng</th>
              </tr>
            </thead>
            <tbody>
              {arr.map((row, index) => (
                <tr>
                  <td>{index+1}</td>
                  <td>{row.SoPhong}</td>
                  <td>{row.TenPhong}</td>
                  <td><Link onClick= {()=>this.edit(row.idPhongKham)}><Edit /></Link><Link onClick= {()=>this.delete(row.idPhongKham)}> <Delete /></Link></td>
                </tr>
              ))}

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
