import React from 'react';
import Sidebar from "../Sidebar/Sidebar";

const Receptionist = () => {
  return (
    <div>
      <Sidebar/>
      <div className="row" id="Body">
        <div className="medium-12 columns">
          <a href="#" onClick={this.logout} className="logout">Logout</a>
        </div>
      </div>
    </div>
  );
};

export default Receptionist;
