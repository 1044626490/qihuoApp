import React from "react"
import {
    Dimensions, Animated, View, Text, Image, StyleSheet, Button, AsyncStorage, Picker,
    TextInput, TouchableWithoutFeedback, ScrollView
} from 'react-native';
import { Icon, SearchBar } from '@ant-design/react-native';
import { IconFill, IconOutline } from "@ant-design/icons-react-native";
import TrendChat from "./component/TrendChat"

const maxHeight = Dimensions.get('window').height;
const maxWidth  = Dimensions.get('window').width;

class StockChart extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            key:"1",
            code:1
        }
    }

     componentDidMount(){

     }

    render(){
        return(
            <View>
                {/*<Text>123123</Text>*/}
                <View>
                    <IconOutline onPress={()=>{
                        const { navigate } = this.props.navigation;
                        navigate('Home', { isFirst: true });
                    }} name="left" />
                    <Text>
                        离岸人民币
                    </Text>
                </View>
                <View style={{width: "70%", alignItems: "center", display: "flex", flexDirection: "row"}}>
                    <TouchableWithoutFeedback onPress={() => {
                        this.setState({key: "1"})
                    }}>
                        <View style={this.state.key === "1" ? styles.checked : styles.unChecked}>
                            <Text style={{fontSize: 18, lineHeight: 40}}>走势</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        this.setState({key: "2"})
                    }}>
                        <View style={this.state.key === "2" ? styles.checked : styles.unChecked}>
                            <Text style={{fontSize: 18, lineHeight: 40}}>持仓</Text>
                        </View>
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback onPress={() => {
                        this.setState({key: "3"})
                    }}>
                        <View style={this.state.key === "3" ? styles.checked : styles.unChecked}>
                            <Text style={{fontSize: 18, lineHeight: 40}}>结算</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
                <ScrollView style={{width: maxWidth, height: maxHeight - 100}}>
                    {
                        this.state.key === "1"?<TrendChat />:this.state.key === "2"?null:null
                    }
                </ScrollView>
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

export default StockChart