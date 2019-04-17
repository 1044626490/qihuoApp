import thunkMiddleware from 'redux-thunk'
import rootReducer from '../reducers/index'
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware)(createStore);

export default store = createStoreWithMiddleware(rootReducer)
// import rootReducer from './reducer'
// import thunk from 'redux-thunk'
// import {createLogger} from 'redux-logger'

// const middleware = [thunk];
// if (process.env.NODE_ENV !== 'production') {
//     middleware.push(createLogger())
// }
// export const store = createStore(rootReducer, applyMiddleware(...middleware));