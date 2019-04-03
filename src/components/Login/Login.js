import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {PostData} from '../../services/PostData';
import './Login.css';

class Login extends Component {

  constructor(){
    super();

    this.state = {
     username: '',
     password: '',
     redirectToReferrer: false
    };

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);

  }

  login() {
    if(this.state.username && this.state.password){
      var request = new XMLHttpRequest()
      var proxy = 'https://cors-anywhere.herokuapp.com/'

      // Open a new connection, using the GET request on the URL endpoint
      request.open('POST', proxy+'http://13.70.25.1:8080/DOANHTTT/rest/account/login', true)
      request.setRequestHeader("content-type","application/json")


      var list = [];
      list.push(this.state.username);
      list.push(this.state.password);
      console.log("show list push");
      console.log(list);
      request.send(JSON.stringify(list));
      var rs = {};

      const scope = this;

      request.onload = function () {
        console.log(this.response);
        rs = JSON.parse(this.response);
        console.log(rs);

        if (!rs.errCode) {
        sessionStorage.setItem('userData',rs.token);
        sessionStorage.setItem('userRole',rs.role);
        scope.setState({redirectToReferrer: true});
        console.log(scope.state);
        return (<Redirect to={'/patient'}/>)
      }

        //check info rs

        // var array_keys = new Array();
        // var array_values = new Array();
        //
        // for (var key in rs) {
        //     array_keys.push(key);
        //     array_values.push(rs[key]);
        //     console.log(array_values);
        // }



      }


      // code goc

      // PostData('login',this.state).then((result) => {
      //  let responseJson = result;
      //  if(responseJson.userData){
      //    sessionStorage.setItem('userData',JSON.stringify(responseJson));
      //    this.setState({redirectToReferrer: true});
      //  }
      //
      // });
    }
    if (!rs.errCode) {

    sessionStorage.setItem('token',rs.token);
    this.setState({redirectToReferrer: true});
  }
   }

  onChange(e){
    this.setState({[e.target.name]:e.target.value});
   }

  render() {

     if (this.state.redirectToReferrer) {
      return (<Redirect to={'/home'}/>)
    }

    if(sessionStorage.getItem('userData')){
      return (<Redirect to={'/home'}/>)
    }

     return (
      <div className="row" id="Body">
        <div className="medium-5 columns left">
        <h4>Loginnnnn</h4>
        <label>Username</label>
        <input type="text" name="username" placeholder="Username" onChange={this.onChange}/>
        <label>Password</label>
        <input type="password" name="password"  placeholder="Password" onChange={this.onChange}/>
        <input type="submit" className="button success" value="Login" onClick={this.login}/>
        <a href="/signup">Registration</a>
        </div>
      </div>
    );
  }
}

export default Login;
