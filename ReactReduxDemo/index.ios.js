import React, {
    Component
} from 'react';
import {
    AppRegistry,
    StyleSheet,
    View
} from 'react-native';

// import RootWrapper from './app_step0/index';     // 引入入口文件
// import RootWrapper from './app_step1/index';     // 引入入口文件
// import RootWrapper from './app_step2/index';     // 引入入口文件
import RootWrapper from './app_step3/index';     // 引入入口文件

export default class ReactReduxDemo extends Component {
    render() {
        return (
            <View style={styles.container}>
                <RootWrapper />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    }
});

AppRegistry.registerComponent('ReactReduxDemo', () => ReactReduxDemo);