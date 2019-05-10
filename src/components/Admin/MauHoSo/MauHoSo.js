import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import {Redirect} from 'react-router-dom';
import Show from './Show';
import Add from './Add';




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
            <Route exact path={this.props.match.path} component={Show} />
            <Route path={`${this.props.match.path}/add`} component={Add} />

      </div>
    );
  }
}

export default Receptionist;
