import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Home from './zentradestasks';
import Table from './zentrades_task2';
import Table1 from './zentrades_task1';
import Login from './zentrades_task3';
import Dashboard from './zentradetask4';
const root = document.getElementById('root');

ReactDOM.createRoot(root).render(
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/zentrades_task1" element={<Table1 />} />
      <Route path="/zentrades_task2" element={<Table />} />
      <Route path="/zentrades_task3" element={<Login />} />
      <Route path="/zentradetask4" element={<Dashboard/>}/>
    </Routes>
  </Router>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
