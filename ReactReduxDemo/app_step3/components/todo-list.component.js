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

    toggleTodo(index){
        this.props.toggleTodo && this.props.toggleTodo(index);
    }

    render(){
        return (
            <View style={styles.wrapper}>
            {this.props.todoList.map((todo, index)=>{
                var finishStyle = {textDecorationLine:'line-through', color:'gray'};
                return (
                    <TouchableOpacity onPress={()=>{this.toggleTodo(index)}}>
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