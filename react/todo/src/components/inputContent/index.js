import React, {Component} from 'react'
import './main.scss'
class InputContent extends Component{
    constructor(props){
        super(props)
        this.state = {
            newTodo: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
    }
    handleChange(event){
        this.setState({
            newTodo: event.target.value
        })
    }
    handleKeyDown(event){
        if (event.keyCode === 13 && this.state.newTodo !== '') {
            this.props.addTodo(this.state.newTodo)
            this.setState({
                newTodo: ''
            })
        }
    }
    render() {
        return (
            <div className="input__content">
                <input className="input__new" 
                value={this.state.newTodo} 
                placeholder="What's are want to do ? " 
                onChange={this.handleChange} 
                onKeyDown={this.handleKeyDown} />
            </div>
        );
    }
}

export default InputContent;