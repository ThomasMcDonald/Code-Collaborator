import React, {useState, Component} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';
import styles from '../components/codeEditor/CodeEditor.css';

import Grid from '@material-ui/core/Grid';
import NavBar from './navbar/navbar.js';
import { Controlled as CodeMirror } from 'react-codemirror2';
import Terminal from '../components/terminal/Terminal';


// codemirror stuff that may or may not work properly
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/javascript/javascript';



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
// const classes = useStyles();



class Layout extends Component {
  constructor(props){
      super(props);

      this.state = {
          room: null,
          title: '',
          code: '',
          output: []
      }

      this.runDocument = this.runDocument.bind(this);
      this.updateDocument = this.updateDocument.bind(this);
      this.saveDocument = this.saveDocument.bind(this);
      this.handleHotKeys = this.handleHotKeys.bind(this);
      this.getDocument = this.getDocument.bind(this);
  }

  componentDidMount(){
    document.title = this.state.title;
      document.addEventListener('keydown', this.handleHotKeys);
      this.getDocument(this.props.match.params.documentId);
  }
  
  handleHotKeys($event) {
      let charCode = String.fromCharCode($event.which).toLowerCase();
      if ($event.ctrlKey && charCode === 's') {
        // actions on ctrl + ...
        switch(charCode) {
          case 's':
            this.saveDocument()
            $event.preventDefault();
            break;
          case 'r':
            $event.preventDefault();
            console.log('running code...')
            this.runDocument();
        }
          
      }
  }


  getDocument = async (documentId) => {
    if(documentId){
      const thus = this;
      axios.post('/getDocument',{
          roomId: documentId
      })
      .then(function (response) {
          thus.setState({ 
            title: response.data.title,
            room: response.data.roomID, 
            code: response.data.content
           })
           document.title = response.data.title;
  
          console.log(response);
          })
          .catch(function (error) {
          console.log(error);
          })
    }
  }
  
  saveDocument = async () => {
      if(this.state.room !== null){
          this.updateDocument();
      }else{
          const thus = this;
          axios.get('/generateDocument')
          .then(function (response) {
            thus.setState({ 
              title: response.data.title,
              room: response.data.roomID, 
             })
             // this re renders the component and calls the getDocument function again, probably should fix that
             thus.props.history.push(`/${response.data.roomID}`);
            // thus.props.match.params.documentId = response.data.roomID;
            document.title = response.data.title;
              console.log(response);
          })
          .catch(function (error) {
          console.log(error);
          })
      }
  }
  
  runDocument = async () => {
    const classContext = this;
    axios.post('/runDocument', {
      code: this.state.code,
    })
    .then(function ({data}) {
      const output = data.split('\n');
      classContext.setState({output});
      console.log(output);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  updateDocument = async () => {
      axios.post('/updateDocument', {
          content: this.state.code,
          roomID:this.state.room
        })
        .then(function (response) {
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
  }
  
  render(){
    const codeMirrorOptions = {
      theme: 'material',
      lineNumbers: true,
      scrollbarStyle: null,
      lineWrapping: true,
      autoCloseBrackets: true
    };

    return (
      // className={classes.root}
      <div>
        <NavBar title={this.state.title} saveFunction={this.saveDocument} runFunction={this.runDocument}/>
        <Grid container height="100%">
            <Grid item xs={6}>
            <CodeMirror
                  value={this.state.code}
                  options={{
                    mode: 'javascript',
                    ...codeMirrorOptions,
                  }}
                  onBeforeChange={(editor, data, code) => {
                    this.setState({code})
                  }}
                />
            </Grid>
            <Grid item xs={6}>
              <Terminal output={this.state.output}/>
            </Grid>
        </Grid>
    </div>
    )
  }
}

export default Layout;