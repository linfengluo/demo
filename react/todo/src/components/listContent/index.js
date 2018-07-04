import React, {Component} from 'react'
import ListItem from '../listItem'
import './main.scss'

class ListContent extends Component{
    constructor(props){
        super(props)
        this.state = {
            list: this.filterList()
        }
        console.log(this.props)
    }

    filterList(){
        let list = this.props.todoList
        if (this.props.listStatus !== 'all') {
            list = this.props.todoList.filter(todo => {
                return todo.isDone === this.props.listStatus === 'done' ? true : false
            })
        } 
        return list
    }

    componentWillReceiveProps(){
        const list = this.filterList()
        this.setState({
            list: list
        })
    }
    render() {
        return <div className="todo__List">
        {
            this.props.todoList.map((item, index) => {
                return <ListItem  todo={item} key={index} onChange={this.props.onChange}/>    
            })
        }
        </div>
    }
}

export default ListContent