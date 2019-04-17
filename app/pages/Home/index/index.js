import React from 'react';
import { Dimensions, Animated, View, Text, Image, StyleSheet, Button, AsyncStorage,
    TextInput, ImageBackground, TouchableHighlight, ScrollView } from 'react-native';
import { Icon, SearchBar, NoticeBar } from '@ant-design/react-native';
// import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import Api from '../../../utils/api'
// import {fetchPostsGetUser} from '../../actions/getUserInfo';
import {fetchPostsIfNeeded} from '../../../actions/login';
import { connect } from 'react-redux'
import { getDateOrTime } from "../../../utils/apiMethod"

const maxHeight = Dimensions.get('window').height;
const maxWidth  = Dimensions.get('window').width;

class Index extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            isLogin: true,
            news: [],
            data: [],
            data1: [],
            balance: 0,
            yes_run_water: 0,
            yes_run_amount: 0,
            run_water: 3,
            run_amount: 400,
        }
    }

    componentDidMount(){
        this.props.dispatch(fetchPostsIfNeeded({utel:"18281725151",password:"123456"})).then(res => {

        }).catch(res => {

        });
        this.getIndex()
    }

    getIndex(){
        Api.homeIndex().then(res => {
            // alert("homeIndex-success")
            let datas = res.data.news;
            let arr = [];
            let data = res.data.catgood;
            for(let i=0;i<data.length;i++){
                if(data[i].cname.indexOf("离岸人民币") >= 0){
                    data[i].img = require("../../../img/cn.png")
                }else if(data[i].cname.indexOf("恒指") >= 0){
                    data[i].img = require("../../../img/hongkong.png")
                }else {
                    data[i].img = require("../../../img/german.png")
                }
            }
            let data1 = [];
            data1.push(data[2]);
            data1.push(Math.random()>0.5?data[0]:data[1]);
            for(let i=0;i<datas.length;i++){
                let date = getDateOrTime(datas[i].addtime*1000,"-","date-second");
                arr.push({time:date,news:""});
                // arr[i].time = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+
                //     date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
                arr[i].news = datas[i].info;
            }
            for(let i=0;i<datas.length;i++){
                let date = new Date(datas[i].addtime*1000);
                arr.push({time:"",news:""});
                arr[i+datas.length].time = date.getFullYear()+'-'+(date.getMonth()+1)+'-'+date.getDate()+' '+
                    date.getHours()+':'+date.getMinutes()+':'+date.getSeconds();
                arr[i+datas.length].news = datas[i].info;
            }
            this.setState({
                news:arr,
                data:data?data:[],
                data1:data1?data1:[],
                balance:res.data.balance,
                yes_run_water:res.data.yes_run_water,
                yes_run_amount:res.data.yes_run_amount,
                run_water:res.data.run_water,
                run_amount:res.data.run_amount,
            });
        }).catch(res => {

        })
    }

    goLogin(){
        const { navigate } = this.props.navigation;
        alert(navigate('StockChart', { isFirst: true }))
        navigate('StockChart', { isFirst: true });
        // navigate('Login', { isFirst: true });
    }

    render(){
        const { data,data1 } = this.state;
        return(
            <View>
                <ImageBackground source={require("../../../img/bg-banner.png")} style={{position:"relative",alignItems:"center",width: maxWidth,height: 0.56*maxWidth}}>
                    <Text onPress={()=>this.goLogin()} style={{position: "absolute",top:20,left:15,width: 22,height: 40}}>
                        <Image style={{width: 22,height: 20}} source={require("../../../img/login.png")} />
                    </Text>
                    <Text style={{position: "absolute",top:20,right:15,width:22,height: 40}}>
                        <Image style={{width: 22,height: 20}} source={require("../../../img/msg.png")} />
                    </Text>
                    <View style={{marginTop: 40,marginBottom: 30}}>
                        <Text style={{textAlign: "center",fontWeight: "bold",color: "white",fontSize: 40}}>50</Text>
                        <Text style={{textAlign: "center",fontWeight: "bold",color: "white",fontSize: 16}}>资产总额（元）</Text>
                    </View>
                    <View style={{width:maxWidth,display: "flex",flexDirection: "row"}}>
                        <View style={{width: maxWidth/2}}>
                            <Text style={{textAlign: "center",fontSize: 20,color: "white",fontWeight: "bold"}}>0</Text>
                            <Text style={{textAlign: "center",fontSize: 14,color: "white"}}>昨日流水（单）</Text>
                        </View>
                        <View style={{width: maxWidth/2}}>
                            <Text style={{textAlign: "center",fontSize: 20,color: "white",fontWeight: "bold"}}>0</Text>
                            <Text style={{textAlign: "center",fontSize: 14,color: "white"}}>累计订单（单）</Text>
                        </View>
                    </View>
                </ImageBackground>
                <NoticeBar mode="link">
                    Notice: The arrival time of incomes and transfers of Yu 'E Bao will be
                    delayed during National Day.
                </NoticeBar>
                <View style={styles.products}>
                    <View style={styles.title}>
                        <Text style={styles.titleName}>优选项目</Text>
                    </View>
                    <View style={{padding: 0}}>
                        {
                            data.map((item, index) => {
                                return <TouchableHighlight underlayColor="transparent" style={{width: "100%",height: 60}} onPress={()=>{
                                    // window.location.href = "#/Dashboard/Stockchart/"+item.code
                                }} key={index}>
                                    <View style={{width: "100%",height: 50,marginTop: 5,display: "flex", flexDirection: "row"}}>
                                        <Image style={{width: 50,height: 50,marginRight: 20}} source={item.img} alt=""/>
                                        <View style={{width: 100,height: 50,display: "flex",flexDirection: "column"}}>
                                            <Text style={{fontSize: 12,width: 100,height: 25,lineHeight: 25,textAlign: "center"}}>{item.cname+"-"+item.code}</Text>
                                            <Text style={{fontSize: 8,width: 100,height: 25,lineHeight: 25,textAlign: "center"}}>{item.Introduction}</Text>
                                        </View>
                                        <View style={{width: 80,height: 50,display: "flex",flexDirection: "column"}}>
                                            <Text style={{fontSize: 12,width: 80,height: 25,lineHeight: 25,textAlign: "center"}}>{parseFloat(item.ask)}</Text>
                                            <Text style={{fontSize: 8,width: 80,height: 25,lineHeight: 25,textAlign: "center"}}>最新价</Text>
                                        </View>
                                        <View style={{width: 100,height: 50,display: "flex",flexDirection: "column"}}>
                                            <Text style={{fontSize: 12,width: 100,height: 25,lineHeight: 25,textAlign: "center"}}>{(item.diffrate > 0? "+":"")+item.diffrate}%</Text>
                                            <Text style={{fontSize: 8,width: 100,height: 25,lineHeight: 25,textAlign: "center"}}>涨跌幅</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            })
                        }
                    </View>
                </View>
                <View style={styles.products}>
                    <View style={styles.title}>
                        <Text style={styles.titleName}>推荐项目</Text>
                    </View>
                    <View style={{padding: 0}}>
                        {
                            data1.map((item, index) => {
                                return <TouchableHighlight underlayColor="transparent" style={{width: "100%",height: 60}} onPress={()=>{
                                    // window.location.href = "#/Dashboard/Stockchart/"+item.code
                                }} key={index}>
                                    <View style={{width: "100%",height: 50,marginTop: 5,display: "flex", flexDirection: "row"}}>
                                        <Image style={{width: 50,height: 50,marginRight: 20}} source={item.img} alt=""/>
                                        <View style={{width: 100,height: 50,display: "flex",flexDirection: "column"}}>
                                            <Text style={{fontSize: 12,width: 100,height: 25,lineHeight: 25,textAlign: "center"}}>{item.cname+"-"+item.code}</Text>
                                            <Text style={{fontSize: 8,width: 100,height: 25,lineHeight: 25,textAlign: "center"}}>{item.Introduction}</Text>
                                        </View>
                                        <View style={{width: 80,height: 50,display: "flex",flexDirection: "column"}}>
                                            <Text style={{fontSize: 12,width: 80,height: 25,lineHeight: 25,textAlign: "center"}}>{parseFloat(item.ask)}</Text>
                                            <Text style={{fontSize: 8,width: 80,height: 25,lineHeight: 25,textAlign: "center"}}>最新价</Text>
                                        </View>
                                        <View style={{width: 100,height: 50,display: "flex",flexDirection: "column"}}>
                                            <Text style={{fontSize: 12,width: 100,height: 25,lineHeight: 25,textAlign: "center"}}>{(item.diffrate > 0? "+":"")+item.diffrate}%</Text>
                                            <Text style={{fontSize: 8,width: 100,height: 25,lineHeight: 25,textAlign: "center"}}>涨跌幅</Text>
                                        </View>
                                    </View>
                                </TouchableHighlight>
                            })
                        }
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    titleName: {
        borderLeftWidth: 2,
        borderColor: "#2e8bff",
        paddingLeft: 10
    },
    title: {
        padding: 0
    },
    products: {
        width: maxWidth,
        padding: 10
    },
    checked: {
        width:100,
        height:40,
        lineHeight: 40,
        fontSize: 20,
        textAlign: "center",
        color: "#2e8bff",
        borderBottomWidth: 2,
        borderColor: "#2e8bff",
    },
    unChecked: {
        width:100,
        height:40,
        lineHeight: 40,
        fontSize: 20,
        textAlign: "center",
        color: "#aaa",
        borderBottomWidth: 0,
        borderColor: "#aaa"
    },
    content: {
        marginTop:30,
        width: "100%"
    },
    checkWrap:{
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
)(Index)
