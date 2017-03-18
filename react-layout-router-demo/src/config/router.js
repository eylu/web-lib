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
import AboutPage from '../pages/about.page';
import OtherPage from '../pages/other.page';





/**
 * initialize a root component named App
 */
class App extends Component {
    constructor(props){
        super(props);

        this.updateDimensions = this.updateDimensions.bind(this);

        this.phoneWidth = 768;

        this.state = {
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
            isPhone: window.innerWidth <= this.phoneWidth,
        };
    }

    updateDimensions() {
        this.setState({
            winWidth: window.innerWidth,
            winHeight: window.innerHeight,
            isPhone: window.innerWidth <= this.phoneWidth,
        });
    }

    componentWillMount() {
        this.updateDimensions();
    }

    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener("resize", this.updateDimensions);
    }

    render() {

        let childrenWithProps = React.Children.map(this.props.children, (child) => React.cloneElement(child, { 'isPhone': this.state.isPhone, }));

        return (
            <div className="react-root">
                {childrenWithProps}
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
                    <Route path="/about" component={AboutPage} />
                    <Route path="/other" component={OtherPage} />
                </Route>
            </Router>
        );
    }
}