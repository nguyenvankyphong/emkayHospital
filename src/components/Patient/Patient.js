import React from 'react';
import Sidebar from "../Sidebar/Sidebar";

const Patient = () => {
  return (
    <div>
      <Sidebar/>
      <div className="row" id="Body">
        <div className="medium-12 columns">
        </div>
      <h1>Content</h1>
      </div>
    </div>
  );
};

export default Patient;
