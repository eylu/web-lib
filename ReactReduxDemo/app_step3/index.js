import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import reducers from './reducers/index';

import HomeContainer from './containers/home.container';

// 这是初始数据
const initState = {
    todos: [
        {title:'吃早饭',status:true},
        {title:'打篮球',status:false},
        {title:'修电脑',status:false},
    ],
    filter: 'All', // 'All'|'Undo'|'Finish'    // 添加新的初始 `state`
};

let store = createStore(reducers, initState);

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