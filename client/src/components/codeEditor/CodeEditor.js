import React, {Component} from 'react';
import { useHistory } from "react-router-dom";
import { withRouter } from 'react-router'
import { Controlled as CodeMirror } from 'react-codemirror2';
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

// codemirror stuff that may or may not work properly
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/javascript/javascript';

import axios from 'axios';


class CodeEditor extends Component {
    constructor(props){
        super(props);

        this.state = {
            room: null,
            title: '',
            code: ''
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
            // Action on Ctrl + S
            this.saveDocument()
            $event.preventDefault();
        }
    }
    
    render(){
        const codeMirrorOptions = {
            theme: 'material',
            lineNumbers: true,
            scrollbarStyle: null,
            lineWrapping: true,
            autoCloseBrackets: true
        };

        return(
          <div>
          <div className={styles.headerText}>
                <h3>Room Generator</h3>
                <p>{this.state.title}</p>
                <p>{this.state.room}</p>
                <button onClick={this.saveDocument}>Update</button>
                <button onClick={this.runDocument}>Run</button>

                </div>
                <CodeMirror
                  value={this.state.code}
                  options={{
                    mode: 'javascript',
                    ...codeMirrorOptions,
                  }}
                  onBeforeChange={(editor, data, code) => {
                    this.setState({ code });
                  }}
                />
        </div>
        )
    }
}


export default CodeEditor;