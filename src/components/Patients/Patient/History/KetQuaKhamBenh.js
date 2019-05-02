import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

class KetQuaKhamBenh extends Component {


  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer : false,
      listFeatures: [],
      modelFeatures: {},
    };
  }

  componentDidMount() {
    var listFeatures = {};
    var modelFeatures = {};
    // console.log(this.props.idHoSo);
    var proxy = 'https://doanhttt.herokuapp.com/'
    var id= sessionStorage.getItem('idDK');
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/patient/xemHoSoKhamBenh?idHoSo=' + this.props.idHoSo;
    fetch(proxy+apiadd,{
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
       // console.log("resData hồ sơ");
       // console.log(resData);
       console.log("features:");
       console.log(JSON.parse(resData.mauHoSo.replace(/'/g, '"')));
       // console.log("kq");
       // console.log(JSON.parse(resData.ketQua.replace(/'/g, '"')));
       listFeatures = {...JSON.parse(resData.mauHoSo.replace(/'/g, '"'))};
       modelFeatures = JSON.parse(resData.ketQua.replace(/'/g, '"'));
       console.log("listFeatures");
       console.log(listFeatures);
       listFeatures.array.map(item => (
         this.state.listFeatures.push(item)
       ));
       this.setState(prevState => ({
         modelFeatures: {
             ...modelFeatures,
         }
       }
     ));
    })

    // listFeatures = require('../../../SpecialistDoctor/khoanoi.json');
    // modelFeatures = require('../../ketquakham.json');

    // this.setState({modelFeatures: a});
    // console.log(modelFeatures);

  }

  renderInput(item) {
  switch(item.type) {
    case 'longText':
      return <div>
        <b>{this.state.modelFeatures[item.id]}</b>
      </div>;
    case 'shortText':
    return <div>
      <b>{this.state.modelFeatures[item.id]}</b>
    </div>;
    case 'boolean':
    return <Checkbox
          disabled = "disabled"
          checked = {this.state.modelFeatures[item.id]}
          color="primary"
        />
  }
}

  renderListFeatures(list) {
    return list.map((item, index) => (
      <Grid item xs={item.isGroup ? 12 : (item.type == "longText"? 6 : 4)} key = {index} item>
      {item.isGroup ? (
        <div>
          <label><h5><b>{item.name}:</b></h5></label>
          <Grid container spacing={24}>
            {this.renderListFeatures(item.arr)}
          </Grid>
        </div>
      ): (
        <div>
          <label>{item.name}:{this.renderInput(item)}</label>


        </div>
        )
      }
      </Grid>
    ))
  }


  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }
    // console.log(this.state);

    return (
      <div>
          <div className="row" id="Body">
            Bệnh án
            <Grid container spacing={24}>
              {this.renderListFeatures(this.state.listFeatures)}
            </Grid>
          </div>
      </div>
    );
  }
}

export default KetQuaKhamBenh;
