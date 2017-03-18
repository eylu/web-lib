
import React, { Component } from 'react';
import { hashHistory } from 'react-router';

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
        hashHistory.goBack();
    }

    renderAppBarRight(){
        return (
            <div>asdsad</div>
        );
    }


    render() {
        // var leftBtn = <IconButton onTouchTap={this.goBack}>      <ActionBackup />    </IconButton>
        let titleStyle = {textAlign: 'center', color:'#fff', fontSize:18};
        let childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child));
        let appbarRight = this.renderAppBarRight();
        return (
            <div className="container">
                <AppBar
                    title={this.props.title}
                    showMenuIconButton={true}
                    iconElementLeft={<FontIcon onTouchTap={this.goBack} className="material-icons" color="#fff" style={{fontSize:32,width:48,height:48,textAlign:'center',lineHeight:'48px'}}>navigate_before</FontIcon>}
                    titleStyle={titleStyle}
                    style={{background:'#0067ff'}}
                    className="app-bar  app-bar-inner"
                    // iconClassNameRight="app-bar-right"
                    iconElementRight={appbarRight}
                />
                {childrenWithProps}
            </div>
        );
    }
}


