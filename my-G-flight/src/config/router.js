import React, { Component } from 'react';
import {
    Router,
    Route,
    browserHistory,
    hashHistory,
    IndexRoute
} from 'react-router';

/**
 * import pages
 */
import HomePage from '../pages/home.page';
import RouteDetailsPhonePage from '../pages/route-details-phone.page';
import NewRoutePage from '../pages/new-route.page';



/**
 * initialize a root component named App
 */
class App extends Component {
    constructor(props){
        super(props);
    }

    render() {

        return (
            <div className="react-root">
                {this.props.children}
            </div>
        )
    }
}

/**
 * initialize a component with Router , and export as default
 */
export default class RouterPage extends Component {

    render() {
        return (
            <Router history={hashHistory}>
                <Route path="/" component={App}>
                    <IndexRoute component={HomePage} />
                    <Route path="/route-new" component={NewRoutePage} />
                    <Route path="/route-details-phone/:id/:price_key" component={RouteDetailsPhonePage} />
                </Route>
            </Router>
        );
    }
}