import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';
import Patient from './components/Patient/Patient';
import Admin from './components/Admin/Admin';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
