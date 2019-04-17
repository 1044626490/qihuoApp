import React from "react"
import {
    Dimensions, Animated, View, Text, Image, Touchable, Button, AsyncStorage, Picker,
    SafeAreaView, TouchableWithoutFeedback, ScrollView
} from 'react-native';
import {Echarts, echarts} from "react-native-secharts";

class TimeShareChart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            option:{
                title: { text: 'ECharts 入门示例' },
                tooltip: {},
                xAxis: {
                    data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [{
                    name: '销量',
                    type: 'bar',
                    data: [5, 20, 36, 10, 10, 20]
                }]
            }
        }
    }

    componentDidMount(): void {
        alert(JSON.stringify(echarts))
        // let setT = setTimeout(()=>{
        //     echarts.setOption({
        //         xAxis: {
        //             type: 'category',
        //             data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        //         },
        //         yAxis: {
        //             type: 'value'
        //         },
        //         series: [{
        //             data: [820, 932, 901, 934, 1290, 1330, 1320],
        //             type: 'line'
        //         }]
        //     });
        //     // this.setState({
        //     //     option
        //     // })
        // },2000)
    }

    render(){
        return(
            <SafeAreaView style={{width:"100%",height:300}}>
                <Echarts width={300} height={300} option={this.state.option}></Echarts>
            </SafeAreaView>
        )
    }
}

export default TimeShareChart