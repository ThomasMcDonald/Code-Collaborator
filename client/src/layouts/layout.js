import React, {Component} from 'react';
import axios from 'axios';
import {ControlledEditor as Editor} from "@monaco-editor/react";
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import NavBar from './navbar/navbar.js';
import Terminal from '../components/terminal/Terminal';
import green from '@material-ui/core/colors/green';
import Button from '@material-ui/core/Button';

// const classes = useStyles();



class Layout extends Component {
  constructor(props){
      super(props);

      this.state = {
          room: null,
          title: '',
          code: '',
          language: 'javascript',
          output: [],
          isResizing: false
      }

      this.runDocument = this.runDocument.bind(this);
      this.updateDocument = this.updateDocument.bind(this);
      this.saveDocument = this.saveDocument.bind(this);
      this.handleHotKeys = this.handleHotKeys.bind(this);
      this.getDocument = this.getDocument.bind(this);


      this.handleDividerDrag = this.handleDividerDrag.bind(this);
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

  handleDividerDrag(event){
    if(event.type === 'mousedown'){
      this.setState({isResizing: true})
    }else if(event.type === 'mousemove'){
      if(this.state.isResizing){
        console.log('test');
      }
    }else{
      this.setState({isResizing: false})
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
      if(this.state.room){
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
              console.log('generated room', response);
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
          console.log('saved document', response);
        })
        .catch(function (error) {
          console.log(error);
        });
  }

    
  render(){
    return (
      <div className='container'>

        {/* <NavBar title={this.state.title} saveFunction={this.saveDocument} runFunction={this.runDocument}/> */}
        <div className="content">
              <div className='left' style={width:'50%'}>
              <Editor
                  value={this.state.code}
                  onChange={(e, code) => this.setState({code})}
                  language={this.state.language}
                  theme="dark"
                  options={{minimap:{enabled:false}}}
                />
                
              </div>
              <div className="divider" onMouseDown={this.handleDividerDrag} onMouseUp={this.handleDividerDrag} onMouseMove={this.handleDividerDrag}></div>
              <div className='right'>
              
                <Terminal output={this.state.output}/>
              </div>
          </div>
      </div>
    )
  }
}


function codeToolBar(){
  return (
    <div className='codetoolbar'>
                  {/* // make this use the material design colors */}
                <Button variant="contained" style={{color:'white', backgroundColor:'green', marginLeft:'1em'}} onClick={this.runDocument}><PlayArrowIcon style={{paddingRight:'8px'}}/>Run</Button>
                  
                <Select
                  style={{float:'right'}}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={this.state.language}
                  onChange={(e) => this.setState({language: e.target.value})}
                >
                  <MenuItem value={'javascript'}>Javascript</MenuItem>
                </Select>
              </div>
  );
}

export default Layout;