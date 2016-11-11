import React, { Component } from 'react';
import {
    Image,
    StyleSheet,
} from 'react-native';

export default class ImageWrapper extends Component {
    constructor(props){
        super(props);
        this.state = {
            source: props.icon,
        };
    }

    componentWillReceiveProps(newProps){
        this.setState({
            source: newProps.icon || '',
        });
    }

    _getSource(){
        return iconMap[this.state.icon];
    }

    render() {
        var width = this.props.width || 20;
        var height = this.props.height || 20;
        var source = this._getSource();
        if(!source){
            return null;
        }
        return (
            <Image source={source} style={[styles.image, {width: width, height: height}, this.props.style]} />
        );
    }
}

const styles = StyleSheet.create({
    image: {
        width: 20,
        height: 20,
    },
});

const iconMap = {
    'icon_pic1': require('../img/icon_pic1.png'),
    'icon_pic2': require('../img/icon_pic2.png'),
};