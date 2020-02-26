import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import Layout from '../../layouts/layout.js';
import './App.css';


function App() {

  return (
    <div>
      <Router>
        <Route exact path="/" render={props => <Layout {...props}/>}/>
        <Route exact path="/:documentId"  render={props => <Layout {...props}/>}/>
      </Router>  
    </div>
  );
}

export default App;
