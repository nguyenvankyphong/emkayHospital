import {Redirect} from 'react-router-dom';
import React, {Component} from 'react';

 export function checkErrCode(err) {
  switch (err) {
    case 0:
      console.log("0");
      break;
    case 2:
      console.log("2");
      sessionStorage.clear();
      localStorage.clear();
      window.location.pathname = '/login'

    default:
   }
}
