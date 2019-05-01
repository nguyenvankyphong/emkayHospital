import React, {Component} from 'react';
import {Redirect} from 'react-router-dom';
import {Route} from 'react-router-dom';
import Dot_kham from './Dot_kham';
import Ho_so_kham_benh from './Ho_so_kham_benh';


class Patient extends Component {


  constructor(props) {
    super(props);

    this.state = {
      redirectToReferrer : false,
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
        <Route exact path={this.props.match.path} component={Dot_kham} />
        <Route path={`${this.props.match.path}/:id`} component={Ho_so_kham_benh} />
      </div>
    );
  }
}

export default Patient;
