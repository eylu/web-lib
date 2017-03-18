
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    firebaseConnect,
    isLoaded,
    isEmpty,
    dataToJS,
    pathToJS,
} from 'react-redux-firebase';
import { Link, hashHistory } from 'react-router';

/**
 * import libs: antd, material
 */
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';


import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import IconButton from 'material-ui/IconButton';
import Divider from 'material-ui/Divider';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import ActionDeleteForever from 'material-ui/svg-icons/action/delete-forever';
import EditorBorderColor from 'material-ui/svg-icons/editor/border-color';
import moment from 'moment';
import _ from 'lodash';

import LayoutInner from './layout-inner';
import flightImg from '../assets/images/logo.jpg';
/**
 * initialize a Page Component named HomePage
 * connect firebase's data
 *
 */
@firebaseConnect([
    '/flights',
])
@connect(
    ({ firebase }) => ({
        flights: dataToJS(firebase, '/flights'),
    })
)
export default class RouteDetailsPhonePage extends Component {


    constructor(props){
        super(props);

        /**
         * bind some handle to self
         */

        this.state = {

        };

    }



    /**
     * componentDidMount
     *
     */
    componentDidMount(){
        console.log(this.props);
    }

    renderRightForLayout(){
        return (
            <IconMenu
              iconButtonElement={<IconButton><MoreVertIcon color="#fff" /></IconButton>}
              anchorOrigin={{horizontal: 'right', vertical: 'top'}}
              targetOrigin={{horizontal: 'right', vertical: 'top'}}
            >
                <MenuItem primaryText="Edit" leftIcon={<EditorBorderColor />} />
                <MenuItem primaryText="Delete" leftIcon={<ActionDeleteForever />} />

            </IconMenu>
        )
    }

    renderContent(flight, priceObj){
        return (
            <div className="page-wrapper page-route-details">
                <Card initiallyExpanded={true} style={{height:'100%'}}>
                    <CardHeader
                        title={`${flight.name}`}
                        titleColor="#fff"
                        style={{background:'#0067ff'}}
                        showExpandableButton={false}
                    />
                    <CardText>
                        <div style={{padding:32}}>
                            <div className="font-big">
                                {flight.startTimeTip} -
                                {flight.arriveTimeTip}
                            </div>
                            <Divider style={{marginTop:15,marginBottom:15}} />
                            <div className="flex-wrapper">
                                <div className="flex1 color-gray">Boxes</div>
                                <div className="font-big">
                                    {priceObj.boxes}
                                </div>
                            </div>
                            <div className="flex-wrapper">
                                <div className="flex1 color-gray">Total weight(KG)</div>
                                <div className="font-big">
                                    {priceObj.weight}
                                </div>
                            </div>
                            <Divider style={{marginTop:15,marginBottom:15}} />
                            <div className="flex-wrapper">
                                <div className="flex1 color-gray">Price</div>
                                <div className="font-big">
                                    ${priceObj.perPrice.toFixed(2)}
                                </div>
                            </div>
                            <div className="flex-wrapper">
                                <div className="flex1 color-gray">Date</div>
                                <div className="font-big">
                                    {moment(priceObj.date).format('YYYY-MM-DD')}
                                </div>
                            </div>
                        </div>
                    </CardText>
                </Card>
            </div>
        );
    }

    render() {

        var { flights, params } = this.props;
        var content;
        var flight, priceObj;

        if(!isLoaded(flights)){
            content = (
                <div className="page-wrapper">
                    <div className="empty">
                        Fetching route details ...
                    </div>
                </div>
            );
        }else{
            flight = flights[params.id];
            priceObj = flight.priceList[params.price_key];

            content = this.renderContent(flight, priceObj);
        }

        return (
            <LayoutInner title="Route" rightButtons={this.renderRightForLayout} {...this.props}>
                {content}
            </LayoutInner>
        );
    }
}
