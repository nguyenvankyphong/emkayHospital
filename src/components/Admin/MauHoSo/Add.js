import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';


class Receptionist extends Component {
  constructor(props) {
    super(props);

    this.state = {
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
            Add

      </div>
    );
  }
}

export default Receptionist;
