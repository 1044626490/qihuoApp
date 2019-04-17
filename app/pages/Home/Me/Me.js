import React from 'react';
import { Dimensions, Animated, View, Text, Image, TouchableWithoutFeedback, StyleSheet } from 'react-native';
// import { Icon, SearchBar } from '@ant-design/react-native';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
// import Api from '../../../utils/api'
// import {fetchPostsGetUser} from '../../actions/getUserInfo';
// import {fetchPostsIfNeeded} from '../../../actions/login';
import { connect } from 'react-redux'
// import { getDateOrTime } from "../../../utils/apiMethod"

const maxHeight = Dimensions.get('window').height;
const maxWidth  = Dimensions.get('window').width;

class Me extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isOpenMyTwo:false,
        }
    }

    componentDidMount(){

    }

    render(){
        const data = [
            // {
            //     name: "账户充值",
            //     img: require("../../../layouts/image/charge.png"),
            //     callback: ()=>{}
            // },
            {
                name: "收支明细",
                img: require("../../../img/income.png"),
                callback: ()=>{
                    // window.location.href = "#/Dashboard/incomeAndExpenses"
                }
            },{
                name: "佣金详情",
                img: require("../../../img/money.png"),
                callback: ()=>{
                    // window.location.href = "#/Dashboard/Commission"
                }
            },{
                name: "二维码",
                img: require("../../../img/two.png"),
                callback: ()=>{
                    this.setState({isOpenMyTwo:true})
                }
            },{
                name: "软件下载",
                img: require("../../../img/download.png"),
                callback: ()=>{
                    this.props.navigation.navigate('Download')
                    // window.location.href = "#/Dashboard/DownloadApp"
                }
            },{
                name: "问题反馈",
                img: require("../../../img/feedback.png"),
                callback: ()=>{
                    // window.location.href = "#/Dashboard/Feedback"
                }
            },{
                name: "绑定银行卡",
                img: require("../../../img/bank.png"),
                callback: ()=>{
                    this.props.navigation.navigate('TiedCard')
                    // window.location.href = "#/Dashboard/TiedCard"
                }
            },{
                name: "修改交易密码",
                img: require("../../../img/repwd.png"),
                callback: ()=>{
                    // window.location.href= "#/Dashboard/ReDealPasswordIndex"
                }
            },{
                name: "退出账户",
                img: require("../../../img/outlogin.png"),
                callback: ()=>{}
            },

        ];
        return(
            <View style={styles.Me}>
                <View style={{display: "flex",flexDirection: "row",width: maxWidth,height: 60,paddingLeft: 10,
                    borderBottomWidth: 1,borderColor: "#eeeeee"}}>
                    <Image style={{marginTop:10,width: 40,height: 40,marginRight: 10,borderRadius: 20}} source={require("../../../img/me1.png")}/>
                    <View style={{width: 150,textAlign: "left",height: 60}}>
                        <Text style={{width: 150,textAlign: "left",height: 30,lineHeight: 30}}>18281725151</Text>
                        <Text style={{width: 150,textAlign: "left",height: 30,lineHeight: 30}}>{(18281725151).toString().slice(0,3)+"****"+(18281725151).toString().slice(7,11)}</Text>
                    </View>
                </View>
                <View style={{width: maxWidth,padding: 10,height: 80,display: "flex",flexDirection: "row"}}>
                    <View style={{width: maxWidth/3,alignItems: "center",height: 60}}>
                        <Text style={{color: "#000",fontSize: 26,textAlign:"center",width: maxWidth/3,height:30,lineHeight: 30}}>50</Text>
                        <Text style={{fontSize:12,textAlign:"center",width: maxWidth/3,height:30,lineHeight: 30}}>账户余额</Text>
                    </View>
                    <View style={{width: maxWidth*1/2,display: "flex", flexDirection: "row-reverse",height: 60,lineHeight: 60,paddingTop:17.5}}>
                        <Text style={{textAlign: "center",borderRadius:12.5,width: 60,height: 25,lineHeight: 25,backgroundColor: "#2e8bff",color: "#fff"}}>充值</Text>
                        <Text style={{textAlign: "center",borderRadius:12.5,width: 60,height: 25,lineHeight: 25,backgroundColor: "#fff",color: "#2e8bff"}}>提现</Text>
                    </View>
                </View>
                <View style={{width: maxWidth,padding: 10}}>
                    {
                        data.map((item, index) =>{
                            return <TouchableWithoutFeedback onPress={item.callback}>
                                <View style={{display: "flex",flexDirection: "row",width: (maxWidth-20),height: 60,
                                    borderBottomWidth: 1,borderColor: "#f5f5f5"}} key={index}>
                                    <Image style={{width: 40,height: 40,marginTop: 10,}} source={item.img}/>
                                    <Text style={{width: 100,height: 60,lineHeight: 60,marginLeft: 10}}>{item.name}</Text>
                                    <Text style={{width: (maxWidth-170),height: 60,lineHeight: 60,textAlign: "right"}}>
                                        <IconOutline name="right" style={{color: "#aaa"}}/>
                                    </Text>
                                </View>
                            </TouchableWithoutFeedback>
                        })
                    }
                </View>
                {
                    this.state.isOpenMyTwo?<View style={{position: "absolute",left: 0,top: -50,
                        width:maxWidth,height: maxHeight,zIndex: 999,backgroundColor: "rgba(0,0,0,0.2)"}}>
                        <View style={{position: "absolute", top: (maxHeight/2-150),left: (maxWidth/2-150),width: 300,height:303,zIndex: 9999}}>
                            <Image source={require("../../../img/two1.png")} style={{width: 300,height: 303}}/>
                        </View>
                        <Text style={{position: "absolute", left: 0,top: 0,zIndex:1000,width: maxWidth,height: maxHeight}}
                              onPress={()=>{this.setState({isOpenMyTwo:false})}}>{null}</Text>
                    </View>:null
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    Me: {
        alignItems: "center",
        position: "relative"
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
)(Me)