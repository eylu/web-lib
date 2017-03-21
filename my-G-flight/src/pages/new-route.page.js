
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
 * import libs: antd, material, lodash
 */
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';
import MenuItem from 'material-ui/MenuItem';
import { ValidatorForm, TextValidator, SelectValidator, DateValidator} from 'react-material-ui-form-validator';
import _ from 'lodash';
import moment from 'moment';

import LayoutInner from './layout-inner';
import { toggleSnackbar } from '../actions';

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

        let { firebase, dispatch, router } = this.props;
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
                router && router.goBack();
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
            <LayoutInner title="Add new route" {...this.props}>
                <div className="page-wrapper page-new-order">
                    <div className="form" style={{padding:40}}>
                        <ValidatorForm ref="form" onSubmit={this.handleSubmit}>
                            <div className="fields">
                                <p style={{color:'gray'}}>Flight number</p>
                                <SelectValidator
                                    name="flight"
                                    value={route.flight.key}
                                    onChange={this.onFlightChange}
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
                                        style={{height:32}}
                                        textFieldStyle={{height:32,width:'100%'}}
                                        onChange={this.datePickerChange}
                                        formatDate={(date)=>{return moment(date).format('DD MMM YYYY')}}
                                    />
                                </div>
                            </div>
                            <div className="fields">
                                <RaisedButton
                                    label="Add"
                                    primary={true}
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

