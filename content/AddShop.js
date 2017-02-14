'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  DatePickerIOS,
  NavigatorIOS,
} from 'react-native';

import dataSource from './DataSource';
import AppContainer from './AppContainer';

var dateFormat = require('dateformat');

const {height, width} = Dimensions.get('window');
const deviceWidth = width;
const deviceHeight = height;

export default class AddShop extends Component {
    constructor(props){
      super(props)
      this.state ={
          uid:"",
          zone:"",
          start_time:new Date(),
          end_time:new Date(),
          pressTime:false,
          success:false,

          timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,
      }
    }

    onPressSuccess(){
        if(this.state.uid == ""|| this.state.zone == ""){
              Alert.alert("内容不能为空");
        }else{
              if(this.state.pressTime==false){
                  this.setState({
                      pressTime:true,

                   });
                  var addStartTime = dateFormat(this.state.start_time, "yyyy-mm-dd HH:MM:ss");
                  addStartTime = addStartTime.toString();
                  var addEndTime = dateFormat(this.state.end_time, "yyyy-mm-dd HH:MM:ss");
                  addEndTime = addEndTime.toString();
                  dataSource.fetchAdd(({
                      uid:this.state.uid,
                      zone:this.state.zone,
                      start_time:addStartTime,
                      end_time:addEndTime,
                  }),(results)=>{
                    this.setState(({
                          pressTime:false,  //Reset buttonPress after getting results
                    },results));

                    if(results.success===true){
                        Alert.alert("添加成功");
                    }
                  })

              }
          }
    }

    addStart = (start)=>{
      this.setState({start_time: start});
    }
    addEnd = (end)=>{
      this.setState({end_time: end});
    }

    render() {
      //  if(!this.state.success && this.state.badCredentials){
      //    errorCtrl = <Text style={styles.errorMsg}>
      //         The username or password is not right.
      //    </Text>
      //  }
      //  if(!this.state.success && this.state.unknownError){
      //    errorCtrl = <Text style={styles.errorMsg}>
      //         The error is unexpected.
      //    </Text>
      //  }
          console.log(this.state.start_time)

            return (
             <View style={styles.container}>

                <ScrollView>
                    <View style={{padding:10,width:deviceWidth-20}}>

                        <TextInput style={styles.input}
                                  onChangeText={(Number)=> this.setState({"uid": Number})}
                                  placeholder="请输入uid"
                                  value={this.state.uid}/>

                         <TextInput style={styles.input}
                                    onChangeText={(Number)=> this.setState({"zone": Number})}
                                    placeholder="请输入zone"
                                    value={this.state.zone}/>
                        <View style={styles.headingContainer}>
                          <Text style={styles.heading}>
                            开始时间
                          </Text>
                        </View>
                        <DatePickerIOS
                           date={this.state.start_time}
                           mode="datetime"
                           timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                           onDateChange={this.addStart}
                         />
                         <View style={styles.headingContainer}>
                           <Text style={styles.heading}>
                             结束时间
                           </Text>
                         </View>
                          <DatePickerIOS
                             date={this.state.end_time}
                             mode="datetime"
                             timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                             onDateChange={this.addEnd}
                           />
                    </View>
                    <View style={styles.buttonView}>
                       <View >
                         <TouchableOpacity onPress={this.onPressSuccess.bind(this)} style={[styles.button,{backgroundColor:'#48bbec'}]}>
                             <Text style={{fontSize:20,fontWeight:'bold', color:'white',textAlign:'center'}}>
                                 添加
                             </Text>
                         </TouchableOpacity>
                       </View>

                    </View>
                </ScrollView>
            </View>

          )

      }

}

  const styles = StyleSheet.create({
   container: {
     height:deviceHeight,
     flex: 1,

     padding:10,
     //justifyContent: 'center',
     alignItems: 'center',
     //backgroundColor: '#F5FCFF',
   },
   headerContainer:{

     paddingTop:20,
     padding:10,
     //justifyContent: 'center',
     alignItems: 'center',
   },

   input:{
     height:50,
     borderColor:'#333',
     borderWidth:1,
     padding:10,
     marginTop:10,
   },
   button:{
     justifyContent:'center',
     height:50,
     padding:10,
     marginTop:10,

   },

   buttonView:{
     //flexDirection:'column',
     width:deviceWidth,
     marginTop:20,
     flex:1,
     //alignItems:'center',
   },
   logo:{
     width:100,
     height:100,
   },
   bannerView:{
     height:50,
     width:deviceWidth,
     backgroundColor:"#F5F5F5",
     alignItems:'center',
     justifyContent:'center'
   },
   bannerFont:{
     fontSize:17,
     fontWeight: 'bold',
   },
   loader:{
     marginTop:20,
   },
   errorMsg:{
     color:'red',
     fontSize:20,
   },
   headingContainer: {
    padding: 4,
    backgroundColor: '#f6f7f8',
  },
   heading: {
     fontWeight: '500',
     fontSize: 14,
   },

 })






AppRegistry.registerComponent('shop', () => shop);
