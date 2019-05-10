import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../../Sidebar/Sidebar";
import Grid from '@material-ui/core/Grid';
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ReactDOM from 'react-dom';
import Checkbox from '@material-ui/core/Checkbox';
import './KhamTheoCa.css';
import {checkErrCode} from '../../Layout/checkErrCode'
class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      listBenhNhan: [],
      listMauHoSo: [],
      mauHoSo: '',
      kq: {},
      listSuggestedThuoc: [],
      selectedThuoc: '',
      soLuong: 0,
      note: '',
      redirectToReferrer : false,
      listSidebar: [{text: "Home", path: "/doctor"},
                    {text: "Lịch làm việc", path: "/doctor/lichlamviec"}],
    };

    this.addThuoc= this.addThuoc.bind(this);
    this.onFocusOut= this.onFocusOut.bind(this);
    this.selectThuoc= this.selectThuoc.bind(this);
    this.onSearchThuoc= this.onSearchThuoc.bind(this);
    this.addFormDonThuoc= this.addFormDonThuoc.bind(this);
    this.chonBenhNhan= this.chonBenhNhan.bind(this);
    this.onChangeHoSo= this.onChangeHoSo.bind(this);
    this.addKetQuaKham= this.addKetQuaKham.bind(this);
    this.renderListFeatures = this.renderListFeatures.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
  }

  componentWillMount() {
    if (localStorage.truongKhoa === "true") {
      let listSidebar = [...this.state.listSidebar];
      listSidebar.push({text: "Lịch trực", path: "/doctor/lichtruc"});
      this.setState({ listSidebar });
    }
    console.log(this.props.match.params);
    var idCaKham = this.props.match.params.id;
    var proxy = 'https://doanhttt.herokuapp.com/'
    fetch(proxy+'http://168.61.49.94:8080/DOANHTTT/rest/doctor/getListHoSo?idCaKham='+idCaKham,{
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
        console.log("list ho so:");
        console.log(resData);
        checkErrCode(resData.errCode);
        this.setState({
          listBenhNhan: [...resData.arr]
        //   listRoom: [...resData.arr],
        //   room: {...resData.arr[0]}
        });
        // this.loadData(this.state.room, this.state.month, this.state.year)

    })
  }

  chonBenhNhan(idHoSo, index) {
    if (index) {
      alert("Chưa đến lượt bệnh nhân này");
    } else {
      var idCaKham = this.props.match.params.id;
      var proxy = 'https://doanhttt.herokuapp.com/'
      fetch(proxy+'http://168.61.49.94:8080/DOANHTTT/rest/doctor/getListMauHoSo?idCaKham='+idCaKham,{
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
          // console.log(resData);
          this.setState({
            listMauHoSo: [...resData.arr]
          });
          localStorage.setItem('idHoSo',idHoSo);
          console.log(this.state.listMauHoSo);
          var selector = <div>
            <label htmlFor="mauHoSo">Chọn mẫu hồ sơ</label>
            <select name="mauHoSo" value={this.state.mauHoSo} onChange={this.onChangeHoSo}>
              {this.state.listMauHoSo.map( (hoso) => {
                return <option key={hoso.idMauHoSo} value={hoso.idMauHoSo}>Mẫu hồ sơ - {hoso.idMauHoSo}</option>
              })}
            </select>
          </div>;

          var a = this.state.listMauHoSo[0].data;
          var c = this.state.listMauHoSo.find((item) => {
            return item.idMauHoSo == this.state.mauHoSo
          })

          if (typeof c === 'undefined') {
            console.log("cccc");
            c=this.state.listMauHoSo[0];
          }

          this.setState({
            mauHoSo: c.idMauHoSo
          })

          console.log("c: "+c);
          var b = JSON.parse(c.data.replace(/'/g, '"'));
          console.log(b.array);
          ReactDOM.render(<div>{selector}</div>, document.getElementById("chonMauHoSo"));
          ReactDOM.render(<div>
            {this.renderListFeatures(b.array)}
            <input type="submit" className="button success" value="Thêm thuốc" onClick={this.addFormDonThuoc} />
            <div id="formDonThuoc">
            </div>

            <input type="submit" className="button success" value="Lưu" onClick={this.addKetQuaKham} />

          </div>, document.getElementById("Khambenh"));
      })
    }
  }

  addFormDonThuoc() {
    console.log("begin add form don thuoc");
    console.log(this.state.listSuggestedThuoc);

    ReactDOM.render(<div>
      <Grid container spacing={24}>
        <Grid item xs = {3} >
          <input
            id="inputThuoc"
            type="text"
            name="tenthuoc"
            placeholder="Tên thuốc"
            onChange={this.onSearchThuoc}
            onBlur={this.onFocusOut}
          />
          <div>
            {this.state.listSuggestedThuoc.map((item, index) => (
              <div key={index} className="suggestedItem" onClick={this.selectThuoc} value={item.idChiPhi} name={item.tenchiphi}>
                {item.tenchiphi}
              </div>
            ))}
          </div>
        </Grid>
        <Grid item xs = {3} >
          <input
            type="text"
            name="soLuong"
            placeholder="Số lượng"
            onChange={this.onChangeHoSo}
            id="inputSoLuong"
          />

        </Grid>
        <Grid item xs = {3} >
          <input
            type="text"
            name="note"
            placeholder="Note"
            onChange={this.onChangeHoSo}
            id="inputNote"
          />
        </Grid>
        <Grid item xs = {1} >
          <input
            type="submit"
            className="button success"
            value="Lưu"
            onClick={this.addThuoc} />
        </Grid>
        <Grid item xs = {1} >
          <div id="addThuocRs"></div>
        </Grid>
      </Grid>
    </div>, document.getElementById("formDonThuoc"));
  }

  addThuoc() {
    console.log(this.state);
    if(this.state.selectedThuoc && this.state.note && this.state.soLuong){
      var request = new XMLHttpRequest()
      var proxy = 'https://doanhttt.herokuapp.com/'

      // Open a new connection, using the GET request on the URL endpoint
      request.open('POST', proxy+'http://168.61.49.94:8080/DOANHTTT/rest/bill/themthuocvaodonthuoc', true)
      request.setRequestHeader("content-type","application/json")
      request.setRequestHeader("Token", localStorage.getItem('userData'))


      var list = {
                "idHSKB": localStorage.idHoSo,
                "listdtdv":[
                  {
                    "idChiPhi":this.state.selectedThuoc,
                    "SoLuong": parseInt(this.state.soLuong),
                    "note": this.state.note
                  }]
              }

      console.log("show list push");
      console.log(JSON.stringify(list));
      request.send(JSON.stringify(list));
      var rs = {};

      const scope = this;

      request.onload = function () {
        console.log("response: ");
        console.log(this.response);
        rs = JSON.parse(this.response);
        console.log(rs);


        checkErrCode(rs.errCode);
        if (!rs.errCode) {
          var a = document.getElementById('inputSoLuong')
          a.value = '';
          var b = document.getElementById('inputNote')
          b.value='';
          var c = document.getElementById('inputThuoc')
          c.value='';
          var c = document.getElementById('addThuocRs')
          c.innerHTML ='ok';

        // localStorage.setItem('userRole',rs.role);
        scope.setState({
          // listMauHoSo: [],
          // mauHoSo: '',
          // kq: {},
        });
        // ReactDOM.render(<div></div>, document.getElementById("chonMauHoSo"));
        // ReactDOM.render(<div></div>, document.getElementById("Khambenh"));

        }
      }
    }
  }

  selectThuoc(e) {
    var idThuoc = e.target.attributes.value.value;
    var element = document.getElementById("inputThuoc");
    element.value= e.target.attributes.name.value
    console.log(element);
    this.setState({
      listSuggestedThuoc: [],
      selectedThuoc: idThuoc,
    });
    this.state.listSuggestedThuoc.length = 0;
    console.log("end of select");
    console.log(this.state.listSuggestedThuoc);
    this.addFormDonThuoc();
  }

  onFocusOut(e) {
    // this.setState({
    //   listSuggestedThuoc: []
    // });
  }

  onSearchThuoc(e) {
    var proxy = 'https://doanhttt.herokuapp.com/'
    fetch(proxy+'http://168.61.49.94:8080/DOANHTTT/rest/bill/getDrugByName?TenChiPhi='+e.target.value,{
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
        console.log(resData);
        if (resData.errCode === 0) {
          this.setState({
            listSuggestedThuoc: [...resData.result]
          });
        }
        else {
          this.setState({
            listSuggestedThuoc: []
          });
        }
        this.addFormDonThuoc();
    })
  }

  onChange(e){
    const a = e.target;
    this.setState(prevState => ({
      kq: {
          ...prevState.kq,
          [a.name]:a.value
        }
      }
    ));
   }

   onChangeHoSo(e){
     const a = e.target;
     this.setState({
       [e.target.name]: e.target.value
     });
     console.log(this.state);
    }

   handleChangeCheckbox(e) {
     const a = e.target;

     this.setState(prevState => ({
       kq: {
           ...prevState.kq,
           [a.name]:a.checked
       }

     }
   ));
   }

  renderInput(item) {
    switch(item.type) {
      case 'longText':
        return <textarea rows={2} name={item.id}
                placeholder={item.name}
                onChange={this.onChange}
                />;
      case 'shortText':
        return <input
          type="text"
          name={item.id}
          placeholder={item.name}
          onChange={this.onChange}
          />;
      case 'boolean':
      return <Checkbox
            name = {item.id}
            onChange={this.handleChangeCheckbox}
            color="primary"
          />
    }
  }



  renderListFeatures(list) {

    return list.map((item, index) => (
      <Grid item xs={item.isGroup ? 12 : (item.type == "longText"? 6 : 4)} key = {index} item>
      {item.isGroup ? (
        <div>
          <label><b>{item.name}</b></label>
          <Grid container spacing={24}>
            {this.renderListFeatures(item.arr)}
          </Grid>
        </div>
      ): (
        <div>
          <label>{item.name}{this.renderInput(item)}</label>
        </div>
        )
      }

      </Grid>
    ))
  }

  addKetQuaKham() {
    console.log(this.state.kq);
    if(this.state.kq){
      var request = new XMLHttpRequest()
      var proxy = 'https://doanhttt.herokuapp.com/'

      // Open a new connection, using the GET request on the URL endpoint
      request.open('POST', proxy+'http://168.61.49.94:8080/DOANHTTT/rest/doctor/addKetQuaKham?idHoSo='+localStorage.idHoSo, true)
      request.setRequestHeader("content-type","application/json")
      request.setRequestHeader("Token", localStorage.getItem('userData'))


      var list = [];
      list.push(this.state.mauHoSo);
      list.push(JSON.stringify(this.state.kq) + "");

      console.log("show list push");
      console.log(JSON.stringify(list));
      request.send(JSON.stringify(list));
      var rs = {};

      const scope = this;

      request.onload = function () {
        console.log("response: ");
        console.log(this.response);
        rs = JSON.parse(this.response);
        console.log(rs);
        var list = scope.state.listBenhNhan;
        if (!rs.errCode) {
          alert("Đã khám xong");
        // localStorage.setItem('userRole',rs.role);
          scope.setState({
            listMauHoSo: [],
            mauHoSo: '',
            kq: {},
            listBenhNhan: list.filter((item) => {
              return item.idHoSoKhamBenh != localStorage.idHoSo
            })
          });
          ReactDOM.render(<div></div>, document.getElementById("chonMauHoSo"));
          ReactDOM.render(<div></div>, document.getElementById("Khambenh"));

        }
      }
    }
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }

    var ulStyle = {
      paddingLeft: 0,
      fontSize: 15,
    };

    var renderHangDoi = () => {
      console.log("this.state.listBenhNhan");
      console.log(this.state.listBenhNhan);

      if (this.state.listBenhNhan.length == 0) {
        return <h6>Không có bệnh nhân đang chờ</h6>
      }
      return this.state.listBenhNhan.map((item, index) => (
        <ListItem style={ulStyle} key={item.idHoSoKhamBenh}>
          <a onClick= {() => this.chonBenhNhan(item.idHoSoKhamBenh, index)}>
            <ListItemText primary={item.name} secondary={item.thongTinBenh}/>
          </a>
        </ListItem>
      ))
    }

    return (
      <div>
        <Sidebar listSidebar= {this.state.listSidebar} current_path = {window.location.pathname}/>
        <div className="row" id="Body">
          <Grid container spacing={24}>
            <Grid item xs = {3} >
              <b>BỆNH NHÂN ĐANG CHỜ</b>
                {renderHangDoi()}
              <List>

              </List>
            </Grid>
            <Grid item xs = {9} >
              <b>KHÁM BỆNH</b>
              <div id="chonMauHoSo">
              </div>

              <div id="Khambenh">
              </div>

            </Grid>
          </Grid>

        </div>
      </div>
    );
  }
}

export default Home;
