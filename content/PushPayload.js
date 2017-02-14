'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  TextInput,
  Alert,
  ScrollView,
} from 'react-native';

import dataSource from './DataSource'
import EditShop from './EditShop'
import IndexPage from './Index'
import DatePicker from 'react-native-datepicker'


const {height, width} = Dimensions.get('window');
const deviceWidth = width;
const deviceHeight = height;
//

var dateFormat = require('dateformat');

export default class PushPayload extends Component {
    constructor(props){
      super(props);//props is not defined

      var ds = new ListView.DataSource({
        rowHasChanged:(r1,r2) => r1 != r2 });   // 数值改变，单独渲染

        this.state = {
          uid:"",

          id:"",
          pressTime:false,
          success:false,
          dataSource:ds.cloneWithRows({}),//ds.cloneWithRows(['row1','row2','row3']),
          start_datetime:this.props.pushEvent.valid_from,////////
          end_datetime:this.props.pushEvent.valid_to,
          timeZoneOffsetInHours: (-1) * (new Date()).getTimezoneOffset() / 60,

        };

  }


  onStartChange = (startDate) => {
    this.setState({start_datetime: startDate});
    this.props.pushEvent.valid_from = startDate;
  };
  onEndChange = (endDate) => {
    this.setState({end_datetime: endDate});
    this.props.pushEvent.valid_to = endDate;
  };
  changeConfirm(){
    Alert.alert("修改班表","如果确认修改，请点击确认",
    [
      {text: 'Cancel', onPress: () => {this.onPressCancel()}},
      {text: 'OK', onPress: () =>{this.onPressSuccess()}
        },
    ]);
  }


  onPressSuccess(){


          if(this.state.pressTime==false){
              this.setState({
                  pressTime:true,

               });
              if(this.state.start_datetime==this.props.pushEvent.valid_from){
                var startTime = this.props.pushEvent.valid_from;
              }else{
                var startTime = this.state.start_datetime;
                startTime = startTime.toString();
              }
              if(this.state.end_datetime==this.props.pushEvent.valid_to){
                var endTime = this.props.pushEvent.valid_to;
              }else{
                var endTime = this.state.end_datetime;
                endTime = endTime.toString();
              }

              dataSource.fetchUpate(({
                  uid:this.props.pushEvent.uid,
                  valid_from:startTime,
                  valid_to:endTime,
                  id:this.props.pushEvent.id,
                  zone:this.props.pushEvent.zone,
                  username:this.props.pushEvent.username,
              }),(results)=>{

                this.setState(({
                      pressTime:false,  //Reset buttonPress after getting results

                },results));

                if(results.success===true){

                    Alert.alert("修改成功");
                }
              })

          }

  }
  onPressCancel(){


        // Alert.alert("取消操作");


        this.props.navigator.popToTop({
          component:IndexPage
        });


  }
  // setFormattedTime(){
  //
  //     var getStartTime = new Date(this.state.start_datetime);
  //     var getEndTime = new Date(this.state.end_datetime);
  //     this.setState({
  //       start_datetime:getStartTime,
  //       end_datetime:getEndTime,
  //     })
  //
  //
  // }



  render(){

      // var convertStrRID = this.props.pushEvent.uid.toString();
      // var convertStrID = this.props.pushEvent.id.toString();
      // var convertStrSTART = this.props.pushEvent.valid_from.toString();
      // var convertStrEND = this.props.pushEvent.valid_to.toString();
      // {this.setFormattedTime()}


      // var getStartTime = new Date(dateFormat(new Date(this.state.start_datetime),"mmmm dd, yyyy HH:MM:ss"));
      // var getEndTime = new Date(dateFormat(new Date(this.state.end_datetime),"mmmm dd, yyyy HH:MM:ss"));
      // console.log(dateFormat(this.state.end_datetime,"mmmm dd,yyyy HH:MM:ss"))
      console.log(this.props.pushEvent)

      return(
          <ScrollView >
          <View style={{
              flex:1,
              justifyContent: 'flex-start',
              alignItems:'center',
          }}>

              <View style={styles.container}>
                  <View style={{alignItems:'center'}}>
                      <Text>id: {this.props.pushEvent.id}</Text>
                      <Text>uid: {this.props.pushEvent.uid}</Text>
                      <Text>司机名称: {this.props.pushEvent.username}</Text>
                      <Text>zone: {this.props.pushEvent.zone}</Text>
                  </View>
                  <View style={{padding:10,width:deviceWidth-20}}>
                   <Heading label="上班时间" />

                       <Text> {this.props.pushEvent.valid_from}</Text>

                          <DatePicker
                             style={{width: deviceWidth-40}}
                             confirmBtnText="Confirm"
                             cancelBtnText="Cancel"
                             date={this.state.start_datetime}
                             mode="datetime"
                             timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                             onDateChange={this.onStartChange}
                           />


                   <Heading label="下班时间" />
                   <Text> {this.props.pushEvent.valid_to}</Text>
                       <DatePicker
                         style={{width: deviceWidth-40}}
                         confirmBtnText="Confirm"
                         cancelBtnText="Cancel"
                          date={this.state.end_datetime}
                          mode="datetime"
                          timeZoneOffsetInMinutes={this.state.timeZoneOffsetInHours * 60}
                          onDateChange={this.onEndChange}
                        />

                  </View>
                  <View style={styles.buttonView}>
                      <View >
                        <TouchableOpacity onPress={this.changeConfirm.bind(this)} style={[styles.button,{backgroundColor:'#48bbec'}]}>
                            <Text style={{fontSize:20,fontWeight:'bold', color:'white',textAlign:'center'}}>
                                修改
                            </Text>
                        </TouchableOpacity>
                      </View>

                      <View >
                        <TouchableOpacity onPress={this.onPressCancel.bind(this)} style={[styles.button,{backgroundColor:'grey'}]}>
                            <Text style={{fontSize:20,fontWeight:'bold', color:'white',textAlign:'center'}}>
                                取消
                            </Text>
                        </TouchableOpacity>
                       </View>
                 </View>
             </View>

        </View>
        </ScrollView>
      )
  }

}
class Heading extends Component {
  render() {
    return (
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>
          {this.props.label}
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // paddingTop:5,
    // width:width,
    //justifyContent: 'center',
    alignItems: 'center',
    height:deviceHeight,
    flex: 1,
    paddingTop:10,

  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },

  image: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontStyle: {
    fontSize:15,
    textAlign:'center',
    marginTop:10,
    color:'grey',
  },
  fontChose: {
    color:'tomato',
  },

  fontLong:{
    flex:1,
  },
  loader:{
    justifyContent:'center',
    alignItems: 'center',
    marginTop:height/2.5,
  },
  button:{
    justifyContent:'center',
    backgroundColor:'green',
    height:50,
    //width:100,
    padding:10,
    marginTop:10,

  },
  buttonView:{
    width:width,
    height:100,
    marginTop:20,
  },
  input:{
    height:50,
    borderColor:'#333',
    borderWidth:1,
    padding:10,
    marginTop:10,
  },
  headingContainer: {
   padding: 4,
   backgroundColor: '#f6f7f8',
 },
 heading: {
   fontWeight: '500',
   fontSize: 14,
 },
});


AppRegistry.registerComponent('shop', () => shop);
