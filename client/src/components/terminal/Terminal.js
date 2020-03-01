import React, { Component } from 'react';
import './Terminal.css';

export default class Terminal extends Component {
    constructor(props){
        super(props);

        const welcomeMsg = this.props.welcomeMsg || 'This is a test console welcome message. Use --help for list of commands';

        this.state = {
            output: [],
            welcome:{
                show: true,
                msg: welcomeMsg
            }
        }

        this.sendCommand = this.sendCommand.bind(this);
        this.setFocus = this.setFocus.bind();
    }
    sendCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = e.target.value.split(' ')[0];

            // get arguments after command
            const args = e.target.value.split(' ').slice(1);
            console.log(cmd, args);
            switch(cmd){
                case '--help': {
                    this.setState({
                        output: [...this.state.output, 'No commands listed']
                    });
                    break;
                }
                case '':
                    this.setState({
                        output: [...this.state.output, e.target.value]
                    });
                    break;
                case 'clear':
                    this.setState({output: [], welcome:{show:false}})
                    break;
                case 'ls':
                    this.setState({
                        output: [...this.state.output, e.target.value]
                    });
                    break;
                default:
                    this.setState({
                        output: [...this.state.output, `${cmd} is not a recognized command`]
                    });
            }
            


            if(e.target.value === 'cls'){
            }else{
               
            }
            e.target.value = '';
          }
    }

    setFocus = (e) => {
    document.getElementById('terminalInput').focus();
    }
    render(){
        return (
            <div className='Terminal' onClick={this.setFocus}>
                {this.state.welcome.show && <p className='welcomeMsg'>{this.state.welcome.msg}</p>}
                <ul className='outputList'>
                {this.state.output.map((item, index) => <li  key={index}><span style={{paddingRight: '10px'}}>></span> {item}</li>)}
                
                <li>
                    <span style={{paddingRight: '10px'}}>></span>
                    <input id='terminalInput' onKeyUp={this.sendCommand}></input>
                </li>

                </ul>
              
            </div>
        );
    }

    
}