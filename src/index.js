import React from 'react';
import ReactDOM from 'react-dom/client';
import "./index.css"
import Root from './root';
import "antd/dist/reset.css";
import  UseWrapperHandler from './hook/UseWrapper';




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <UseWrapperHandler>

  <Root/>
  </UseWrapperHandler>
  
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals







