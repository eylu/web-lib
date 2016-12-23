import React, { Component } from 'react';
import {
    View,
    StyleSheet,
} from 'react-native';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import { FILITER_KEYS } from './config/enum';
import reducers from './reducers/index';

import HomeContainer from './containers/home.container';

// var thunkMiddleware = function ({ dispatch, getState }) {
//     ...
// }

// 这是初始数据
const initState = {
    // todos: [
    //     {id:1,title:'吃早饭',status:true},
    //     {id:2,title:'打篮球',status:false},
    //     {id:3,title:'修电脑',status:false},
    // ],
    filter: FILITER_KEYS.ALL,
};

const finalCreateStore = applyMiddleware(thunk)(createStore);
let store = finalCreateStore(reducers, initState);
// let store = createStore(reducers, initState);

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