import React, { Component } from 'react';
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';
import {
  reduxifyNavigator,
  createReactNavigationReduxMiddleware,
  createNavigationReducer,
} from 'react-navigation-redux-helpers';
import { Provider, connect } from 'react-redux';
import App from './containers/app'
import rootReducer from './reducers/index'
import thunkMiddleware from 'redux-thunk'

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

const store = createStoreWithMiddleware(rootReducer)

// const nav        = createNavigationReducer(AppNavigator);
// const appReducer = combineReducers({
//   nav,rootReducer
// });
// // Note: createReactNavigationReduxMiddleware must be run before reduxifyNavigator
// const middleware = createReactNavigationReduxMiddleware(
//   "root",
//   state => state.nav,
//   info  => state.rootReducer
// );
// debugger
// const App             = reduxifyNavigator(AppNavigator, "root");
// const mapStateToProps = (state) => ({
//   state: state.nav,
//   info : state.rootReducer
// });
// const AppWithNavigationState = connect(mapStateToProps)(App);

// const store = createStore(
//   appReducer,
//   applyMiddleware(middleware),
// );

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <App/>
        {/* <AppWithNavigationState/> */}
      </Provider>
    )
  }
}