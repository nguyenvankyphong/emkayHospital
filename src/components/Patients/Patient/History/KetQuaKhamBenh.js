import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

class BenhAn extends Component {


  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer : false,
      listFeatures: [],
      modelFeatures: {},
    };
  }

  componentDidMount() {
    var proxy = 'https://doanhttt.herokuapp.com/'
    var id= sessionStorage.getItem('idDK');
    var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/patient/xemHoSoKhamBenh?idHoSo=';
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
       console.log(JSON.stringify(resData))
       this.setState({result:resData.result});
    })

    var listFeatures = require('../SpecialistDoctor/khoanoi.json');
    var modelFeatures = require('./ketquakham.json');
    listFeatures.array.map(item => (
      this.state.listFeatures.push(item)
    ));
    this.setState(prevState => ({
      modelFeatures: {
          ...modelFeatures,
      }
    }
  ));
    // this.setState({modelFeatures: a});
    console.log(modelFeatures);

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
    console.log(this.state);

    return (
      <div>
        <Sidebar listSidebar= {this.state.listSidebar} current_path = {window.location.pathname}/>
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

export default BenhAn;
