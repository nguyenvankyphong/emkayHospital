import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';
import {checkErrCode} from '../../../Layout/checkErrCode';
import './KetQuaKhamBenh.css';

class KetQuaKhamBenh extends Component {
  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer : false,
      listFeatures: [],
      modelFeatures: {},
      idHoSo: this.props.idHoSo
    };
  }

  componentWillReceiveProps(newProps){
    this.setState({
      idHoSo: newProps.idHoSo,
    });
    if (newProps.idHoSo) {
      var listFeatures = {};
      var modelFeatures = {};
      var proxy = 'https://doanhttt.herokuapp.com/'
      var id= localStorage.getItem('idDK');
      var apiadd = 'http://168.61.49.94:8080/DOANHTTT/rest/patient/xemHoSoKhamBenh?idHoSo=' + newProps.idHoSo;
      fetch(proxy+apiadd,{
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
         listFeatures = {...JSON.parse(resData.mauHoSo.replace(/'/g, '"'))};
         modelFeatures = JSON.parse(resData.ketQua.replace(/'/g, '"'));
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
    }
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
          disabled = {true}
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
          <label className="groupTitle"><h6><b>{item.name}:</b></h6></label>
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
    return (
      <div>
          <div className="kqContainer" id="Body">
            <Grid container spacing={24}>
              {this.state.idHoSo!=0 &&
                <div>
                  {this.renderListFeatures(this.state.listFeatures)}
                </div>
              }
            </Grid>
          </div>
      </div>
    );
  }
}

export default KetQuaKhamBenh;
