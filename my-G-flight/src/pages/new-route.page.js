
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
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import Divider from 'material-ui/Divider';
import { ValidatorForm, TextValidator, SelectValidator, DateValidator} from 'react-material-ui-form-validator';
import FontIcon from 'material-ui/FontIcon';
import AutoComplete from 'material-ui/AutoComplete';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';


import _ from 'lodash';
import LayoutInner from './layout-inner';
import { toggleSnackbar } from '../actions';
import { specEnum } from '../config/enum';

import flightImg from '../assets/images/logo.jpg';

const specMap = _.map(specEnum, (val, key)=>{ return {val:key, text:val} });

const styles = {
  underlineStyle: {
    borderColor: '#0067ff',
  },
  floatingLabelStyle: {
    color: '#0067ff',
  },
  floatingLabelFocusStyle: {
    color: '#0067ff',
  },
};

const dataSourceConfig = {
  text: 'name',
  value: 'name',
};

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
export default class NewRoutePage extends Component {
    constructor(props){
        super(props);

        /**
         * bind some handle to self
         */
        this.textChangeHandle = this.textChangeHandle.bind(this);
        this.datePickerChange = this.datePickerChange.bind(this);
        this.onFlightChange = this.onFlightChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

        this.state = {
            loading: false,
            route: {
                flight: {
                    key: '',
                    name: '',
                },
                boxes: '',
                weight: '',
                perPrice: '',
                date: new Date,
            },
        };
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

    onFlightChange(evt, index, value){

        var { route } = this.state;
        var { flights } = this.props;
        var flight = flights[value]||{};

        route.flight.name = flight.name;
        route.flight.key = value;

        this.setState({
            route: route,
        });
    }

    textChangeHandle(evt, val){
        var { route } = this.state;
        route[evt.target.name] = parseFloat(val);
        this.setState({
            route: route,
        });
    }

    datePickerChange(n1, date){
        var { route } = this.state;
        route.date = date;
        this.setState({
            route: route,
        });
    }


    handleSubmit() {

        let { firebase, dispatch } = this.props;
        // console.log(this.state);
        // return false

        if(this.refs.form.instantValidate){
            this.setState({loading: true});
            var { route } = this.state;
            var result = firebase.push('/flights');
            firebase.update(`/flights/${route.flight.key}/priceList/${result.key}`, {
                key: result.key,
                name: 'DHL',
                perPrice: route.perPrice,
                weight: route.weight,
                boxes: route.boxes,
                date: route.date.getTime(),
                create_time: Date.now(),
            }).then(()=>{
                dispatch(toggleSnackbar(true));
                this.setState({loading: false});
                hashHistory.goBack();
            });
        }
    }


    renderCurrentFlight(data){
        var { route } = this.state;

        if(route.flight.name){
            var flight = data[route.flight.key]||{};
            return (
                <div className="flight-title flex-wrapper" style={{borderBottom:'none',padding:'0 0 24px',maxWidth:400,margin:'0 auto'}}>
                    <div>
                        {
                        //<img src={flightImg} className="avatar" />
                        }
                    </div>
                    <div className="flex1">
                        <div className="flight-title-txt">
                            {route.flight.name}
                        </div>
                        <div className="flight-title-time color-gray">
                            {flight.startTimeTip} - {flight.arriveTimeTip}
                        </div>
                    </div>

                </div>
            );
        }
        return (
            <div className="empty">Please choose a flight.</div>
        );
    }
    render() {
        let { flights } = this.props;
        let flightData = isLoaded(flights) && !isEmpty(flights) ? _.map(flights, (item, key)=>{ return item }) : [];

        let { route } = this.state;
        let currentFlight = this.renderCurrentFlight(flights);

        return (
            <LayoutInner title="Add new route">
                <div className="page-wrapper page-new-order">
                    <div className="form" style={{padding:40}}>
                        <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                            <div className="fields">
                                <p style={{color:'gray'}}>Flight number</p>
                                <SelectValidator
                                    name="flight"
                                    value={route.flight.key}
                                    onChange={this.onFlightChange}
                                    underlineFocusStyle={styles.underlineStyle}
                                    fullWidth={true}
                                    validators={['required']}
                                    errorMessages={['this field is required']}
                                >
                                    {flightData.map((item, i)=>{
                                        return <MenuItem key={i} value={item.key} primaryText={item.name} />
                                    })}
                                </SelectValidator>
                            </div>
                            <div>
                                {currentFlight}
                            </div>
                            <div className="fields clearfix">
                                <div className="l" style={{width:'45%'}}>
                                    <p style={{color:'gray'}}>Boxes</p>
                                    <TextValidator
                                        name="boxes"
                                        type="number"
                                        value={route.boxes}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        // underlineStyle={styles.underlineStyle}
                                        underlineFocusStyle={styles.underlineStyle}
                                        // floatingLabelStyle={styles.floatingLabelStyle}
                                        // floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                        style={{height:32,width:'100%'}}
                                        onChange={this.textChangeHandle}
                                    />
                                </div>
                                <div className="r" style={{width:'45%'}}>
                                    <p style={{color:'gray'}}>Total weight(KG)</p>
                                    <TextValidator
                                        name="weight"
                                        type="number"
                                        value={route.weight}
                                        underlineFocusStyle={styles.underlineStyle}
                                        style={{height:32,width:'100%'}}
                                        validators={['required']}
                                        errorMessages={['this field is required']}
                                        onChange={this.textChangeHandle}
                                    />
                                </div>
                            </div>
                            <div className="fields clearfix">
                                <div className="l" style={{width:'45%'}}>
                                    <p style={{color:'gray'}}>Price</p>
                                    <div className="price-wrapper">
                                        <span className="color-gray pre-tip">$</span>
                                        <TextValidator
                                            name="perPrice"
                                            type="number"
                                            value={route.perPrice}
                                            validators={['required']}
                                            errorMessages={['this field is required']}
                                            // underlineStyle={styles.underlineStyle}
                                            underlineFocusStyle={styles.underlineStyle}
                                            // floatingLabelStyle={styles.floatingLabelStyle}
                                            // floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
                                            style={{height:32,width:'100%'}}
                                            onChange={this.textChangeHandle}
                                            className="price-input"
                                        />
                                    </div>
                                </div>
                                <div className="r" style={{width:'45%'}}>
                                    <p style={{color:'gray'}}>Date</p>
                                    <DatePicker
                                        name="date"
                                        value={route.date}
                                        underlineFocusStyle={styles.underlineStyle}
                                        style={{height:32}}
                                        textFieldStyle={{height:32,width:'100%'}}
                                        onChange={this.datePickerChange}
                                    />
                                </div>
                            </div>
                            <div className="fields">
                                <RaisedButton
                                    label="Add"
                                    buttonStyle={{background:'#0067ff'}}
                                    labelColor="#fff"
                                    fullWidth={true}
                                    type="submit"
                                    disabled={this.state.loading}
                                />
                            </div>
                        </ValidatorForm>
                    </div>
                </div>
            </LayoutInner>
        );
    }
}

