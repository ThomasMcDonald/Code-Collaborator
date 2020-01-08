import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import CodeEditor from '../codeEditor/CodeEditor';



import './App.css';


const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={CodeEditor}/>
        <Route exact path="/:documentId" component={CodeEditor}/>
      </Router>  
    </div>
  );
}

export default App;
