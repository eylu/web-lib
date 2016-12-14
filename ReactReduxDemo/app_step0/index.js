import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
} from 'react-native';

import HomeContainer from './containers/home.container';

export default class RootWrapper extends Component{

    render(){
        return (
            <View style={styles.wrapper}>
                <HomeContainer />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        flex: 1,
        marginTop: 20,
    },
});



