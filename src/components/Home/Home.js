import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import './Home.css';
import {PostData} from '../../services/PostData';
import UserFeed from "../UserFeed/UserFeed";
import Patient from "../Patient/Patient";
import ReactConfirmAlert, { confirmAlert } from 'react-confirm-alert';
import '../../styles/react-confirm-alert.css';

class Home extends Component {


  constructor(props) {
    super(props);

    this.state = {
      data:[],
      userFeed: '',
      redirectToReferrer: false,
      name:'',
    };

    this.onChange = this.onChange.bind(this);
    this.convertTime = this.convertTime.bind(this);
    this.logout = this.logout.bind(this);
  }

  componentWillMount() {

  }

  convertTime(created) {
    let date = new Date(created * 1000);
    return date;
  }

  onChange(e){
    this.setState({userFeed:e.target.value});
   }
   logout(){
     sessionStorage.setItem("userData",'');
     sessionStorage.clear();
     this.setState({redirectToReferrer: true});
   }

   renderPatient() {
    if (sessionStorage.getItem("userRole") == 1) {
      return <Patient />;
    }
  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }
    var body;
    switch (sessionStorage.getItem("userRole")) {
      case "1": body = <Patient/>;
   }

    return (
      <div className="row" id="Body">
        <div className="medium-12 columns">
        <a href="#" onClick={this.logout} className="logout">Logout</a>
        {body}
        </div>

      </div>
    );
  }
}

export default Home;
