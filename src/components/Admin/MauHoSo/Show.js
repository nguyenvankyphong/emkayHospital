import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Sidebar from "../../Sidebar/Sidebar";
import Grid from '@material-ui/core/Grid';
import {checkErrCode} from '../../Layout/checkErrCode';
import HoSoKhamBenh from './HosoKhamBenh';

class Receptionist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      room: {},
      listRoom: [],
      listMau:[],
      mauHoSo: {},
      redirectToReferrer: false,
    };
  }

  componentDidMount() {
    var self = this;
    var proxy = 'https://doanhttt.herokuapp.com/'
    fetch(proxy+'http://168.61.49.94:8080/DOANHTTT/rest/doctor/getListPhongKham',{
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
        this.setState({
          listRoom: [...resData.arr],
          room: {...resData.arr[0]}
        });
        var room = resData.arr[0];
        this.loadMau(room.idPhongKham)

    })
  }

  loadMau(id) {
    var self = this;
    console.log("list mau");
    var proxy = 'https://doanhttt.herokuapp.com/'
    fetch(proxy+'http://168.61.49.94:8080/DOANHTTT/rest/doctor/getListMauHoSoByIdPhong?idPhongKham='+id,{
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
      console.log(resData);
        this.setState({
          listMau: resData.arr,
          mauHoSo: resData.arr[0]
        });

        var mau = resData.arr[0];
        console.log("JSON.parse(mau.data");
        console.log(JSON.parse(mau.data.replace(/'/g, '"')));
    })
  }

  onChangeRoom = (e) => {
    var b = document.getElementById('selectRoom');

    var room = this.state.listRoom.find((item) => {return item.idPhongKham == e.target.value})
    b.value = room.idPhongKham;
    localStorage.setItem('idPhongKham', room.idPhongKham);
    this.setState({ room: {...room} });
    this.loadMau(room.idPhongKham);
  }

  chonMauHoSo(id) {
    var mau = this.state.listMau.find((mauhoso) => {
      return mauhoso.idMauHoSo == id
    })
    this.setState({
      mauHoSo: mau
    });
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }
    console.log("this.state");
    console.log(this.state);
    return (
      <div>
        <Sidebar listSidebar= {this.state.listSidebar} current_path = {window.location.pathname}/>
          <div className="row" id="Body">
            <div className="App">
              <form className="year-selection">
                <Grid container spacing={24}>
                  <Grid item xs = {4} >
                    <Grid container spacing={24}>
                      <label htmlFor="room">Chọn phòng khám</label>
                      <select name="room" onChange={this.onChangeRoom} id="selectRoom" value={localStorage.idPhongKham}>
                        {this.state.listRoom.map( (room) => {
                          return <option key={room.idPhongKham} value={room.idPhongKham}>{room.SoPhong}-{room.TenPhong}</option>
                        })}
                      </select>
                    </Grid>
                    <Grid container spacing={24}>
                      <Grid item xs = {12} >
                        <label><a href="/admin/mauhoso/add">Thêm mẫu mới</a></label>
                        <label htmlFor="room">Danh sách mẫu</label>

                        <ul>
                          {this.state.listMau.map( (mau, index) => {
                            return <li key={index}>
                              <a onClick={() => this.chonMauHoSo(mau.idMauHoSo)}>Mẫu số {mau.idMauHoSo}</a>
                            </li>
                          })}
                        </ul>
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs = {8} >
                    {this.state.mauHoSo.idMauHoSo &&
                      <p>Mẫu số: {this.state.mauHoSo.idMauHoSo}</p>
                    }
                    <HoSoKhamBenh mauHoSo={this.state.mauHoSo}/>
                  </Grid>
                </Grid>

                <Grid container spacing={24}>

                </Grid>
              </form>
            </div>
          </div>
      </div>
    );
  }
}

export default Receptionist;
