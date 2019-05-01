import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
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

  componentWillMount() {

    var input = require('./khoanoi.json');
    input.array.map(item => (
      this.state.listFeatures.push(item)
    ));
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
        <Sidebar listSidebar= {this.state.listSidebar} current_path = {window.location.pathname}/>
        <div className="row" id="Body">
          <div className= "row" cid="Body">
          <div>
          </div>
          Hồ sơ
          <Grid container spacing={24}>
            {this.renderListFeatures(this.state.listFeatures)}
          </Grid>
          </div>
        </div>

      </div>
    );
  }
}

export default HosoKhamBenh;
