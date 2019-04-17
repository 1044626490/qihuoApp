import React from "react"
import {
    Dimensions, Animated, View, Text, Image, StyleSheet, Button, AsyncStorage, Picker,
    TextInput, TouchableWithoutFeedback, ScrollView
} from 'react-native';
import TimeShareChart from "./chart/TimeShareChart"
import FiveMinutesChart from "./chart/FiveMinutesChart"
import Api from "../../../utils/api";

const maxHeight = Dimensions.get('window').height;
const maxWidth  = Dimensions.get('window').width;

class TrendChat extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            key:"1",
            code:this.props.code,
            data:{
                cname:"",
                ask:0,
                upOrDown:0,
                rate:0,
                buyprice:0,
                sellprice:0,
                high:0,
                low:0,
                transactionhour:"",
                status:1
            }
        }
    }

    // componentDidUpdate(){
    //
    // }
    //
    componentDidMount(){
        // Api.homeProducts({code:this.state.code}).then(res => {
        //     let data = res.data;
        //     data.upOrDown = Number((data.ask/1-data.open/1).toFixed(4));
        //     data.rate = Number(((data.upOrDown/data.open)*100).toFixed(2));
        //     let key =Object.keys(data)
        //     // console.log(key);
        //     for(let i = 0;i<key.length;i++){
        //         // console.log(key[i],i);
        //         if(!isNaN(Number(data[key[i]]))){
        //             let reg = /.*\..*/;
        //             // console.log(data[key[i]],data[key[i]].toString().indexOf("."));
        //             if(reg.test(data[key[i]])){
        //                 data[key[i]] = parseFloat(Number(data[key[i]]));
        //             }else {
        //                 data[key[i]] = Number(data[key[i]]);
        //             }
        //         }
        //         // if(!isNaN(Number(data[index]))){
        //         //     if(data[index].indexOf(".")>=0){
        //         //         data[index] = parseFloat(Number(data[index]));
        //         //     }else {
        //         //         data[index] = Number(data[index]);
        //         //     }
        //         // }
        //     }
        //     // data.ask = parseFloat(data.ask);
        //     this.setState({
        //         data
        //     })
        // })
        // let fiveMinutesChart = echarts.init(document.getElementById('five-minutes-chart'));
    }

    render(){
        const { data } = this.state;
        return(
            <View>
                <View>
                    <View>
                        <Text>{data.cname}</Text>
                        <Text>{data.ask}</Text>
                        <View>
                            <Text>{data.upOrDown >0?"+"+data.upOrDown:data.upOrDown}</Text>
                            <Text>{data.rate >0?"+"+data.rate:data.rate}%</Text>
                        </View>
                    </View>
                </View>
                <View>
                    <View>
                        <View>
                            <Text>买价</Text>
                            <Text>{data.buyprice}</Text>
                        </View>
                        <View>
                            <Text>卖价</Text>
                            <Text>{data.sellprice}</Text>
                        </View>
                        <View>
                            <Text>最高价</Text>
                            <Text>{data.high}</Text>
                        </View>
                        <View>
                            <Text>最低价</Text>
                            <Text>{data.low}</Text>
                        </View>
                    </View>
                </View>
                <View style={{width: "70%", alignItems: "center", display: "flex", flexDirection: "row"}}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.setState({key: "1"})
                    }}>
                        <View style={this.state.key === "1" ? styles.checked : styles.unChecked}>
                            <Text style={{fontSize: 18, lineHeight: 40}}>分时图</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        this.setState({key: "2"})
                    }}>
                        <View style={this.state.key === "2" ? styles.checked : styles.unChecked}>
                            <Text style={{fontSize: 18, lineHeight: 40}}>5分钟</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <View>
                    {
                        this.state.key === "1"?<TimeShareChart />:<FiveMinutesChart />
                    }
                </View>
                <View>
                    <View>
                        <Image source={require("../../../img/chongzhi.png")}/>
                        <View>
                            <Text>可用资金(元)</Text>
                            <Text>1234.00</Text>
                        </View>
                        <Text>充值</Text>
                    </View>
                    <Text>{data.status === 1?"交易中":"未交易"}（交易时间{data.transactionhour}）</Text>
                    <View>
                        <Text>买涨1234.00</Text>
                        <Text>
                            <Image source={require("../../../img/xiadan.png")}/>
                            <Text>
                                闪电下单
                            </Text>
                        </Text>
                        <Text>买跌1234.00</Text>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    checked: {
        width:100,
        height:40,
        lineHeight: 40,
        fontSize: 20,
        alignItems: "center",
        color: "#2e8bff",
        borderBottomWidth: 2,
        borderColor: "#2e8bff",
    },
    unChecked: {
        width:100,
        height:40,
        lineHeight: 40,
        fontSize: 20,
        alignItems: "center",
        color: "#aaa",
        borderBottomWidth: 0,
        borderColor: "#aaa"
    },
    content: {
        marginLeft: -100,
        marginTop:30,
        width: "100%"
    },
    checkWrap:{
        marginLeft: 100,
        alignItems: "center",
        marginTop: 30,
    },
    checkButton: {
        textAlign: "center",
        height: 30,
        lineHeight: 30,
        width: 150,
        backgroundColor: "#2e8bff",
        color: "white",
        borderRadius: 15
    }
});

export default TrendChat