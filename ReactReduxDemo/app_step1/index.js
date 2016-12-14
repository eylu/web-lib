import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { createStore } from 'redux';        // 引入 redux 以创建 store
import { Provider } from 'react-redux';     // 引入 react-redux，使用 Provider

import reducers from './reducers/index';    // 引入 reducers

import HomeContainer from './containers/home.container';

// 这是初始数据
const initState = {
    todos: [
        {title:'吃早饭',status:true},
        {title:'打篮球',status:false},
        {title:'修电脑',status:false},
    ],
};

let store = createStore(reducers, initState);  // 创建 store

export default class RootWrapper extends Component{
    render(){
        return (
            <Provider store={store}>
                <View style={styles.wrapper}>
                    <HomeContainer />
                </View>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 20,
    },
});