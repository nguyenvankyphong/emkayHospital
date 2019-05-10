import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../Patients/Patient.css';
import {checkErrCode} from '../Layout/checkErrCode';
import Sidebar from '../Sidebar/Sidebar';

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      result: [],
      redirectToReferrer: false,
      value: '',
      totalCost: 0,
    };
    this.componentWillMount = this.componentWillMount.bind(this);
  }

  componentWillMount() {
    var proxy = 'https://doanhttt.herokuapp.com/'
    var id = localStorage.getItem('IdHoSoDotKham');
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/bill/getBillByHSDK?idHSDK=' + id;
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
        console.log("hóa đơn");
        console.log(resData);
        checkErrCode(resData.errCode);
        this.setState({
          result: resData.result,
          value: resData.value,
          totalCost: resData["Tong bill"],
        });
      })

  }

  loadTotalCost(data) {
    data.each((item, index) => {
      console.log(item);
    })
  }
  thanhToan(){

    if(confirm("Bạn muốn thanh toán?")){//eslint-disable-line
      var proxy = 'https://doanhttt.herokuapp.com/'
      var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/bill/isPayment?idHSDK=' + localStorage.IdHoSoDotKham;
      fetch(proxy + apiadd, {
        method: 'POST',
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
          console.log("resData thanh toán");
          console.log(resData);
          // this.setState({ redirect: true })
          // console.log(resData.errCode)
          window.location.pathname="/receptionist/danhsachdotkham";
        })

    }
  }
  render() {
    const { result, value} = this.state;
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'} />)
    }
    if (value) {
      return (
        <div className="row">
        <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />

          <div className = "hoadon">
          <h3 className="hoadonTitle">Hóa đơn</h3>
          <h5 className="title">Chưa có hóa đơn</h5>
          </div>


      </div>
      );
    } else {
      return (
        <div className="row">
        <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />

          <div className = "hoadon">
          <h3 className="hoadonTitle">Xuất hóa đơn</h3>
          <table className="table">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên chi phí</th>
                <th>Đơn vị tính</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {result.map((row, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{row.tenchiphi}</td>
                  <td>{row.donvitinh}</td>
                  <td>{row.dongia}</td>
                  <td>{row.SoLuong}</td>
                  <td>{row.type}</td>
                </tr>
              ))}
              <tr>
                  <td> Total:</td>
                  <td>{this.state.totalCost}</td>
              </tr>
            </tbody>
          </table>

          <div className="bt">
            <input
              type="submit"
              className="button"
              onClick={this.thanhToan}
              value="Thanh toán"
            />
            <input
              type="submit"
              className="button"
              onClick={() => window.location.pathname="/receptionist/danhsachdotkham"}
              value="Quay lại"
            />
          </div>
        </div>
      </div>
      );
    }
  }
}

export default Home;
