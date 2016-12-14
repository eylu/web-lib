import React, { Component } from 'react';
import {
    View,
    Text
} from 'react-native';
import { connect } from 'react-redux';

import TodoListComponent from '../components/todo-list.component';

class HomeContainer extends Component{
    constructor(props){
        super(props);

    }
    render(){
        return (
            <View>
                <TodoListComponent todoList={this.props.todoList} />
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