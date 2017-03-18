
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    firebaseConnect,
    isLoaded,
    isEmpty,
    dataToJS,
    pathToJS,
} from 'react-redux-firebase';
import { Link } from 'react-router';

/**
 * import libs: antd, material
 */
import Layout from './layout';
import LayoutInner from './layout-inner';
/**
 * initialize a Page Component named HomePage
 * connect firebase's data
 *
 */
@firebaseConnect([
    'flights'
])
@connect(
    ({ firebase }) => ({
        flights: dataToJS(firebase, '/flights'),
    })
)
export default class AboutPage extends Component {
    constructor(props){
        super(props);

        this.state = {
            isPhone: props.isPhone,
        }

    }



    /**
     * componentDidMount
     *
     * auth user by firebase
     * if no auth, turn to login url and show LoginComponent
     */
    componentDidMount(){
        let { firebase , params} = this.props;
        // console.log('AboutPage', this.props);

    }

    componentWillReceiveProps(nextProps){
        // console.log('nextProps Home:',nextProps);
        let { isPhone } = this.state;
        if(isPhone != nextProps.isPhone){
            this.setState({
                isPhone: nextProps.isPhone,
            });
        }
    }

    renderRightForLayout(){
        return (
            123123
        )
    }


    render() {
        var MyLayout = this.state.isPhone ? LayoutInner : Layout;
        return (
            <LayoutInner title="AboutPage" isPhone={this.state.isPhone} rightButtons={this.renderRightForLayout}>
                <div>这里是About</div>


                <Link to="/" >Home</Link>
                <Link to="/other" >Other</Link>
            </LayoutInner>
        );
    }
}

