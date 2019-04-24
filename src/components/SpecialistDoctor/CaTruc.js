import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";

class LichTruc extends Component {


  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer : false,
      listCaTruc: [],
      listSidebar: [{text: "Home", path: "/doctor"},
                    {text: "Thêm hồ sơ khám bệnh", path: "/doctor/hoso"},
                    {text: "Lịch trực", path: "/doctor/lichtruc"}],
    };

    this.renderListCaTruc = this.renderListCaTruc.bind(this);
  }

  componentDidMount() {
    var proxy = 'https://cors-anywhere.herokuapp.com/'
    fetch(proxy+'http://168.61.49.94:8080/DOANHTTT/rest/doctor/getAllCaKham?idPhong=1&month=4&year=2019',{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': '',
          'Token' : sessionStorage.getItem('userData'),
        },
    })
    .then(response =>  response.json())
    .then(resData => {
       resData.arr.map(item => (
         this.setState({ listCaTruc: resData.arr})
       ))
       // this.setState({ listBenhNhan: resData.listBenhNhan});

    })
  }

  renderListCaTruc() {
    return this.state.listCaTruc.map((item, index) => (
      <div key = {index}>
      {console.log("a")}
        Tên: {item.HoTen}
      </div>
    ))
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }

    return (
      <div>
        <Sidebar listSidebar= {this.state.listSidebar} current_path = {window.location.pathname}/>
          <div className="row" id="Body">
            {this.renderListCaTruc()}
          </div>
      </div>
    );
  }
}

export default LichTruc;
