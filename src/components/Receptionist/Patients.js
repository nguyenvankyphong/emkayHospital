import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";

class Patients extends Component {


  constructor(props) {
    super(props);

    this.state = {
      data:[],
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

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }
    var body;
    switch (sessionStorage.getItem("userRole")) {
      case "1": body = "<div> savs</div"
   }

    return (
      <div>
        <Sidebar/>
        <div className="row" id="Body">
          content
        </div>
      </div>
    );
  }
}

export default Patients;
