import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import CodeEditor from '../codeEditor/CodeEditor';
import Layout from '../../layouts/layout.js';
import './App.css';


function App() {

  return (
    <div className="App">
      <Router>
        <Route exact path="/" render={props => <Layout><CodeEditor {...props}/></Layout>}/>
        <Route exact path="/:documentId"  render={props => <Layout><CodeEditor {...props}/></Layout>}/>
      </Router>  
    </div>
  );
}

export default App;
