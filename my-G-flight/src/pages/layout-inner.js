
import React, { Component } from 'react';


/**
 * import libs:  material
 */
import AppBar from 'material-ui/AppBar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import ActionBackup from 'material-ui/svg-icons/navigation/arrow-back';

export default class HomePage extends Component {
    constructor(props){
        super(props);


        /**
         * bind some handle to self
         */
        this.goBack = this.goBack.bind(this);
    }




    componentDidMount(){

    }

    goBack(){
        var { router } = this.props;
        router && router.goBack();
    }

    renderAppBarRight(){
        var tip = '';
        if(this.props.rightButtons){
            tip = this.props.rightButtons();
        }

        return (
            <div>{tip}</div>
        );
    }


    render() {
        // var leftBtn = <IconButton onTouchTap={this.goBack}>      <ActionBackup />    </IconButton>
        let titleStyle = {textAlign: 'center', color:'#fff', fontSize:18};

        let appbarRight = this.renderAppBarRight();
        return (
            <div className="container">
                <AppBar
                    title={this.props.title}
                    showMenuIconButton={true}
                    iconElementLeft={<FontIcon onTouchTap={this.goBack} className="material-icons" color="#fff" style={{fontSize:32,width:48,height:48,textAlign:'center',lineHeight:'48px'}}>navigate_before</FontIcon>}
                    titleStyle={titleStyle}
                    className="app-bar"
                    // iconClassNameRight="app-bar-right"
                    iconElementRight={appbarRight}
                />
                <div className="main-content">
                {this.props.children}
                </div>
            </div>
        );
    }
}


