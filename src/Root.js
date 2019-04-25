import React from "react";
import { Route, Switch } from 'react-router-dom';

import Receptionist from './components/Receptionist/Receptionist';

export class Root extends React.Component {
    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-10 col-xs-offset-1">
                        dummy text{this.props.children}
                    </div>
                </div>
                <Switch>
                    <Route path="/receptionist" component={Receptionist}/>
                </Switch>
            </div>
        );
    }
}
export default Root;
