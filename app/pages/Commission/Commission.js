import React from "react"
import { Dimensions, Animated, View, Text, Image, Touchable, Button, AsyncStorage,
    TextInput,TouchableWithoutFeedback } from 'react-native';
import { Icon, SearchBar } from '@ant-design/react-native';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import Api from "../../utils/api"
import { getDateOrTime } from "../../utils/apiMethod"

const maxHeight = Dimensions.get('window').height;
const maxWidth  = Dimensions.get('window').width;

class Commission extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            data1: [],
            activeKey:"1",
            isOpenDrawer:false,
        }
    }

    componentDidMount(){
        Api.myCustomer().then(res => {
            let arr = [];
            for(let i=0;i< res.data.length;i++){
                arr.push({});
                arr[i].tel = res.data[i].utel.slice(0,3)+"****"+res.data[i].utel.slice(7,11);
                arr[i].registreDate = getDateOrTime(res.data[i].utime);
                arr[i].level = res.data[i].otype === 0?"普通会员":res.data[i].otype === 1?"经纪人":res.data[i].otype === 2?"会员单位":"超级管理员";
                arr[i].order = res.data[i].count_order;
                arr[i].orderAll = res.data[i].count_amount;
                arr[i].commission = res.data[i].fee;
            }
            this.setState({
                data:arr
            })
        }).catch(res => {

        });
        Api.myScustomer().then(res => {
            let arr = [];
            for(let i=0;i< res.data.length;i++){
                arr.push({});
                arr[i].tel = res.data[i].utel.slice(0,3)+"****"+res.data[i].utel.slice(7,11);
                arr[i].registreDate = getDateOrTime(res.data[i].utime);
                arr[i].level = res.data[i].otype === 0?"普通会员":res.data[i].otype === 1?"经纪人":res.data[i].otype === 2?"会员单位":"超级管理员";
                arr[i].order = res.data[i].count_order;
                arr[i].orderAll = res.data[i].count_amount;
                arr[i].commission = res.data[i].fee;
            }
            this.setState({
                data1:arr
            })
        }).catch(res => {

        })
    }

    render(){
        // const item = this.state.data;
        // let date = this.state.data.registreDate.split("-").join(".");
        // item.registreDate = date;
        return(
            <View>
                <View>
                    <TouchableWithoutFeedback onPress={()=>{}}>
                        <IconOutline name="left" />
                    </TouchableWithoutFeedback>
                    <Text>佣金</Text>
                </View>
                <View>
                    <View>
                        <TouchableWithoutFeedback onPress={()=>{this.setState({activeKey:"1"})}} style={{width:maxWidth/3,height:90}}>
                            <View style={{width:maxWidth/3,height:90,alignItems: "center"}}>
                                <Text style={{height:20,lineHeight: 20,textAlign: "center",color: this.state.activeKey === "1"?
                                        "#2e8bff":"#ddd",fontSize:12}}>一级分佣</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={()=>{this.setState({activeKey:"2"})}} style={{width:maxWidth/3,height:90}}>
                            <View style={{width:maxWidth/3,height:90,alignItems: "center"}}>
                                <Text style={{height:20,lineHeight: 20,textAlign: "center",color: this.state.activeKey === "2"?
                                        "#2e8bff":"#ddd",fontSize:12}}>二级分佣</Text>
                            </View>
                        </TouchableWithoutFeedback>
                    </View>
                    <View>
                        {
                            this.state.activeKey === "1"?this.state.data.map((item, index) => {
                                return <View key={index}>
                                                <View>
                                                    <Text>手机号</Text>
                                                    <Text>{item.tel}</Text>
                                                    <Text>注册时间</Text>
                                                    <Text>{item.registreDate}</Text>
                                                </View>
                                                <View>
                                                    <Text>级别</Text>
                                                    <Text>{item.level}</Text>
                                                    <Text>历史订单</Text>
                                                    <Text>{item.order}笔</Text>
                                                </View>
                                                <View>
                                                    <Text>订单总额</Text>
                                                    <Text>{item.orderAll}</Text>
                                                    <Text>佣金</Text>
                                                    <Text>{item.commission}</Text>
                                                </View>
                                        </View>
                            }):this.state.data1.map((item, index) => {
                                return <View key={index}>
                                    <View>
                                        <Text>手机号</Text>
                                        <Text>{item.tel}</Text>
                                        <Text>注册时间</Text>
                                        <Text>{item.registreDate}</Text>
                                    </View>
                                    <View>
                                        <Text>级别</Text>
                                        <Text>{item.level}</Text>
                                        <Text>历史订单</Text>
                                        <Text>{item.order}笔</Text>
                                    </View>
                                    <View>
                                        <Text>订单总额</Text>
                                        <Text>{item.orderAll}</Text>
                                        <Text>佣金</Text>
                                        <Text>{item.commission}</Text>
                                    </View>
                                </View>
                            })
                        }
                    </View>
                    {/*<Tabs defaultActiveKey={this.state.activeKey} onChange={(value)=>{this.setState({activeKey:value})}}>*/}
                    {/*    <TabPane tab="一级分佣" key="1">*/}
                    {/*        {*/}
                    {/*            this.state.data.map((item, index) => {*/}
                    {/*                return <table key={index}>*/}
                    {/*                    <tbody>*/}
                    {/*                    <tr>*/}
                    {/*                        <td><span>手机号</span></td>*/}
                    {/*                        <td><span>{item.tel}</span></td>*/}
                    {/*                        <td><span>注册时间</span></td>*/}
                    {/*                        <td><span>{item.registreDate}</span></td>*/}
                    {/*                    </tr>*/}
                    {/*                    <tr>*/}
                    {/*                        <td><span>级别</span></td>*/}
                    {/*                        <td><span>{item.level}</span></td>*/}
                    {/*                        <td><span>历史订单</span></td>*/}
                    {/*                        <td><span>{item.order}笔</span></td>*/}
                    {/*                    </tr>*/}
                    {/*                    <tr>*/}
                    {/*                        <td><span>订单总额</span></td>*/}
                    {/*                        <td><span>{item.orderAll}</span></td>*/}
                    {/*                        <td><span>佣金</span></td>*/}
                    {/*                        <td><span>{item.commission}</span></td>*/}
                    {/*                    </tr>*/}
                    {/*                    </tbody>*/}
                    {/*                </table>*/}
                    {/*            })*/}
                    {/*        }*/}
                    {/*    </TabPane>*/}
                    {/*    <TabPane tab={<span>二级分佣<img onClick={(e)=>{e.stopPropagation();this.setState({isOpenDrawer:true})}} src={require("../../layouts/image/shaixuan.png")} alt=""/></span>} key="2">*/}
                    {/*        {*/}
                    {/*            this.state.data1.map((item, index) => {*/}
                    {/*                return <table key={index}>*/}
                    {/*                    <tbody>*/}
                    {/*                    <tr>*/}
                    {/*                        <td><span>手机号</span></td>*/}
                    {/*                        <td><span>{item.tel}</span></td>*/}
                    {/*                        <td><span>注册时间</span></td>*/}
                    {/*                        <td><span>{item.registreDate}</span></td>*/}
                    {/*                    </tr>*/}
                    {/*                    <tr>*/}
                    {/*                        <td><span>级别</span></td>*/}
                    {/*                        <td><span>{item.level}</span></td>*/}
                    {/*                        <td><span>历史订单</span></td>*/}
                    {/*                        <td><span>{item.order}笔</span></td>*/}
                    {/*                    </tr>*/}
                    {/*                    <tr>*/}
                    {/*                        <td><span>订单总额</span></td>*/}
                    {/*                        <td><span>{item.orderAll}</span></td>*/}
                    {/*                        <td><span>佣金</span></td>*/}
                    {/*                        <td><span>{item.commission}</span></td>*/}
                    {/*                    </tr>*/}
                    {/*                    </tbody>*/}
                    {/*                </table>*/}
                    {/*            })*/}
                    {/*        }*/}
                    {/*    </TabPane>*/}
                    {/*</Tabs>*/}
                </View>
            </View>
        )
    }
}

export default Commission