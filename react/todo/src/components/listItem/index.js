import React, {Component} from 'react'
import MyButton from '../button'
import './main.scss'

class ListItem extends Component{
    constructor(props){
        super(props)
        this.state = {
            showDelete: false,
            isEdit: false,
            message: this.props.todo.title
        }
        this.handleClick = this.handleClick.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleMouseEnter = this.handleMouseEnter.bind(this)
        this.handleMouseLeave = this.handleMouseLeave.bind(this)
        this.handleEdit = this.handleEdit.bind(this)
        this.handleInputChange = this.handleInputChange.bind(this)
        this.handleKeyDown = this.handleKeyDown.bind(this)
        this.updateTodo = this.updateTodo.bind(this)
    }
    
    handleClick(){
        this.props.onChange(this.props.todo.isDone ? 'active': 'done', this.props.todo.id)
    }
    handleDelete(){
        this.props.onChange('delete', this.props.todo.id)
    }

    handleEdit(){
        this.setState({
            isEdit: true
        })
    }

    handleInputChange(event){
        this.setState({
            message: event.target.value
        })
    }
    handleKeyDown(event){
        if (event.keyCode === 13 && this.state.message !== '') {
            this.updateTodo()
            this.setState({
                isEdit: false
            })
        }
    }

    updateTodo(){
        this.props.onChange('edit', this.props.todo.id, this.state.message)
        this.setState({
            isEdit: false
        })
    }

    handleMouseEnter(){
        this.setState({
            showDelete: true
        })
    }
   
    handleMouseLeave(){
        this.setState({
            showDelete: false
        })
    }

    render() {
        return <div className="todo__item" 
                onMouseEnter={this.handleMouseEnter} 
                onMouseLeave={this.handleMouseLeave}>
                    <div>
                        <i className={
                        `iconfont todo__item--icon ${this.props.todo.isDone ? 'icon-checked color-success' : 'icon-radio'}`
                    } onClick={this.handleClick}></i>
                    </div>
                    <div className="todo__item--content" onDoubleClick={this.handleEdit}>
                        {
                            this.state.isEdit ? (<input className="input__edit" 
                            value={this.state.message} 
                            onChange={this.handleInputChange} 
                            onBlur={this.updateTodo}
                            onKeyDown={this.handleKeyDown} />) : (this.state.message)
                        }
                    </div>
                    {
                        this.state.showDelete ? (
                            <div className="todo__item--del">
                                <MyButton label="close" 
                                icon="icon-close" 
                                type="danger"
                                onClick={this.handleDelete}
                                />    
                            </div>
                        ) : null
                    }
                    
                </div>
    }
}

export default ListItem