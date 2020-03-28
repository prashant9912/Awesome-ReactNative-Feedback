import React, { Component } from 'react'
import { Text, StyleSheet, View,Dimensions,Button,TouchableOpacity,Animated} from 'react-native'
import {BoxShadow} from 'react-native-shadow'
import LottieView from 'lottie-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import * as Animatable from 'react-native-animatable';


const {height,width} = Dimensions.get("window")


const mainColor='#FD4375';
const shadowOpt = {
    width:350,
    height:270,
    color:"#000",
    border:30,
    radius:20,
    opacity:0.03,
    x:0,
    y:3,
    style:{marginVertical:5}
}
const emoji = {
    width:45,
    height:45,
    color:"#000",
    border:6,
    radius:20,
    opacity:0.04,
    x:0,
    y:3,
    style:{marginVertical:5}
    
}

export default class Box extends Component {

    state={
        selected:-1,
        speed:0,
        submit:new Animated.Value(0),
        fade:new Animated.Value(0),
        toggle:1
    }
    

  didsubmit = () => {
    Animated.timing(this.state.submit, {
      toValue: -65,
      duration: 500,
      useNativeDriver:false
    }).start();

    Animated.timing(this.state.fade, {
        toValue: 1,
        duration: 500,
        useNativeDriver:false
      }).start();

      this.setState({toggle:0})
  };


    icons=[
        {icon:require('./Assets/angry.json'),text:"Very Bad"},
        {icon:require('./Assets/sad.json'),text:"Bad"},
        {icon:require('./Assets/meh.json'),text:"Ok"},
        {icon:require('./Assets/haha.json'),text:"Good"},
        {icon:require('./Assets/love.json'),text:"Excellent"},
]


    render() {

        const interpolatecolor = this.state.fade.interpolate({
            inputRange:[0,1],
            outputRange:['#ffff','#FD4375']
        })

        const ani ={
            backgroundColor:interpolatecolor
        }

        return (
            <View style={[styles.absolute]}>
            <BoxShadow setting={shadowOpt}>
                <Animated.View style={[styles.box,ani]}>
                    
           
  <View style={{opacity:this.state.toggle==1?1:0,}}>


            <Animatable.View animation={'fadeInUp'} ><Text style={{color:'#062E26',fontWeight:'bold',fontSize:20,textAlign:'center'}}>How was your Experience?</Text>
            
            <Text style={{textAlign:'center',color:'#8D9597',fontWeight:"bold",marginTop:10}}>It will help us to serve you better!</Text>
            </Animatable.View>

            <Animatable.View animation={'fadeInUp'} delay={100} style={{flexDirection:'row',justifyContent:'space-around',paddingHorizontal:20,marginTop:10}}>

                {this.icons.map((v,k)=>
                <View key={k} style={{ opacity:this.state.selected==k?2:0.8,}}>
                    <BoxShadow setting={emoji}>
                    <TouchableOpacity 
                    style={{
                    backgroundColor:'white',
                    borderColor:mainColor,
                    borderWidth:this.state.selected==k?2:0,
                    width:45,
                    height:45,
                    alignItems:"center",
                    justifyContent:'center',
                    borderRadius:25,
                   
                    }}
                    
                    onPress={_=>{this.setState({selected:k})}}
                    >
                <LottieView style={{width:30,height:30,position:'absolute',opacity:this.state.selected==k?0:1}} source={v.icon} autoPlay={false} loop/>
                <LottieView style={{width:30,height:30,opacity:this.state.selected==k?1:0}} source={v.icon} autoPlay={true} loop/>
                <Icon style={{position:'absolute',top:-12,right:-10,opacity:this.state.selected==k?1:0}} name="check-circle" size={25} color={mainColor} />

                </TouchableOpacity></BoxShadow>
                </View>
                )}

                
            </Animatable.View>

            </View>
            {this.state.selected!=-1?<View><Text style={{color:mainColor,fontWeight:'bold',textAlign:'center',fontSize:16,marginTop:-10}}>{this.icons[this.state.selected].text}</Text></View>:null}


<Animatable.View animation={'fadeInUp'} delay={200}>
            <Animated.View style={{top:this.state.submit}}>
                <TouchableOpacity style={{...styles.Button}} onPress={x=>{this.didsubmit()}}>
                {this.state.toggle==0?
                   <View style={{flexDirection:"row"}}>
                   <LottieView style={{width:30,height:30,top:-1,left:-3}} source={require('./Assets/tick.json')} autoPlay={true} loop={false}/>
                       <Text style={{color:'white',fontWeight:"bold",fontSize:18}}>Saved</Text></View>:
                    <Text style={{color:'white',}}>Send Feedback</Text>}
                    </TouchableOpacity>
                </Animated.View>
</Animatable.View>
                
                <TouchableOpacity style={{position:'absolute',top:-12,right:-10,backgroundColor:'white',padding:10,paddingHorizontal:12,borderRadius:30}}>
                    <Icon  name="times" size={20} color={mainColor} />
                    </TouchableOpacity>

                </Animated.View>
                

                </BoxShadow>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    box:{
      
        height:270,
        width:350,
        borderRadius:25,
        flexDirection:'column',
        justifyContent:'space-around',
        paddingVertical:20
    
    },
    absolute:{
        position:'absolute',bottom:0,top:0,left:0,right:0,flex:1,justifyContent:'center',alignItems:'center'}
    ,Button:{
        backgroundColor:mainColor,
        width:'70%',
        alignSelf:"center",
        alignItems:'center',
        paddingVertical:10,
        borderRadius:30

    }
})
