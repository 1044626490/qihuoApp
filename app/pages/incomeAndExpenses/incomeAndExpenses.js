import React from "react"
import { connect } from "react-redux";
import { Dimensions, Animated, View, Text, Image, StyleSheet, Button, AsyncStorage,Picker,
    TextInput,TouchableWithoutFeedback } from 'react-native';
import { Icon, SearchBar } from '@ant-design/react-native';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import Api from "../../utils/api"
// import $ from "jquery"
import { getDateOrTime, formatNum } from "../../utils/apiMethod"

class IncomeAndExpenses extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            date:"1",
            dates:0,
            page:1,
            balance:0,
            total_revenue:0,
            total_withdrawal:0,
            product_cate:[{"pid":0,"ptitle":"不限"}],
            data:[],
            expenditure:0,
            revenue:0,
        }
    }

    fundDetails(page){
        Api.fundDetailsNextPage({pid:this.state.dates,page:page,date_type:this.state.date}).then(res => {
            let data = this.state.data;
            for (let i=0;i<res.data.order_data.length;i++){
                data.push(res.data.order_data[i])
            }
            this.setState({
                data,
                expenditure:Math.abs(res.data.expenditure),
                revenue:Math.abs(res.data.revenue),
            })
        }).catch((res => {
            message.error(res.msg)
        }))
    }

    componentDidMount(){
        Api.fundDetails({date_type:this.state.date}).then(res => {
            let arr = [{"pid":0,"ptitle":"不限"}];
            for(let i=0;i<res.data.product_cate.length;i++){
                arr.push(res.data.product_cate[i])
            }
            this.setState({
                balance:res.data.balance,
                total_revenue:res.data.total_revenue,
                total_withdrawal:res.data.total_withdrawal,
                product_cate:arr,
            })
        }).catch(res => {
            message.error(res.msg)
        });
        this.fundDetails(1);
        // $(".income-expenses-container").scroll(() => {
        //     // scroll at bottom
        //     if ($(".income-expenses-container").scrollTop() + $(".income-expenses-container").height() >= $(".container-content-header").height()+$(".select-wrap").height()+$(".income-content").height() - 1) {
        //         // load data
        //         let page = this.state.page;
        //         page++;
        //         this.fundDetails(page);
        //         this.setState({
        //             page
        //         })
        //     }
        // });

        // (() => {
        //     $(".income-expenses-container").on('scroll',() =>{
        //         if($(".income-expenses-container").scrollTop() >= 67){
        //             $(".select-wrap").css({
        //                 position: "fixed",
        //                 top: "6.9vh",
        //                 left: "2.67vw",
        //             })
        //         }else {
        //             $(".select-wrap").removeAttr("style")
        //         }
        //     })
        // })();
        // $(".order-select").removeAttr("style")
    }

    select(name,value){
        this.fundDetails(1);
        this.setState({
            page:1,
            [name]:value
        })
    }

    render(){
        return(
            <View>
                <View >
                    <Icon onClick={()=>{window.history.go(-1)}} type="left" />
                    <Text>收支明细</Text>
                </View>
                <View>
                    <View>
                        <View>
                            <Text>{formatNum(this.state.total_revenue)}</Text>
                            <Text>累计收益&nbsp;(元)</Text>
                        </View>
                        <View>
                            <Text>{formatNum(this.state.total_withdrawal)}</Text>
                            <Text>累计提现&nbsp;(元)</Text>
                        </View>
                        <View>
                            <Text>{formatNum(this.state.balance)}</Text>
                            <Text>账户余额&nbsp;(元)</Text>
                        </View>
                    </View>
                    <View className="select-wrap">
                        <Picker
                            selectedValue={this.state.date}
                            style={{ width: 120 }}
                            onValueChange={(value)=>this.select("date",value)}
                        >
                            <Picker.Item value="1" label="本月"/>
                            <Picker.Item value="2" label="本周"/>
                            <Picker.Item value="3" label="今日"/>
                            <Picker.Item value="4" label="今年"/>
                        </Picker>
                        <Picker
                            selectedValue={this.state.dates}
                            style={{ width: 120 }}
                            onValueChange={(value)=>this.select("dates",value)}>
                            {
                                this.state.product_cate.map((item) => {
                                    return <Picker.Item value={item.pid} label={item.ptitle} key={item.pid}/>
                                })
                            }
                        </Picker>
                        <Text style={{whiteSpace:"nowrap"}}>
                            收入：{formatNum(this.state.revenue)}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            支出：{formatNum(this.state.expenditure)}
                        </Text>
                    </View>
                    <View>
                        <View>
                            {
                                this.state.data.map((item, index) => {

                                    let date = getDateOrTime(item.buytime*1000,"-","date-second");
                                    let img = item.pid === 13?require("../../img/german.png"):
                                        item.pid === 14?require("../../img/cn.png"):
                                            require("../../img/hongkong.png")
                                    return <View key={index}>
                                        <Image source={img} alt=""/>
                                        <View>
                                            <Text style={{float:"none",display:"block"}}>{item.ptitle}</Text>
                                            <Text style={{float:"none",display:"block"}}>{date}</Text>
                                        </View>
                                        <Text>{item.ostyle > 0?"+":""}{item.onumber}</Text>
                                    </View>
                                })
                            }
                        </View>
                        <View><Text>已到底部</Text></View>
                    </View>
                </View>
            </View>
        )
    }
}

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
)(IncomeAndExpenses)