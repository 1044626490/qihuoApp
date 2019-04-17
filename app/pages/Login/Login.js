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
import React from 'react';
import { Dimensions, Animated, View, Text, Image, StyleSheet, Button, AsyncStorage, TextInput } from 'react-native';
import { Icon, SearchBar } from '@ant-design/react-native';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import Api from '../../utils/api'
import {fetchPostsGetUser} from '../../actions/getUserInfo';
import {fetchPostsIfNeeded} from '../../actions/login';
import { connect } from 'react-redux'

const maxHeight = Dimensions.get('window').height;
const maxWidth  = Dimensions.get('window').width;

class Login extends React.Component {
    static navigationOptions = {
        header: null
    };
    constructor(props) {
        super(props);
        this.timeToGetKap = null;
        this.state = {
            selectedTab:"login",
            login:{
                utel:AsyncStorage.getItem("phoneNum")||null,
                password:AsyncStorage.getItem("pwd")||null
            },
            loginForm:[
                {
                    key:"utel",
                    name:"utel",
                    required:true,
                    message:"请输入电话号码",
                    placeholder:"电话号码",
                    before:<IconOutline name="user" />,
                    re:/^1[3456789]\d{9}$/,
                    isOk:"",
                    keyboardType: "phone-pad",
                    textContentType: "telephoneNumber"
                },
                {
                    key:"password",
                    name:"password",
                    required:true,
                    message:"请输入用户密码",
                    placeholder:"用户密码(长度不能低于6位)",
                    isOk:"",
                    re:/^.{6,}$/,
                    before:<IconOutline name="lock" />,
                    keyboardType: "default",
                    textContentType: "password"
                }
            ],
            register:{
                utel:null,
                upwd:null,
                reupwd:null,
                code:null
            },
            Register:[
                {
                    key:"utel",
                    name:"utel",
                    required:true,
                    message:"请输入电话号码",
                    placeholder:"电话号码",
                    isOk:"",
                    before:<IconOutline name="user" />,
                    re:/^1[3456789]\d{9}$/,
                    keyboardType: "phone-pad",
                    textContentType: "telephoneNumber"
                },
                {
                    key:"upwd",
                    name:"upwd",
                    required:true,
                    message:"请输入用户密码",
                    placeholder:"用户密码(长度不能低于6位)",
                    isOk:"",
                    re:/^.{6,}$/,
                    before:<IconOutline name="lock" />,
                    keyboardType: "default",
                    textContentType: "password"
                },
                {
                    key:"reupwd",
                    name:"reupwd",
                    required:true,
                    message:"请确认密码",
                    placeholder:"确认密码",
                    isOk:"",
                    before:<IconOutline name="lock" />,
                    keyboardType: "default",
                    textContentType: "password"
                },
                {
                    key:"code",
                    name:"code",
                    required:true,
                    message:"请输入验证码",
                    placeholder:"验证码",
                    isOk:"",
                    before:<IconOutline name="safety-certificate" />,
                    keyboardType: "default",
                    textContentType: "none"
                }
            ],
            isGetKaptchald: "获取",
            isCheck:false
        };
    }

    handleSubmit = (name) => {
        if(!this.state.isCheck){
            // message.warning("还未同意用户协议");
            return
        }
        let count = 0;
        if(name === "bindPhone"){
            this.state.Register.map((item, index)=>{
                if(item.isOk === "error"){
                    count ++
                }
            });
        }else if(name === "forgetPWD"){
            this.state.Register.map((item, index)=>{
                if(item.isOk === "error"){
                    count ++
                }
            });
        }else {
            this.state[name].map((item, index)=>{
                if(item.isOk === "error"){
                    count ++
                }
            });
        }
        if(count > 0){
            // message.error("信息填写错误");
            return false
        }
        let params = this.state.register;
        name === "Register"?Api.register(params).then((res)=>{
            // message.success(res.msg);
        }).catch((err)=>{
            // message.error(err.msg)
        }):this.props.dispatch(fetchPostsIfNeeded(params)).then((res) => {
            if(res.code ==="0000"){
                AsyncStorage.setItem("phoneNum",this.state.login.utel);
                AsyncStorage.setItem("pwd",this.state.login.password);
                // message.success(res.msg);
                AsyncStorage.setItem("key",'2');
            }
            window.location.href = "#/Dashboard/index/1";
            // localStorage.removeItem("uid")
        }).catch((err) => {
            // message.error(err.msg);
        })
    };

    getKaptchald(){
        let tel = this.state.register.utel;
        let re = /^1[345789]\d{9}$/;
        let isGetKaptchald = 60;
        this.timeToGetKap = setInterval(()=>{
            this.setState({
                isGetKaptchald
            })
            isGetKaptchald--;
            if(isGetKaptchald <= 0){
                clearInterval(this.timeToGetKap)
            }
        },1000)
        if(re.test(tel)){
            Api.sendVerifiCode({utel:tel}).then((res)=>{
                message.success(res.msg);
            }).catch((res)=>{
                message.error(res.msg);
            })
        }
    }

    changeInput = (text, item, index, name1) => {
        let value = text;
        let arr = name1 === "login"?this.state.loginForm:this.state.Register;
        let name2 = name1 === "login"?"loginForm":"Register";
        let name = item.key;
        let form = this.state[name1];
        // alert(value)
        if(item.re){
            if(item.re.test(value)){
                // alert("success")
                arr[index].isOk = "success";
                form[name] = value;
            }else {
                // alert("error")
                form[name] = value;
                arr[index].isOk = "error";
            }
        }else {
            if(value === ""||!value){
                arr[index].isOk = "error";
                form[name] = value;
            }else {
                form[name] = value;
                arr[index].isOk = "success";
            }
        }
        if(item.key === "reupwd"&&this.state.register.upwd ===""&&!this.state.register.upwd){

        }else if(item.key === "reupwd"&&this.state.register.upwd){
            if(value === this.state.register.reupwd&&value === this.state.register.upwd){
                arr[2].isOk = "success";
                arr[3].isOk = "success";
            }else {
                arr[2].isOk = "error";
                arr[3].isOk = "error";
            }
        }else if(item.key === "upwd"){
            if(value !== this.state.register.reupwd&&this.state.register.reupwd !== null&&this.state.register.reupwd.length > 0){
                arr[index].isOk = "error"
            }else {
                arr[index].isOk = "success";
            }
        }
        this.setState({
            [name2]:arr,
            [name1]:form
        })
        // alert(JSON.stringify(arr))
    };

    componentDidMount() {
        // const { navigate } = this.props.navigation;
        // navigate('Home', { isFirst: true });
        // NavigationUtil.reset(this.props.navigation, 'Home');
    }

    componentWillUnmount(){
        clearInterval(this.timeToGetKap)
    }

    tabChange(selectedTab){
        this.setState({
            selectedTab
        })
    }

    goHome(){
        const { navigate } = this.props.navigation;
        navigate('Home', { isFirst: true });
    }

    render() {
        return (
            <View style={{width: maxWidth,height: maxHeight}}>
                <View style={{width: maxWidth,height:50,backgroundColor:"#2e8bff",position: "relative"}}>
                    <Text onPress={()=>this.goHome()}
                          style={{width: 50,height: 50,position: "absolute",left:10,top:0,zIndex:999,alignItems: "center"}}>
                        <Image style={{width: 30,height: 30}}
                                 source={require('../../img/back.png')}/></Text>
                    <Text style={{width:maxWidth,height:50,lineHeight:50,textAlign: "center",color:"white",fontSize:20}}>
                        {this.state.selectedTab === "login"?"用户登录":"用户注册"}</Text>
                </View>
                <View style={{width:maxWidth, paddingLeft: 100,paddingRight: 100,marginTop: 30,alignItems:"center"}}>
                    <View style={{width: 200,height:30,display: "flex",flexDirection: "row",}}>
                        <Text style={this.state.selectedTab === "login"?styles.checked:styles.unChecked}
                              onPress={()=>this.tabChange("login")}>登录</Text>
                        <Text style={this.state.selectedTab === "register"?styles.checked:styles.unChecked}
                              onPress={()=>this.tabChange("register")}>注册</Text>
                    </View>
                    <View style={styles.content}>
                        {
                            this.state.selectedTab === "login"?
                                <View>
                                    {
                                        this.state.loginForm.map((item, index) => {
                                            return <View
                                                // required
                                                // hasFeedback
                                                // validateStatus={item.key !== "code"?item.isOk:""}
                                                // help={item.isOk === "error"?item.message:null}
                                                style={{display: "flex",flexDirection: "row",height:40,lineHeight: 40,alignItems: "center"}}
                                                key={index}
                                            >
                                                {item.before}<TextInput keyboardType={item.keyboardType} textContentType={item.textContentType}
                                                                        //type={(item.key.indexOf("Pwd") >= 0||item.key.indexOf("password") >= 0||item.key.indexOf("Password") >= 0||item.key.indexOf("pwd") >= 0)&&this.state.login[item.key]?"password":"text"}
                                                                        onChangeText={(text)=>this.changeInput(text,item,index,"login")}
                                                                        defaultValue={this.state.login[item.key]}
                                                                        placeholder={item.placeholder}
                                                                        placeholderTextColor="#aaa"
                                                                        style={{borderBottomWidth: 1,borderColor: "#aaa",width: 230,color: item.isOk === ""?"#2e8bff":item.isOk === "success"?"green":"red"}}
                                                                        id={item.isOk}/>
                                            </View>
                                        })
                                    }
                                    <View style={styles.checkWrap}>
                                        <Text style={styles.checkButton}>登录</Text>
                                        <Text style={{width: 100,textAlign: "center",color: "#9b9b9b",marginTop: 10}}>忘记密码?</Text>
                                    </View>
                                </View>
                                :
                                <View>
                                    {
                                        this.state.Register.map((item, index) => {
                                            return <View
                                                // required
                                                // hasFeedback
                                                // validateStatus={item.key !== "code"?item.isOk:""}
                                                // help={item.isOk === "error"?item.message:null}
                                                style={{display: "flex",flexDirection: "row",height:40,lineHeight: 40,alignItems: "center"}}
                                                key={index}
                                            >
                                                {item.before}
                                                <TextInput keyboardType={item.keyboardType} textContentType={item.textContentType}
                                                //type={(item.key.indexOf("Pwd") >= 0||item.key.indexOf("password") >= 0||item.key.indexOf("Password") >= 0||item.key.indexOf("pwd") >= 0)&&this.state.login[item.key]?"password":"text"}
                                                           onChange={(e)=>this.changeInput(e,item,index,"Register")}
                                                           defaultValue={this.state.Register[item.key]}
                                                           placeholder={item.placeholder}
                                                           placeholderTextColor="#aaa"
                                                           style={{borderBottomWidth: 1,borderColor: "#aaa",width: item.name === "code"?160:230,color: item.isOk === ""?"#2e8bff":item.isOk === "success"?"green":"red"}}
                                                           id={item.isOk}/>
                                                {item.name === "code"?<Text style={{marginLeft:10,marginTop:10,width:60,
                                                    height:30,lineHeight: 30,backgroundColor: "#2e8bff",color: "white",
                                                    fontSize:16, alignContent: "center",textAlign: "center"}}
                                                    onPress={this.state.isGetKaptchald === "获取"?()=>this.getKaptchald():null}
                                                >
                                                    {this.state.isGetKaptchald}</Text>:null}
                                            </View>
                                        })
                                    }
                                    <View style={styles.checkWrap}>
                                        <Text style={styles.checkButton}>注册</Text>
                                    </View>
                                    <View style={styles.checkWrap}>

                                    </View>
                                </View>
                        }
                    </View>
                </View>
            </View>
//      />
        );
    }
}

const styles = StyleSheet.create({
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

const mapState = state => {
    const {userInfo} = state;
    return {userInfo}
}

const mapDispatch = dispatch => ({
    dispatch
})

export default connect(
    mapState,
    mapDispatch
)(Login)
