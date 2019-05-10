import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Checkbox from '@material-ui/core/Checkbox';

class HosoKhamBenh extends Component {


  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer : false,
      listFeatures: [],
      kq: {},
      idHoSo: 0,
      listSidebar: [{text: "Home", path: "/doctor"},
                    {text: "Thêm hồ sơ khám bệnh", path: "/doctor/hoso"},
                    {text: "Lịch trực", path: "/doctor/lichtruc"},
                    {text: "Lịch làm việc", path: "/doctor/lichlamviec"}],
    };

    this.renderListFeatures = this.renderListFeatures.bind(this);
    this.renderInput = this.renderInput.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
  }

  componentWillReceiveProps(newProps){
    var mau = this.props.mauHoSo;
    console.log("typeof mau.idMauHoSo");
    console.log(typeof mau.idMauHoSo);

    if (typeof mau.idMauHoSo != "undefined") {
      console.log("mau");
      console.log(mau);

      var input = JSON.parse(mau.data.replace(/'/g, '"'));
      input.array.map(item => (
        this.state.listFeatures.push(item)
      ));

      this.setState({idHoSo: mau.idMauHoSo})
    }
  }

  componentWillMount() {


  }

  componentDidMount() {

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
    console.log(list);
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

   render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }

    return (
      <div>
          <Grid container spacing={24}>
            {this.renderListFeatures(this.state.listFeatures)}
          </Grid>

      </div>
    );
  }
}

export default HosoKhamBenh;
