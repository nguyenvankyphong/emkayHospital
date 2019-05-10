import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import {checkErrCode} from '../Layout/checkErrCode';
import './XemGopY.css';
class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      result: [],
      redirectToReferrer : false,
    };
  }

  componentWillMount() {
    var self = this;
    var proxy = 'https://doanhttt.herokuapp.com/'
    fetch(proxy+'http://168.61.49.94:8080/DOANHTTT/rest/doctor/getListGopY',{
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Origin': '',
          'Token' : localStorage.getItem('userData'),
        },
    })
    .then(response =>  response.json())
    .then(resData => {
        checkErrCode(resData.errCode);
        console.log("resData đợt khám");
        console.log(resData);
        this.setState({result: resData.arr.filter((rs) =>
          rs.isSeen == false
        )});
        // this.loadData(this.state.room, this.state.month, this.state.year)

    })
  }

  xemGopY(id, nd) {
    var a = document.getElementById("noidung"+id);
    a.innerHTML = nd;
    a.style ="color: red;"
    var proxy = 'https://doanhttt.herokuapp.com/'
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/doctor/readGopY?idGopY='+id;
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
        console.log("resData góp ý");
        console.log(resData);
      })
  }

  loadShortContent(nd) {
    let nd2 = nd.slice(0,100);
    if (nd2.length == nd.length) {
      return nd;
    } else {
      return nd2+"..."
    }
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }

    switch (localStorage.userRole) {
      case "1":
        return (<Redirect to={'/patients'}/>)
        break;
      case "3":
        return (<Redirect to={'/receptionist'}/>)
        break;
      case "4":
        return (<Redirect to={'/admin'}/>)
        break;
    }


    return (
      <div className="row">
      <Sidebar listSidebar={this.state.listSidebar} current_path={window.location.pathname} />
        <h3>Góp ý</h3>
       <div className="tableDatlich">
        <table>
          <thead>
            <tr>
              <th className="col_1" className="col_1">STT</th>
              <th className="col_2">Thời gian</th>
              <th className="col_3">Nội dung</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.state.result.map((row, index)=>(
              <tr key={index} id={"datlich"+row.iddatLich}>
                <td>{index+1}</td>
                <td>{row.time}</td>
                <td><div className="" id={"noidung"+row.idGopY}>{this.loadShortContent(row.noiDung)}</div></td>
              <td><a onClick={()=> this.xemGopY(row.idGopY, row.noiDung)}>Xem</a></td>
              </tr>
              ))}
          </tbody>
        </table>
       </div>
      </div>
    );
  }
}

export default Home;
