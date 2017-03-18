import React, { Component } from 'react';
import {
    browserHistory,
    hashHistory,
} from 'react-router';
/**
 * import libs: material
 */
import RaisedButton from 'material-ui/RaisedButton';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';

import IconMenu from 'material-ui/IconMenu';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import logoImg from '../assets/images/logo.jpg';

const iconStyles = {
  marginRight: 24,
};

export default class Layout extends Component {
    constructor(props){
        super(props);

        /**
         * bind some handle to self
         */

        this.handleToggle = this.handleToggle.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.addNewOrder = this.addNewOrder.bind(this);
        this.handleOpenMenu = this.handleOpenMenu.bind(this);
        this.handleOnRequestChange = this.handleOnRequestChange.bind(this);




        this.state = {
            isPhone: props.isPhone,
            openDrawer: !props.isPhone,
            openMenu: false,
        };

    }

    componentDidMount(){
        // console.log(this.props);

    }

    componentWillReceiveProps(nextProps){
        // console.log('nextProps Home:',nextProps);
        let { isPhone } = this.state;
        if(isPhone != nextProps.isPhone){
            this.setState({
                isPhone: nextProps.isPhone,
            }, ()=>{
                this.handleToggle();
            });

        }
    }




    handleToggle() {
        this.setState({openDrawer: !this.state.openDrawer})
    }

    handleClose(){
        if(this.state.isPhone){
            this.setState({openDrawer: false})
        }
    }

    handleOpenMenu(){
        this.setState({
            openMenu: true,
        });
    }

    handleOnRequestChange(value) {
        this.setState({
          openMenu: value,
        });
    }


    addNewOrder(){
        hashHistory.push('/order-new');
    }

    renderAppBarRight(){
        var tip;
        if(this.state.isPhone){
            // tip = <IconButton iconStyle={{color:'#fff'}} onTouchTap={this.addNewOrder}><NavigationClose /></IconButton>;
            tip = (
                <div style={{padding:12,marginLeft:8}}>
                    <FloatingActionButton
                        style={{width:24,height:24}}
                        iconStyle={{width:24,height:24}}
                        backgroundColor="#424F62"
                        onTouchTap={this.addNewOrder}
                    >
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            );
            // tip = <FontIcon className="material-icons" color="#fff" style={{marginLeft:8,padding:12,}} onTouchTap={this.addNewOrder}>add_circle_outline</FontIcon>
        }else{
            tip = (
                <div style={{padding:12,marginLeft:8}}>
                    <FloatingActionButton
                        style={{width:24,height:24}}
                        iconStyle={{width:24,height:24}}
                        backgroundColor="#0067ff"
                        onTouchTap={this.addNewOrder}
                    >
                        <ContentAdd />
                    </FloatingActionButton>
                </div>
            );
        }
        return (
            <div style={{width:48,height:48}}>
            {tip}
            </div>
        );
    }

    render(){
        let showMenuIconButton = this.state.isPhone;
        let titleStyle = {textAlign: this.state.isPhone?'center':'left',color:this.state.isPhone?'#fff':'#333',fontSize:18};
        let mainStyle = {paddingLeft:this.state.isPhone?0:260};
        let appBarRight = this.renderAppBarRight();

        return (
            <div className="container" style={mainStyle}>
                <AppBar
                    title={this.props.title}
                    showMenuIconButton={showMenuIconButton}
                    onLeftIconButtonTouchTap={this.handleToggle}
                    iconElementRight={appBarRight}
                    titleStyle={titleStyle}
                    style={{background:this.state.isPhone?'#0067ff':'#fff',}}
                    className="app-bar"
                />
                <Drawer
                    containerClassName="sider-bar"
                    docked={true}
                    width={260}
                    open={this.state.openDrawer}
                    onRequestChange={(open) => this.setState({openDrawer: open})}
                >
                    <div onTouchTap={this.handleClose}>
                        <div className="logo">
                            {
                            //<img src={logoImg} />
                            }
                            <div className="home-route-logo" style={{margin:0}}></div>
                        </div>
                        <div className="company-name">
                            Freight Forwarder
                        </div>
                        <ul className="link-list">
                            <li className="clearfix">
                                <div className="l">Dashboard</div>
                            </li>
                            <li className="clearfix">
                                <div className="l">Routes</div>
                                <div className="tip r">2</div>
                            </li>
                            <li className="clearfix">
                                <div className="l">Orders</div>
                                <div className="tip r">6</div>
                            </li>
                            <li className="clearfix">
                                <div className="l">Customers</div>
                                <div className="tip r">6</div>
                            </li>
                        </ul>
                        <div className="sider-bottom">
                            <div className="link">
                                <span className="">Edit Profile</span>
                            </div>
                            <div className="link">
                                <span className="">Settings</span>
                            </div>
                            <div className="link">
                                <span className="">About</span>
                            </div>
                        </div>
                    </div>
                </Drawer>
                <div className="main-content">
                    {this.props.children}
                </div>
            </div>
        )
    }
}