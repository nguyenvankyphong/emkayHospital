import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import '../../Patient.css';
import {checkErrCode} from '../../../Layout/checkErrCode';

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
    var id = localStorage.getItem('idDK');
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
  render() {
    const { result, value} = this.state;
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'} />)
    }
    if (value) {
      return (
        <div>
            <h3>Hóa đơn</h3>
            <h5 className="title">Chưa có hóa đơn</h5>
        </div>
      );
    } else {
      return (
        <div>
          <h3 className="hoadonTitle">Hóa đơn</h3>
          <table className="">
            <thead>
              <tr>
                <th>STT</th>
                <th>Tên chi phí</th>
                <th>Đơn vị tính</th>
                <th>Đơn giá</th>
                <th>Số lượng</th>
                <th>Loại</th>
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
            </tbody>
          </table>
          total: {this.state.totalCost}
        </div>
      );
    }
  }
}

export default Home;
