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
/**
 * initialize a Page Component named HomePage
 * connect firebase's data
 *
 */
@firebaseConnect([
    'flights'
])
@connect(
    (state) =>{
        const { firebase, hasNewRoute } = state;

        return {
            flights: dataToJS(firebase, '/flights'),
            hasNewRoute: hasNewRoute,
        }
    }
)
export default class HomePage extends Component {
    constructor(props){
        super(props);

        /**
         * bind some handle to self
         */
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
        console.log('Home', window.history.length);
        let { firebase } = this.props;
        // console.log('HomePage', this.props);
        // dispatch({type:'SHOW_ORDER', data: true})
        // console.log(this.props);
        // firebase.logout();
        // firebase.auth().onAuthStateChanged((user) => {
        //     // console.log('is login：',user)
        //     if (user) {
        //     // User is signed in.
        //     }else{
        //         hashHistory.push('/login')
        //     }
        // });
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



    render() {

        return (
            <Layout title="HomePage" isPhone={this.state.isPhone}>
                <div>这里是首页</div>

                <Link to="/about" >About</Link>
                <Link to="/other" >Other</Link>
            </Layout>
        );
    }
}

