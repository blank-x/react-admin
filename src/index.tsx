import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router } from 'react-router-dom';
// import 'src/styles/index.css';
import App from './App';
import RouterDemo from 'src/components/router_demo'

import reportWebVitals from './reportWebVitals';
// import 'antd/dist/antd.css';
import 'antd/dist/antd.compact.css';
import {storeCreator} from './store';
const store = storeCreator()
// ReactDOM.render(
//   // <React.StrictMode>
//     <Provider store={store}>
//       <Router>
//         <App />
//       </Router>
//     </Provider>,
//   // </React.StrictMode>,
//   document.getElementById('root'),
// );


ReactDOM.render(
  <RouterDemo />,
  document.getElementById('root'),
);

reportWebVitals(console.log);
