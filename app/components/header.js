import React from "react";
import { BackAndroid,Navigator , Flex, View, Text, Image, ImageBackground, StyleSheet, document,
    FlatList, TouchableHighlight ,TextInput ,ScrollView, BackHandler} from "react-native";
import { NavigationActions } from "react-navigation";

class Header extends React.Component {
    constructor(props){
        super(props);
        this.handleBack = this.handleBack.bind(this);
        this.state = {
            userInfo: null,
        }
    }

    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack)
    }

    componentWillUnmount() {
        BackHandler.addEventListener('hardwareBackPress', this.handleBack)
    }

    handleBack(){
        // alert(JSON.stringify(this.props))
        // let navigator = this.props;
        // alert(JSON.stringify(navigator));
        // navigator(backforward())
        // if (navigator && navigator.getCurrentRoutes().length > 0) {
        //     alert(navigator);
        //     navigator.pop();
        //     return true;
        // }else{
        //     alert(navigator);
        //     return false;
        // }
    }

    render(){
        const { goBack } = this.props.navigation;
        return(
            <View style={{width: "100%",height:30,backgroundColor:"transparent"}}>
                <TouchableHighlight underlayColor="transparent" style={{width:61.2,height:30,backgroundColor:"transparent"}} onPress={()=>goBack()} >
                    <Image style={{width:61.2,height:30}} source={require('../layouts/image//vip/back.png')} />
                </TouchableHighlight>
                <ImageBackground style={{marginTop:-25,marginLeft:50,width:79.62,height:30}} source={require('../layouts/image/vip/now.png')}>
                    <Text style={{textShadowRadius:2,color:"#fff",textShadowColor:"#975f00",textShadowOffset:{width:1,height:0},lineHeight:30,width:79.62,height:30,textAlign: "center"}}>{this.props.name}</Text>
                </ImageBackground>
            </View>
        )
    }
}

export default Header
