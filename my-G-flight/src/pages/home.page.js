import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    firebaseConnect,
    isLoaded,
    isEmpty,
    dataToJS,
    pathToJS,
} from 'react-redux-firebase';
import { Link, hashHistory, browserHistory } from 'react-router';

/**
 * import libs: antd, material
 */
import BackTop from 'antd/lib/back-top';
import Pagination from 'rc-pagination';
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import Snackbar from 'material-ui/Snackbar';
import AppBar from 'material-ui/AppBar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import FontIcon from 'material-ui/FontIcon';
import {red500, yellow500, blue500} from 'material-ui/styles/colors';

import _ from 'lodash';
import Layout from './layout';
import { hashReverse } from '../utils/base';
import { orderStatus } from '../config/enum';
import { toggleSnackbar } from '../actions';
const orderStatusReverse = hashReverse(orderStatus);
import flightImg from '../assets/images/logo.jpg';
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
        this.addNewRoute = this.addNewRoute.bind(this);
        this.handleRequestClose = this.handleRequestClose.bind(this);
        this.onPageChange = this.onPageChange.bind(this);

        this.state = {
            isPhone: this.props.isPhone,
            filter: {
                status: -1,
            },
            currentPage: 1,
            currentPageSize: 10,
        };
    }


    /**
     * componentDidMount
     *
     * auth user by firebase
     * if no auth, turn to login url and show LoginComponent
     */
    componentDidMount(){

        let { firebase } = this.props;
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
        let { isPhone } = this.props;
        if(isPhone != nextProps.isPhone){
            this.setState({
                isPhone: nextProps.isPhone,
            });
        }
    }

    onPageChange(page) {

        this.setState({
            currentPage: page,
        });
    }


    changeFilter(statusNum){
        var filter = this.state.filter;
        filter.status = statusNum;
        this.setState({
            filter: filter,
            currentPage: 1,
        });
    }

    addNewRoute(){
        hashHistory.push('/route-new');
    }

    gotoDetails(route){
        hashHistory.push(`/route-details-phone/${route.flightKey}/${route.key}`);
    }

    filterData(data){
        var result = [];
        for(let key in data){
            var item = data[key];
            var priceList = _.map(item.priceList, (fp, k)=>{
                fp.flightName = item.name;
                fp.flightStartTimeTip = item.startTimeTip;
                fp.flightArriveTimeTip = item.arriveTimeTip;
                fp.flightKey = item.key;
                return fp;
            });
            result = result.concat(priceList);
        }
        return result;
    }

    paginationData(data){
        var currentPage = this.state.currentPage;
        var currentPageSize = this.state.currentPageSize;
        var start = (currentPage-1)*currentPageSize;
        var end = currentPage * currentPageSize;
        return _.slice(data, start, end);
    }

    handleRequestClose(){
        let { dispatch } = this.props;
        dispatch(toggleSnackbar(false));
    }

    renderRow(item, i){

        return (
            <div className="flight-title flex-wrapper" key={i} onTouchTap={this.gotoDetails.bind(this, item)}>

                <div className="flex1" style={{paddingLeft:16}}>
                    <div className="flight-title-txt">
                        {item.flightName}
                    </div>
                    <div className="flight-title-time">
                        {item.flightStartTimeTip} - {item.flightArriveTimeTip}
                    </div>
                </div>
                <div>
                    <strong className="flight-title-price">
                        {item.weight||0}kg
                    </strong>
                    <div className="color-gray">
                        {item.boxes||0}boxes
                    </div>
                </div>
            </div>
        );
    }

    render() {

        let { flights, hasNewRoute } = this.props;
        let data = isLoaded(flights) && !isEmpty(flights) ? flights : {};
        let filterData = this.filterData(data).sort((a,b)=>{
            return (b.create_time - a.create_time)||1
        });
        let pagedData = this.paginationData(filterData);


        let addBtnStyle = {'boxShadow':'none',background:'transparent'};

        var content;
        if(!isLoaded(flights)){
            content = (
                <div className="empty">
                    Fetching routers ...
                </div>
            );
        }else{
            if(!isEmpty(pagedData)){
                content = pagedData.map((route, i)=>{ return this.renderRow(route, i); });
            }else{
                content = (
                    <div className="empty">
                        Sorry, no routers!
                    </div>
                );
            }
        }

        return (
            <Layout>
                <div className="page-wrapper panel" style={{maxWidth:'100%'}}>
                    <div className="home-route-section">
                        <div className="home-route-logo"></div>
                        <div className="home-route-name">
                            <h2>Freight Forwarder</h2>
                        </div>
                        <div className="filter-wrapper flex-wrapper">
                            <div className="filter-btn-group flex1">
                                <div className="flex-wrapper">
                                    <div className="filter-btn flex1 active">Routes</div>
                                    <div className="filter-btn flex1">&nbsp;</div>
                                    <div className="filter-btn flex1">&nbsp;</div>
                                </div>
                            </div>
                            <div className="buttons">
                                <FloatingActionButton
                                    style={{width:27,height:27}}
                                    iconStyle={{width:27,height:27}}
                                    backgroundColor="#0067ff"
                                    onTouchTap={this.addNewRoute}
                                >
                                    <ContentAdd style={{width:20,color:'#fff'}} />
                                </FloatingActionButton>
                            </div>
                        </div>
                    </div>
                    <div className="flight-list">
                        {pagedData.map((item, i)=>{
                            return this.renderRow(item, i);
                        })}
                    </div>
                    <Pagination onChange={this.onPageChange} pageSize={this.state.currentPageSize} current={this.state.currentPage} total={filterData.length} className="gf-pagination clearfix" />
                </div>
                <Snackbar
                    open={hasNewRoute}
                    message="Successful of add new route."
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                    bodyStyle={{height:'auto',lineHeight:'1.6em',paddingTop:8,paddingBottom:8}}
                />
            </Layout>
        );
    }
}

function getStyleByStatus(statusNum, status){
    var num = orderStatusReverse[status];
    if(!num){
        return '#bfc3ca';
    }
    if(statusNum < num){
        return '#bfc3ca';
    }
    if(statusNum == num){
        return '#3a4657';
    }
    if(statusNum > num){
        return '#0bb82b';
    }
}

