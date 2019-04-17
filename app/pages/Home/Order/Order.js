import React from 'react';
import {
    Dimensions, Animated, View, Text, Image, ScrollView, TouchableWithoutFeedback, StyleSheet
} from 'react-native';
import {Icon, SearchBar, NoticeBar} from '@ant-design/react-native';
import {IconFill, IconOutline} from "@ant-design/icons-react-native";
import Api from '../../../utils/api'
// import {fetchPostsGetUser} from '../../actions/getUserInfo';
import {fetchPostsIfNeeded} from '../../../actions/login';
import {connect} from 'react-redux'
import {getDateOrTime} from "../../../utils/apiMethod"
import Index from "../index";
import Me from "../Me/Me";

const maxHeight = Dimensions.get('window').height;
const maxWidth = Dimensions.get('window').width;

class Order extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            key: "1",
            data: [
                {
                    name: "离岸人民币-WFUSDCNH",
                    laba: 0,
                    order: null,
                    execute: 25852,
                    expire: 25849,
                    direction: "up",
                    rate: 82,
                    img: require("../../../img/cn.png"),
                    value: 100,
                    up: 182,
                    duration: 42,
                    time: "2019-4-17 13:57:00",
                    over: 42,
                    fadeAnim: new Animated.Value(this.getStartWidth("2019-4-17 13:57:00",42)),
                },
                {
                    name: "恒指主连-HSIF",
                    laba: 0,
                    order: null,
                    execute: 25852,
                    expire: 25849,
                    direction: "up",
                    rate: 82,
                    img: require("../../../img/hongkong.png"),
                    value: 500,
                    up: 375,
                    duration: 192,
                    time: "2019-4-17 13:57:00",
                    over: 192,
                    fadeAnim: new Animated.Value(this.getStartWidth("2019-4-17 13:57:00",192)),
                },
                {
                    name: "离岸人民币-WFUSDCNH",
                    laba: 0,
                    order: null,
                    execute: 25852,
                    expire: 25849,
                    direction: "down",
                    rate: 82,
                    img: require("../../../img/cn.png"),
                    value: 100,
                    up: -100,
                    duration: 24,
                    time: "2019-4-17 13:57:00",
                    over: 24,
                    fadeAnim: new Animated.Value(this.getStartWidth("2019-4-17 13:57:00",24)),
                },
                {
                    name: "离岸人民币-WFUSDCNH",
                    laba: 0,
                    order: null,
                    execute: 25852,
                    expire: 25849,
                    direction: "up",
                    rate: 82,
                    img: require("../../../img/cn.png"),
                    value: 100,
                    up: 182,
                    duration: 50,
                    time: "2019-4-17 13:57:00",
                    over: 50,
                    fadeAnim: new Animated.Value(this.getStartWidth("2019-4-17 13:57:00",50)),
                },
            ],
            open: [0, 0, 0, 0],
            isOpenDrawer: false,
            date: "0",
            profit: "0",
            money: "0",
            radio: null
        }
    }

    componentDidMount() {
        let arr = this.state.data;
        for (let i = 0; i < this.state.open.length; i++) {
            let times = arr[i].time.replace(/-/g,"/");
            let overTime = new Date(times).getTime()+arr[i].over*1000;
            let nowTime = new Date().getTime();
            if (nowTime >= new Date(times).getTime()&&nowTime <= overTime) {
                Animated.timing(                  // 随时间变化而执行动画
                    arr[i].fadeAnim,            // 动画中的变量值
                    {
                        toValue: maxWidth,
                        duration: overTime - nowTime,
                    }
                ).start();
                let setI = setInterval(()=>{
                    let nowTime = new Date().getTime();
                    let duration = (overTime - nowTime)/1000;
                    arr[i].duration = duration;
                    this.setState({
                        data: arr
                    });
                    if(nowTime >= overTime){
                        clearInterval(setI)
                    }
                },1000)
            }
        }
        this.progress()
    }

    getStartWidth = (time,over) => {
        // let arr = this.state.data;
        // let time = this.state.data[index].time;
        // let over = this.state.data[index].over;
        let times = new Date(time.replace(/-/g,"/")).getTime();
        let width1 = (times - new Date().getTime())/1000;
        let width2 = (new Date().getTime() - times)/1000;
        if(width1 > 0){
            return 0
        }else if(width2 > 0&& width2 < over){
            return width2/over*maxWidth
        }else {
            return 0
        }
    };

    progress() {
        clearTimeout(this.setI);
        this.setI = setTimeout(() => {
            this.ProgressGo()
        }, 1000);
    }

    ProgressGo = () => {
        let arr = this.state.data;
        for (let i = 0; i < this.state.open.length; i++) {
            let times = arr[i].time.replace(/-/g,"/");
            let overTime = Date.parse(new Date(times))+arr[i].over*1000;
            let nowTime = Date.parse(new Date());
            if (nowTime >= Date.parse(new Date(times))&&nowTime <= Date.parse(new Date(times))+1*1000) {
                Animated.timing(                  // 随时间变化而执行动画
                    arr[i].fadeAnim,            // 动画中的变量值
                    {
                        toValue: maxWidth,
                        duration: overTime - nowTime,
                    }
                ).start();
                let setI = setInterval(()=>{
                    let nowTime = Date.parse(new Date());
                    let duration = (overTime - nowTime)/1000;
                    arr[i].duration = duration;
                    this.setState({
                        data: arr
                    });
                    if(nowTime >= overTime){
                        clearInterval(setI)
                    }
                },1000)
            }
        }
        this.progress()
    };

    // getMyDate(str) {
    //     var oDate = new Date(str),
    //         oYear = oDate.getFullYear(),
    //         oMonth = oDate.getMonth()+1,
    //         oDay = oDate.getDate(),
    //         oHour = oDate.getHours(),
    //         oMin = oDate.getMinutes(),
    //         oSen = oDate.getSeconds(),
    //         oTime = oYear +'-'+ addZero(oMonth) +'-'+ addZero(oDay) +' '+ addZero(oHour) +':'+
    //             addZero(oMin) +':'+addZero(oSen);
    //     return oTime;
    // }
    //
    // addZero(num){
    //     if(parseInt(num) < 10){
    //         num = '0'+num;
    //     }
    //     return num;
    // }

    render() {
        // let {fadeAnim} = this.state;
        return (
            <View style={styles.Order}>
                <View style={{width: "70%", alignItems: "center", display: "flex", flexDirection: "row"}}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.setState({key: "1"})
                    }}>
                        <View style={this.state.key === "1" ? styles.checked : styles.unChecked}>
                            <Text style={{fontSize: 18, lineHeight: 40}}>持仓</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        this.setState({key: "2"})
                    }}>
                        <View style={this.state.key === "2" ? styles.checked : styles.unChecked}>
                            <Text style={{fontSize: 18, lineHeight: 40}}>结算</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <ScrollView style={{width: maxWidth, height: maxHeight - 100}}>
                    <View style={{display: this.state.key === "1" ? "flex" : "none"}}>
                        {
                            this.state.data.map((item, index) => {
                                let times = item.time.replace(/-/g,"/");
                                if (Date.parse(new Date()) >= Date.parse(times) + item.over * 1000) {
                                    return false
                                }
                                return <View>
                                    <View style={{marginBottom: 20, display: this.state.open[index] ? "flex" : "none"}}>
                                        <TouchableWithoutFeedback onPress={() => {
                                            let open = this.state.open;
                                            open[index] = !this.state.open[index];
                                            this.setState({open})
                                        }} style={{marginBottom: 20}} key={index}>
                                            <View>
                                                <View>
                                                    <Image source={item.img}/>
                                                    <Text>{item.name}</Text>
                                                    <Text>开仓：{item.time}</Text>
                                                </View>
                                                <View>
                                                    <View>
                                                        <View>
                                                            <View><Text>金额</Text></View>
                                                            <View><Text>{item.value.toFixed(2)}元</Text></View>
                                                            <View><Text>方向</Text></View>
                                                            <View><Text><IconOutline
                                                                name={"arrow-" + item.direction}/></Text></View>
                                                        </View>
                                                        <View>
                                                            <View><Text>拉霸抵扣</Text></View>
                                                            <View><Text>{item.laba}元</Text></View>
                                                            <View><Text>订单抵扣</Text></View>
                                                            <View><Text>{item.order ? item.order : "无"}</Text></View>
                                                        </View>
                                                        <View>
                                                            <View><Text>执行价</Text></View>
                                                            <View><Text>{item.execute}</Text></View>
                                                            <View><Text>到期价</Text></View>
                                                            <View><Text>{item.expire}</Text></View>
                                                        </View>
                                                        <View>
                                                            <View><Text>时长</Text></View>
                                                            <View><Text>{item.duration.toFixed(0)}秒</Text></View>
                                                            <View><Text>收益率</Text></View>
                                                            <View><Text>{item.rate}%</Text></View>
                                                        </View>
                                                        <View>
                                                            <View><Text>到期时间</Text></View>
                                                            <View><Text>{item.time}</Text></View>
                                                            <View><Text>收益</Text></View>
                                                            <View><Text>{item.up > 0 ? "+" : ""}{item.up}元</Text></View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={{marginBottom: 20, display: this.state.open[index] ? "none" : "flex"}}>
                                        <TouchableWithoutFeedback onPress={() => {
                                            let open = this.state.open;
                                            open[index] = !this.state.open[index];
                                            this.setState({open})
                                        }}>
                                            <View>
                                                <View style={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    alignItems: "center"
                                                }}
                                                      key={index}>
                                                    <Image source={item.img}
                                                           style={{width: 50, height: 50, marginRight: 20}}/>
                                                    <View style={{
                                                        width: (maxWidth - 130) / 3.3,
                                                        display: "flex",
                                                        flexDirection: "row"
                                                    }}>
                                                        <Text>{item.value.toFixed(2)}元</Text>
                                                        <Text
                                                            style={{color: item.up > 0 ? "red" : "green"}}>({item.up > 0 ? "+" : ""}{item.up}元)</Text>
                                                    </View>
                                                    <View style={{marginLeft: 20, width: (maxWidth - 130) / 20}}>
                                                        {item.up > 0 ?
                                                            <IconOutline style={{color: "red"}} name="arrow-up"/> :
                                                            <IconOutline style={{color: "green"}} name="arrow-down"/>}
                                                    </View>
                                                    <Text style={{marginLeft: 20, width: (maxWidth - 130) / 8}}>
                                                        {item.duration.toFixed(0)}秒
                                                    </Text>
                                                    <Text style={{marginLeft: 20, width: (maxWidth - 130) * 0.5}}>
                                                        开仓：{item.time}
                                                    </Text>
                                                    {/*<View>*/}
                                                    {/*    <View>*/}
                                                    {/*        <View>*/}
                                                    {/*            <Text>{item.value.toFixed(2)}元</Text>*/}
                                                    {/*            <Text>({item.up > 0 ? "+" : ""}{item.up}元)</Text>*/}
                                                    {/*        </View>*/}
                                                    {/*        <View>*/}
                                                    {/*            <View>*/}
                                                    {/*                {item.up > 0 ? <IconOutline name="arrow-up"/> :*/}
                                                    {/*                    <IconOutline name="arrow-down"/>}*/}
                                                    {/*            </View>*/}
                                                    {/*        </View>*/}
                                                    {/*        <View>*/}
                                                    {/*            <Text>*/}
                                                    {/*                {item.duration}秒*/}
                                                    {/*            </Text>*/}
                                                    {/*        </View>*/}
                                                    {/*        <View>*/}
                                                    {/*            <Text>*/}
                                                    {/*                开仓：{item.time}*/}
                                                    {/*            </Text>*/}
                                                    {/*        </View>*/}
                                                    {/*    </View>*/}
                                                    {/*</View>*/}
                                                    <View>
                                                    </View>
                                                </View>
                                                <Animated.View style={{width: item.fadeAnim, height: 1}}>
                                                    <View style={{
                                                        width: "100%",
                                                        height: 1,
                                                        borderBottomWidth: 1,
                                                        borderColor: "red"
                                                    }}>

                                                    </View>
                                                </Animated.View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            })
                        }
                    </View>
                    <View style={{display: this.state.key === "2" ? "flex" : "none"}}>
                        {
                            this.state.data.map((item, index) => {
                                let times = item.time.replace(/-/g,"/");
                                if (Date.parse(new Date()) <= Date.parse(times) + item.over * 1000) {
                                    return false
                                }
                                return <View>
                                    <View
                                        style={{marginBottom: 20, display: !this.state.open[index] ? "none" : "flex"}}>
                                        <TouchableWithoutFeedback onPress={() => {
                                            let open = this.state.open;
                                            open[index] = 0;
                                            this.setState({open})
                                        }} key={index}>
                                            <View>
                                                <View>
                                                    <Image source={item.img}/>
                                                    <Text>{item.name}</Text>
                                                    <Text>开仓：{item.time}</Text>
                                                </View>
                                                <View>
                                                    <View>
                                                        <View>
                                                            <View><Text>金额</Text></View>
                                                            <View><Text>{item.value.toFixed(2)}元</Text></View>
                                                            <View><Text>方向</Text></View>
                                                            <View><View><IconOutline
                                                                name={"arrow-" + item.direction}/></View></View>
                                                        </View>
                                                        <View>
                                                            <View><Text>拉霸抵扣</Text></View>
                                                            <View><Text>{item.laba}元</Text></View>
                                                            <View><Text>订单抵扣</Text></View>
                                                            <View><Text>{item.order ? item.order : "无"}</Text></View>
                                                        </View>
                                                        <View>
                                                            <View><Text>执行价</Text></View>
                                                            <View><Text>{item.execute}</Text></View>
                                                            <View><Text>到期价</Text></View>
                                                            <View><Text>{item.expire}</Text></View>
                                                        </View>
                                                        <View>
                                                            <View><Text>时长</Text></View>
                                                            <View><Text>{item.over}秒</Text></View>
                                                            <View><Text>收益率</Text></View>
                                                            <View><Text>{item.rate}%</Text></View>
                                                        </View>
                                                        <View>
                                                            <View><Text>到期时间</Text></View>
                                                            <View><Text>{item.time}</Text></View>
                                                            <View><Text>收益</Text></View>
                                                            <View><Text>{item.up > 0 ? "+" : ""}{item.up}元</Text></View>
                                                        </View>
                                                    </View>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View
                                        style={{marginBottom: 20, display: !this.state.open[index] ? "flex" : "none"}}>
                                        <TouchableWithoutFeedback onPress={() => {
                                            let open = this.state.open;
                                            open[index] = 1;
                                            this.setState({open})
                                        }}>
                                            <View>
                                                <View  style={{display: "flex", flexDirection: "row", alignItems: "center"}}
                                                      key={index}>
                                                    <Image style={{width: 50, height: 50, marginRight: 20}}
                                                           source={item.img}/>
                                                    <View style={{
                                                        width: (maxWidth - 130) / 3.3,
                                                        display: "flex",
                                                        flexDirection: "row"
                                                    }}>
                                                        <Text>{item.value.toFixed(2)}元</Text>
                                                        <Text
                                                            style={{color: item.up > 0 ? "red" : "green"}}>({item.up > 0 ? "+" : ""}{item.up}元)</Text>
                                                    </View>
                                                    <View style={{marginLeft: 20, width: (maxWidth - 130) / 20}}>
                                                        {item.up > 0 ?
                                                            <IconOutline style={{color: "red"}} name="arrow-up"/> :
                                                            <IconOutline style={{color: "green"}} name="arrow-down"/>}
                                                    </View>
                                                    <Text style={{marginLeft: 20, width: (maxWidth - 130) / 8}}>
                                                        {item.over.toFixed(0)}秒
                                                    </Text>
                                                    <Text style={{marginLeft: 20, width: (maxWidth - 130) * 0.5}}>
                                                        开仓：{item.time}
                                                    </Text>
                                                    {/*<View>*/}
                                                    {/*    <View>*/}
                                                    {/*        <View>*/}
                                                    {/*            <Text>{item.value.toFixed(2)}元</Text>*/}
                                                    {/*            <Text>({item.up > 0 ? "+" : ""}{item.up}元)</Text>*/}
                                                    {/*        </View>*/}
                                                    {/*        <View>*/}
                                                    {/*            <View>*/}
                                                    {/*                {item.up > 0 ? <IconOutline name="arrow-up"/> :*/}
                                                    {/*                    <IconOutline name="arrow-down"/>}*/}
                                                    {/*            </View>*/}
                                                    {/*        </View>*/}
                                                    {/*        <View>*/}
                                                    {/*            <Text>*/}
                                                    {/*                {item.over}秒*/}
                                                    {/*            </Text>*/}
                                                    {/*        </View>*/}
                                                    {/*        <View>*/}
                                                    {/*            <Text>*/}
                                                    {/*                开仓：{item.time}*/}
                                                    {/*            </Text>*/}
                                                    {/*        </View>*/}
                                                    {/*    </View>*/}
                                                    {/*</View>*/}
                                                </View>
                                                <View style={{
                                                    width: "100%",
                                                    height: 1,
                                                }}>
                                                </View>
                                            </View>
                                        </TouchableWithoutFeedback>
                                    </View>
                                </View>
                            })
                        }
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Order: {
        alignItems: "center",
    },
    checked: {
        alignItems: "center",
        width: "50%",
        borderBottomWidth: 1,
        borderColor: "#2e8bff",
        height: 40,
    },
    unChecked: {
        alignItems: "center",
        width: "50%",
        borderBottomWidth: 1,
        borderColor: "transparent",
        height: 40,
    }
});

const mapState = state => {
    const {userInfo} = state;
    return {userInfo}
}

const mapDispatch = dispatch => ({
    dispatch
});

export default connect(
    mapState,
    mapDispatch
)(Order)