import React from "react"
import { Dimensions, Animated, View, Text, Image, Touchable, Button, AsyncStorage,
    TextInput,TouchableWithoutFeedback } from 'react-native';
import { Icon, SearchBar } from '@ant-design/react-native';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
// import {Icon, Button} from "antd";

class ChargeAndWithdrawDeposit extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            id:1,
            data1:[0,0,0,0,0,0,0,0],
            data2:[0,0],
        }
    }

    checkMoney(index){
        let data1 = this.state.data1
        for(let i=0;i<data1.length;i++){
            data1[i] = 0
        }
        data1[index] = 1;
        this.setState({
            data1
        })
    }

    check(index){
        let data2 = this.state.data2;
        for(let i=0;i<data2.length;i++){
            data2[i] = 0
        }
        data2[index] = 1;
        this.setState({
            data2
        })
    }

    render(){
        const data1 = [100,200,300,500,1000,2000,3000,5000];
        const data2 = [require("../../img/alipay.png"),require("../../img/bank11.png")];
        return(
            <View>
                <View>
                    <TouchableWithoutFeedback onPress={()=>{}}>
                        <IconOutline name="left" />
                    </TouchableWithoutFeedback>
                    <Text>{this.state.id === "1"?"账户充值":"账户提现"}</Text>
                </View>
                <View>
                    <View>
                        <View>
                            <Text>{this.state.id==="1"?"充值金额":"提现金额"}：</Text>
                        </View>
                        <View>
                            {
                                data1.map((item,index) => {
                                    return <Text onPress={()=>this.checkMoney(index)} key={index}>{item}</Text>
                                })
                            }
                        </View>
                    </View>
                    <View>
                        <View><Text><Text>{this.state.id==="1"?"支付方式":"提现账户"}：</Text></Text></View>
                        <View>
                            {
                                data2.map((item,index) => {
                                    return <Text onPress={()=>this.check(index)} key={index}><Image source={item}/></Text>
                                })
                            }
                        </View>
                    </View>
                    <View>
                        <View>
                            <Text>
                                {this.state.id==="1"?"支付方式":"提现账户"}：
                            </Text>
                        </View>
                        <View>
                            <Text>{this.state.id === "1"?"充值":"提现"}</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

export default ChargeAndWithdrawDeposit