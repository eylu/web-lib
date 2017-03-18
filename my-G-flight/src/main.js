
/**
 * import lib component
 */
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore, compose} from 'redux';
import thunk from 'redux-thunk';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';

/**
 * import styles
 */
import 'antd/dist/antd.css';
import 'rc-pagination/assets/index.css';
import 'material-design-icons/iconfont/material-icons.css';
import './assets/stylesheets/cover.css';
import './assets/stylesheets/core.css';
import './assets/stylesheets/home.css';
import './assets/stylesheets/new-order.css';
import './assets/stylesheets/order-details-phone.css';
/**
 * import Material UI Libs
 */
// import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/**
 * fix touch|tap
 */
import injectTapEventPlugin from "react-tap-event-plugin";
injectTapEventPlugin();

/**
 * import configs
 */
import { firebaseConfig } from './config/firebase';
import RouterPage from './config/router';

/**
 * import root reducers
 */
import reducers from './reducers/index';

// // Add redux Firebase to compose
// const createStoreWithFirebase = compose(
//   reactReduxFirebase(firebaseConfig, { userProfile: 'users' }),
// )(createStore)

// // Create store with reducers and initial state
// const store = createStoreWithFirebase(reducers)

const store = createStore(
  reducers,
  {
      hasNewRoute: false,
  },
  compose(
    applyMiddleware(
      thunk.withExtraArgument(getFirebase) // Pass getFirebase function as extra argument
    ),
    reactReduxFirebase(firebaseConfig, { userProfile: 'users', enableLogging: false })
  )
);


ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider><RouterPage /></MuiThemeProvider>
    </Provider>
    , document.getElementById('root'));