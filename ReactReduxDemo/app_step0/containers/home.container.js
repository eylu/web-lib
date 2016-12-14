import React, { Component } from 'react';
import {
    View,
} from 'react-native';

import TodoFormComponent from '../components/todo-form.component';
import TodoListComponent from '../components/todo-list.component';

export default class HomeContainer extends Component{
    constructor(props){
        super(props);
        this.state = {
            todoList: [{title:'Eat',status:false},{title:'Play',status:false},{title:'Sleep',status:false} ],
        };
    }


    addTodo(text){
        var todoList = this.state.todoList;
        todoList.push({
            title: text,
            status: false,
        });
        this.setState({
            todoList: todoList,
        })
    }

    toggleTodo(index){

        var todoList = this.state.todoList;
        var todo = todoList[index];
        if(todo){
            todo.status = !todo.status;
            this.setState({
                todoList: todoList,
            })
        }
    }

    render(){
        return (
            <View>
                <TodoFormComponent addTodo={(text)=>{this.addTodo(text)}} />
                <TodoListComponent todoList={this.state.todoList} toggleTodo={(index)=>{this.toggleTodo(index)}} />
            </View>
        );
    }
}
