import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';

import { changeTodoStatus, addNewTodo } from '../actions/index';

import TodoFormComponent from '../components/todo-form.component';
import TodoListComponent from '../components/todo-list.component';

class HomeContainer extends Component{
    constructor(props){
        super(props);
    }

    addTodo(text){
        let { dispatch } = this.props;
        dispatch(addNewTodo(text));
    }

    toggleTodo(index){
        let { dispatch } = this.props;
        dispatch(changeTodoStatus(index));
    }

    render(){
        return (
            <View>
                <TodoFormComponent addTodo={(text)=>{this.addTodo(text)}}/>
                <TodoListComponent todoList={this.props.todoList} toggleTodo={(index)=>{this.toggleTodo(index)}} />
            </View>
        );
    }
}

// 基于全局 state ，哪些 state 是我们想注入的 props
function mapStateToProps(state){
    return {
        todoList: state.todos,
    }
}

export default connect(mapStateToProps)(HomeContainer);