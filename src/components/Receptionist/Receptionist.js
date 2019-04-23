import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Sidebar from "../Sidebar/Sidebar";
import Register from "./Register";
import Home from "./Home";


class Receptionist extends Component {
  constructor(props) {
    super(props);

    this.state = {
      listSidebar: [{text: "Home", path: "/receptionist"},
                    {text: "Tạo tài khoản", path: "/register"},
                    {text: "Book ca khám", path: "/home"}],
      redirectToReferrer: false,
    };
  }

  componentWillMount() {

  }

  render() {
    if (this.state.redirectToReferrer) {
      return (<Redirect to={'/login'}/>)
    }
    return (
      <div>
            <Route exact path={this.props.match.path} component={Home} />
            <Route path={`${this.props.match.path}/register`} component={Register} />
      </div>
    );
  }
}

export default Receptionist;
