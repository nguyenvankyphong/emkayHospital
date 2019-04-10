import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Login.css';
import logo from './icon_hospital.png';

class Login extends Component {

  constructor(props){
    super(props);

    this.state = {
     username: '',
     password: '',
     redirectToReferrer : false,
    };

    this.login = this.login.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handlereset = this.handlereset.bind(this);
  }

  login() {

    if(this.state.username && this.state.password){
      var request = new XMLHttpRequest()
      var proxy = 'https://cors-anywhere.herokuapp.com/'

      // Open a new connection, using the GET request on the URL endpoint
      request.open('POST', proxy+'http://168.61.49.94:8080/DOANHTTT/rest/account/login', true)
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
        console.log("response: ");
        console.log(this.response);
        rs = JSON.parse(this.response);
        console.log(rs);
        console.log("role" +rs.role);

        if (!rs.errCode) {
        sessionStorage.setItem('userData',rs.token);
        sessionStorage.setItem('userRole',rs.role);
        scope.setState({redirectToReferrer: true});

        console.log(scope.state);
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
   }



  onChange(e){
    this.setState({[e.target.name]:e.target.value});

   }
   handlereset(){
    this.refs.someUser.value = '';
    this.refs.somePass.value = '';
    this.setState({
      username: '',
      password: ''
    })
   }

  render() {

     if (this.state.redirectToReferrer) {
       switch (sessionStorage.getItem('userRole')) {
         case "1":
           return (<Redirect to={'/patient'}/>)
           break;
         case "2":
           return (<Redirect to={'/doctor'}/>)
           break;
         case "3":
           return (<Redirect to={'/receptionist'}/>)
           break;
         case "4":
           return (<Redirect to={'/admin'}/>)
           break;
       }
    }


     return (
       <div className= "row" cid="Body">
        <h1 className="title">EMKAY HOSPITAL</h1>
        <div className= "icon"> <img src={logo} alt="" className ="ava"/></div>
         <div className="medium-4 columns left">
           <h1>LOGIN</h1>
           <label>Username</label>
           <input
             type="text"
             ref="someUser"
             name="username"
             placeholder="Username"
             onChange={this.onChange}

             />
           <label>Password</label>
           <input
             type="password"
             ref="somePass"
             name="password"
             placeholder="Password"
             onChange={this.onChange}
             />
           <div className= "bt">
           <input type="submit" className="button success" value="Login" onClick={this.login} />
           <input type="reset" className="button reset" value="reset" onClick={this.handlereset}/>
           </div>
         </div>
       </div>
    );
  }
}

export default Login;
