import React, { Component } from 'react';


export default class Terminal extends Component {
    constructor(props){
        super(props);


        this.state = {
            output: []
        }
        
        this.sendCommand = this.sendCommand.bind(this);
    }
    sendCommand = (e) => {
        if (e.key === 'Enter') {
            const cmd = e.target.value;
            switch(cmd){
                case 'clear':
                    this.setState({output: []})
                    break;
                case 'ls':
                    this.setState({
                        output: [...this.state.output, e.target.value]
                    });
                    console.log(e.target.value);
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

    render(){
        return (
            <div>
                <ul style={{listStyleType: 'none'}}>
                {this.state.output.map((item, index) => <li  key={index}><span style={{paddingRight: '10px'}}>></span> {item}</li>)}
                <li><span style={{paddingRight: '10px'}}>></span><input onKeyUp = {this.sendCommand}></input></li>
                </ul>
              
            </div>
        );
    }

    
}