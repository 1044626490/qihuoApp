import React from 'react';
import { Dimensions, Animated, View, Text, Image, StyleSheet, Button, AsyncStorage,
    TextInput, ImageBackground, TouchableWithoutFeedback, ScrollView } from 'react-native';
// import { Icon, SearchBar, NoticeBar } from '@ant-design/react-native';
// import { IconFill, IconOutline } from "@ant-design/icons-react-native";
// import Api from '../../utils/api'
// import {fetchPostsGetUser} from '../../actions/getUserInfo';
// import {fetchPostsIfNeeded} from '../../actions/login';
import { connect } from 'react-redux'
// import { getDateOrTime } from "../../utils/apiMethod"
import Index from "./index/index"
import Me from "./Me/Me"
import Order from "./Order/Order"

const maxHeight = Dimensions.get('window').height;
const maxWidth  = Dimensions.get('window').width;

class Home extends React.Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            index: 1,
        }
    }

    render(){
        return(
            <View style={{alignItems: "center",width: maxWidth,height: maxHeight,position: "relative"}}>
                {
                    this.state.index === 3?<View style={{width: maxWidth,height:50,backgroundColor: "#2e8bff",alignItems: "center"}}>
                        <Text style={{fontWeight: "bold",color: "white",fontSize: 26,height: 50,lineHeight: 50}}>我的</Text>
                    </View>:this.state.index === 2?<View style={{width: maxWidth,height:50,backgroundColor: "#2e8bff",alignItems: "center"}}>
                        <Text style={{fontWeight: "bold",color: "white",fontSize: 26,height: 50,lineHeight: 50}}>订单</Text>
                    </View>:null
                }
                {
                    this.state.index !== 2?<ScrollView style={{width: maxWidth,height: this.state.index !==1?(maxHeight-140):(maxHeight-90),position: "absolute",top: this.state.index ===1?0:50,left: 0}}>
                        {
                            this.state.index === 1?<Index navigation={this.props.navigation}/>:this.state.index === 2?<Order navigation={this.props.navigation}/>:<Me navigation={this.props.navigation}/>
                        }
                    </ScrollView>:
                        <View style={{width: maxWidth,height: this.state.index !==1?(maxHeight-140):(maxHeight-90),position: "absolute",top: this.state.index ===1?0:50,left: 0}}>
                            {
                                this.state.index === 1?<Index navigation={this.props.navigation}/>:this.state.index === 2?<Order navigation={this.props.navigation}/>:<Me navigation={this.props.navigation}/>
                            }
                        </View>
                }
                <View style={{width: maxWidth,height: 80,position: "absolute",bottom: 0,
                    left: 0,display: "flex",flexDirection: "row"}}>
                    <TouchableWithoutFeedback underlayColor="transparent" onPress={()=>{this.setState({index:1})}} style={{width:maxWidth/3,height:90}}>
                        <View style={{width:maxWidth/3,height:90,alignItems: "center"}}>
                            <Image style={{height:30,width:30,marginTop: 0}}
                                   source={this.state.index === 1?require("../../img/index1.png"):require("../../img/index2.png")}/>
                            <Text style={{height:20,lineHeight: 20,textAlign: "center",color: this.state.index === 1?
                                    "#2e8bff":"#ddd",fontSize:12}}>首页</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback underlayColor="transparent" onPress={()=>{this.setState({index:2})}} style={{width:maxWidth/3,height:90}}>
                        <View style={{width:maxWidth/3,height:90,alignItems: "center"}}>
                            <Image style={{height:30,width:30,marginTop: 0}}
                                   source={this.state.index === 2?require("../../img/order1.png"):require("../../img/order2.png")}/>
                            <Text style={{height:20,lineHeight: 20,textAlign: "center",color: this.state.index === 2?
                                    "#2e8bff":"#ddd",fontSize:12}}>订单</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback underlayColor="transparent" onPress={()=>{this.setState({index:3})}} style={{width:maxWidth/3,height:90}}>
                        <View style={{width:maxWidth/3,height:90,alignItems: "center"}}>
                            <Image style={{height:30,width:30,marginTop: 0}}
                                   source={this.state.index === 3?require("../../img/me1.png"):require("../../img/me2.png")}/>
                            <Text style={{height:20,lineHeight: 20,textAlign: "center",color: this.state.index === 3?
                                    "#2e8bff":"#ddd",fontSize:12}}>我的</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({

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
)(Home)