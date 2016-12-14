import React, { Component } from 'react';
import {
    Text,
    View,
    StyleSheet,
} from 'react-native';


export default class TodoListComponent extends Component{
    constructor(props){
        super(props);

    }

    render(){
        return (
            <View style={styles.wrapper}>
            {this.props.todoList.map((todo, index)=>{
                var finishStyle = {textDecorationLine:'line-through', color:'gray'};
                return (
                    <Text style={[styles.todo,todo.status&&finishStyle]}>{todo.title}</Text>
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