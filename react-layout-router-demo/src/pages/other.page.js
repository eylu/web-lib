
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
export default class OtherPage extends Component {
    constructor(props){
        super(props);


    }



    /**
     * componentDidMount
     *
     * auth user by firebase
     * if no auth, turn to login url and show LoginComponent
     */
    componentDidMount(){
        let { firebase , params} = this.props;

    }

    renderRightForLayout(){
        return (
            'zxczxc'
        )
    }



    render() {


        return (
            <LayoutInner title="OtherPage" rightButtons={this.renderRightForLayout}>
                <div>这里是Other</div>

                <Link to="/" >Home</Link>
                <Link to="/about" >About</Link>

            </LayoutInner>
        );
    }
}

