/**
 *
 * Copyright 2015-present reading
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
import { createStackNavigator, createAppContainer } from 'react-navigation';
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createDrawerNavigator } from 'react-navigation-drawer'
import Login from '../pages/Login/Login';
import Home from '../pages/Home/Home';
import Download from '../pages/Download/Download';
import TiedCard from "../pages/TiedCard/TiedCard";
import Commission from "../pages/Commission/Commission";
import IncomeAndExpenses from "../pages/incomeAndExpenses/incomeAndExpenses";
import ChargeAndWithdrawDeposit from "../pages/chargeAndWithdrawDeposit/chargeAndWithdrawDeposit";
import RePasswordIndex from "../pages/RePasswordIndex/RePasswordIndex";
import ReDealPasswordIndex from "../pages/ReDealPasswordIndex/ReDealPasswordIndex";
import StockChart from "../pages/StockChart/StockChart";

// const TabContainer = createDrawerNavigator(
// //const TabContainer = createBottomTabNavigator(
//     {
//         Main    : { screen: Dashboard },
//         Shopping: {screen:Shopping},
//     },
//     {
//         lazy          : true,
//         tabBarPosition: 'bottom',
//         tabBarOptions : {
//             activeTintColor  : '#3e9ce9',
//             inactiveTintColor: '#999999',
//             showIcon         : true,
//             style            : {
//                 backgroundColor: '#fff'
//             },
//             indicatorStyle: {
//                 opacity: 0
//             },
//             tabStyle: {
//                 padding: 0
//             }
//         }
//     }
// );


const AppNavigator = createStackNavigator(
    {
        StockChart: {screen: StockChart},
        Home: {
            screen: Home,
            navigationOptions: {
                header: null
            }
        },
        ReDealPasswordIndex: {
            screen: ReDealPasswordIndex,
            navigationOptions: {
                header: null
            }
        },
        RePasswordIndex: {
            screen: RePasswordIndex,
            navigationOptions: {
                header: null
            }
        },
        ChargeAndWithdrawDeposit: {
            screen: ChargeAndWithdrawDeposit,
            navigationOptions: {
                header: null
            }
        },
        IncomeAndExpenses: {
            screen: IncomeAndExpenses,
            navigationOptions: {
                header: null
            }
        },
        Commission: {
            screen: Commission,
            navigationOptions: {
                header: null
            }
        },
        TiedCard: {
            screen: TiedCard,
            navigationOptions: {
                header: null
            }
        },
        Download: { screen: Download },
        Login: {
            screen: Login,
            navigationOptions: {
                header: null
            }
        },
    },
    {
        headerMode       : 'screen',
        navigationOptions: {
            header     : null,
            headerStyle: {
                backgroundColor: '#3e9ce9'
            },
            headerTitleStyle: {
                color   : '#fff',
                fontSize: 20
            },
            headerTintColor: '#fff'
        }
    }
);

const App = createAppContainer(AppNavigator);
export default App;
