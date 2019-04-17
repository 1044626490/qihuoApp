import React from 'react';
import { Dimensions, ImageBackground, Text, View, TouchableWithoutFeedback } from 'react-native';
import { Icon } from '@ant-design/react-native';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";

const maxHeight = Dimensions.get('window').height;
const maxWidth  = Dimensions.get('window').width;

class Download extends React.Component {
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

    render(){
        return(
            <ImageBackground style={{position: "relative",width: maxWidth,height: maxHeight}} source={require("../../img/download.jpg")}>
                <TouchableWithoutFeedback onPress={()=>{
                    this.props.navigation.navigate('Home')
                }}>
                    <View style={{position: "absolute",width:100,height:20,top: 15,left: 10,display: "flex",flexDirection: "row"}}>
                        <IconOutline name="left" style={{color: "#aaa",fontSize: 22,position: "absolute",top:-2,left:0}} />
                        <Text style={{color: "#aaa",fontSize: 16,height:20,lineHeight: 20,position: "absolute",top:0,left:19}}>返回</Text>
                    </View>
                </TouchableWithoutFeedback>
            </ImageBackground>
        )
    }
}

export default Download