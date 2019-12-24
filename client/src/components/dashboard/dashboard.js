import React, {Component} from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import styles from './dashboard.css';

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import 'codemirror/mode/javascript/javascript';



import axios from 'axios';

class Dashboard extends Component {
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
    }

    componentDidMount(){
        document.addEventListener('keydown', this.handleHotKeys);
    }
    
    handleHotKeys($event) {
        let charCode = String.fromCharCode($event.which).toLowerCase();
        if ($event.ctrlKey && charCode === 's') {
            // Action on Ctrl + S
            this.saveDocument()
            $event.preventDefault();
        }
      }

    saveDocument = async () => {
        if(this.state.room !== null){
            this.updateDocument();
        }else{
            const thus = this;
            axios.get('/generateDocument')
            .then(function (response) {
                thus.setState({ room: response.data.roomID })
                console.log(response);
                })
                .catch(function (error) {
                console.log(error);
                })
        }
    }
    
    runDocument = async () =>{
      axios.post('/runDocument', {
        code: this.state.code,
      })
      .then(function (response) {
        console.log(response);
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
          };

        return(
            <div>
                <div className={styles.headerText}>
                <h3>Room Generator</h3>
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


export default Dashboard;