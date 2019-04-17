/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http:   //www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import { combineReducers } from 'redux';
import read from './read';
import category from './category';
import loginReducer from './loginReducer';
import userInfo from './userInfo';
import spin from './spin'
import login_pop from "./login_pop"
import meun_title from "./meun_title"
// import AppNavigator from '../containers/app'
// import {
//   createNavigationReducer,
// } from 'react-navigation-redux-helpers';

// const nav = createNavigationReducer(AppNavigator);

// const rootReducer = combineReducers({
//   read,
//   category,
//   loginReducer, spin,login_pop,meun_title,userInfo
// });

const rootReducer = combineReducers({
  read,
  category,
  loginReducer, spin,login_pop,meun_title,userInfo
});

export default rootReducer;
