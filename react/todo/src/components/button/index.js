import React, {Component} from 'react'
import './main.scss'

class MyButton extends Component{
    constructor(props){
        super(props)
        const config = {
            icon: null,
            size: null,
            type: null,
            label: ''
        }
        this.state = Object.assign(config, this.props)
    
    }
    
    createContent(){
        if (this.state.icon) {
            return <i className={`iconfont ${this.state.icon}`}></i>
        } else {
            return <span>{this.state.label}</span>
        }
    }
    
    render() {
        return <div className={`button ${this.state.type}`} onClick={this.props.onClick}>
            {
                this.createContent()
            }
        </div>
    }
}

export default MyButton