import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';

import { FILITER_KEYS } from '../config/enum';
import { changeTodoStatus, addNewTodo, filterTodoList } from '../actions/index';

import TodoFormComponent from '../components/todo-form.component';
import TodoListComponent from '../components/todo-list.component';
import TodoFilterComponent from '../components/todo-filter.component';

class HomeContainer extends Component{
    constructor(props){
        super(props);
    }

    addTodo(text){
        let { dispatch } = this.props;
        dispatch(addNewTodo(text));
    }

    toggleTodo(id){
        let { dispatch } = this.props;
        dispatch(changeTodoStatus(id));
    }

    filterTodo(filter){
        let { dispatch } = this.props;
        dispatch(filterTodoList(filter));
    }

    render(){
        return (
            <View>
                <TodoFormComponent addTodo={(text)=>{this.addTodo(text)}} />
                <TodoListComponent todoList={this.props.todoList} toggleTodo={(id)=>{this.toggleTodo(id)}} />
                <TodoFilterComponent filter={this.props.currentFilter} filterTodo={(filter)=>{this.filterTodo(filter)}} />
            </View>
        );
    }
}

const getFilterTodos = (todos, filter) => {
  switch (filter) {
    case FILITER_KEYS.ALL:
      return todos;
    case FILITER_KEYS.UNDO:
      return todos.filter( todo => !todo.status);
    case FILITER_KEYS.FINISH:
      return todos.filter( todo => todo.status);
    default:
      throw new Error('Unknown filter: ' + filter);
  }
}

// 基于全局 state ，哪些 state 是我们想注入的 props
function mapStateToProps(state){
    var list = getFilterTodos(state.todos, state.filter);
    return {
        todoList: list,
        currentFilter: state.filter,
    }
}

export default connect(mapStateToProps)(HomeContainer);