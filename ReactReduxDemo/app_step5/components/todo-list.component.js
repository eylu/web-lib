import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
    TouchableOpacity,
} from 'react-native';

export default class TodoListComponent extends Component{
    constructor(props){
        super(props);
    }

    toggleTodo(id){
        this.props.toggleTodo && this.props.toggleTodo(id);
    }

    render(){
        return (
            <View style={styles.wrapper}>
            {this.props.todoList.map((todo, index)=>{
                var finishStyle = {textDecorationLine:'line-through', color:'gray'};
                return (
                    <TouchableOpacity onPress={()=>{this.toggleTodo(todo.id)}}>
                        <Text style={[styles.todo,todo.status&&finishStyle]}>{todo.title}</Text>
                    </TouchableOpacity>
                );
            })}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    wrapper: {
        paddingHorizontal: 20,
    },
    todo: {
        paddingVertical: 5,
    },
});