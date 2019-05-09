import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

class AddCaTrucForm extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      selectCa: 0,
      selectBS: {HoTen: " "},
      listBacSi: [],
    };

    this.handleChange = this.handleChange.bind(this);
    this.addCa = this.addCa.bind(this);
  }

  handleChange = (e) => {

    this.setState({ [e.target.name]: e.target.value });
  }

  addCa() {
    if (this.state.selectCa>0 && this.state.selectBS){
      var request = new XMLHttpRequest()
      var proxy = 'https://doanhttt.herokuapp.com/'

      // Open a new connection, using the GET request on the URL endpoint
      request.open('POST', proxy+'http://168.61.49.94:8080/DOANHTTT/rest/account/login', true)
      request.setRequestHeader("content-type","application/json")
      request.setRequestHeader("Token", localStorage.getItem('userData'))

      var date = this.props.date;
      var list = {
        "idPhongKham": this.props.room.idPhongKham,
        "month": (date.getMonth()+1).toString(),
        "year": (date.getYear()+1900).toString(),
        "listCaKham":[
          {
            "idBacSi":this.state.selectBS.idBacSi,
            "day": date.getDate(),
            "session": this.state.selectCa
          }
        ]
      };
      // list.push(this.state.selectCa);
      // list.push(this.state.selectBS);
      console.log("show list push");
      console.log(JSON.stringify(list));
      request.send(JSON.stringify(list));
      var rs = {};

      const scope = this;

      request.onload = function () {
        console.log("response: ");
        console.log(this.response);
        // rs = JSON.parse(this.response);

        if (!rs.errCode) {
        // localStorage.setItem('userData',rs.token);
        // localStorage.setItem('userRole',rs.role);
        // scope.setState({redirectToReferrer: true});

        }
      }
    }
  }

  componentDidMount() {
    var proxy = 'https://doanhttt.herokuapp.com/'
    fetch(proxy+'http://168.61.49.94:8080/DOANHTTT/rest/doctor/getListBacSi',{
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
        console.log(JSON.stringify(resData))
       // console.log("Token: "+localStorage.getItem('userData'))
       this.setState({ listBacSi: resData.arr});


    })
}

  render() {
    const { classes } = this.props;
    var a = this.state.selectBS

    return (
      <div>
        <FormControl className={this.props.formControl}>
          <Grid>
            Chọn ca trực
            <Select
              value={this.state.selectCa}
              onChange={this.handleChange}
              name="selectCa"
              displayEmpty
              className={this.props.selectEmpty}>

              <MenuItem value="" disabled>
                Chọn ca trực
              </MenuItem>
              <MenuItem value={1}>8h - 16h</MenuItem>
              <MenuItem value={2}>16h - 24h</MenuItem>
              <MenuItem value={3}>24h - 8h</MenuItem>
            </Select>
          </Grid>
          <Grid>
            Chọn bác sĩ
            <Select
              value={this.state.selectBS.HoTen}
              onChange={this.handleChange}
              name="selectBS"
              displayEmpty
              className={this.props.selectEmpty}>

              <MenuItem value="" disabled>
                Chọn bác sĩ
              </MenuItem>

              {this.state.listBacSi.map((item) => (
                <MenuItem key = {item.idBacSi} value={item}>{item.HoTen}</MenuItem>
              ))}
            </Select>
          </Grid>
          <input type="submit" className="button success" value="Thêm ca trực" onClick={this.addCa} />

          </FormControl>
      </div>
    );
  }
}

// We need an intermediary variable for handling the recursive nesting.
export default AddCaTrucForm;
