import React, {Component} from 'react';
import axios from 'axios';
import {ControlledEditor as Editor} from "@monaco-editor/react";
import Box from '@material-ui/core/Box';

import ReactMarkdown from 'react-markdown';

function DocumentHeader({title, languageData}){
  return (
      <Box
        display="flex"
        flexWrap="nowrap"
        alignContent="flex-start"
        p={1}
        m={1}
        bgcolor="#303133"
        flexDirection='row'
        css={{ maxWidth: '100%', height: 75, color:'white', fontWeight:'bold'}}
      >
        <Box p={1}  width="50%">
        <Box flexDirection="row">
          {title}
        </Box>
        </Box>
        <Box p={1} width="50%">
        </Box>
      </Box>
      );
}

function CodeContainer({title, height, mt, editorData}){
  return (
    <Box m={1} mt={mt} bgcolor='#262729' width='100%' height={height}> 
      <div style={{padding:'10px', fontSize:'16px'}}>{title}</div>
      <Editor
        value={editorData ? editorData.value : ''}
        onChange={editorData ? editorData.onChange : ()=>{}}
        language={editorData ? editorData.language : 'javascript' }
        theme="dark"
        options={{minimap:{enabled:false}}}
        height='100%'
      />
    </Box>
  )
}

class Layout extends Component {
  constructor(props){
      super(props);

      this.state = {
          room: null,
          title: 'Cheeky FizzBuzz Problem',
          code: '',
          language: 'javascript',
          output: [],
          description: ''        
      }

      this.runDocument = this.runDocument.bind(this);
      this.updateDocument = this.updateDocument.bind(this);
      this.saveDocument = this.saveDocument.bind(this);
      this.handleHotKeys = this.handleHotKeys.bind(this);
      this.getDocument = this.getDocument.bind(this);
      this.onEditorValueChange = this.onEditorValueChange.bind(this);
      this.changeDocumentLanguage = this.changeDocumentLanguage.bind(this);
      
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

  onEditorValueChange = async (e, code) => {
    console.log(code);
    this.setState({code})
  }

  changeDocumentLanguage = (e) =>{
    this.setState({language: e.target.value})
  }
  
  render(){
    const supportedLanguages = [
      'Javascript'
    ];

    const languageData = {
      documentLanguage: this.state.language, 
      languageOnChange: this.changeDocumentLanguage,
      supportedLanguages, 
    };

    const editorData = {
      language: this.state.language,
      value: this.state.code,
      onChange: this.onEditorValueChange,
    };
    const input =  '# This is a header\n\nAnd this is a paragraph';
    
    return (
      <div style={{ width: '100%' }}>
        <DocumentHeader title={this.state.title} languageData={languageData}/>
        <Box
        display="flex"
        flexWrap="nowrap"
        alignContent="flex-start"
        flexDirection='row'
        m={1}
        p={1}
        // bgcolor="#1B1C1E"
        css={{ maxWidth: '100%', height: 1000, color:'white' }}
      >
        {/* Left column  */}
        <Box m={1} p={1} width="50%" bgcolor='#262729'>
          Problem Instructions
          <ReactMarkdown source={this.state.description} />
        </Box>

        {/* Right column */}
        <Box m={1} mt={0} width="50%">
        <CodeContainer title='Solution' height='50%' editorData={editorData}/>
        <CodeContainer title='Tests' height='40%' mt={6}/>
      </Box>
        

        
      </Box>
      </div>
    )
  }
}

export default Layout;