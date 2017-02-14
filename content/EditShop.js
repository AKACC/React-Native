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
} from 'react-native';

import dataSource from './DataSource';

const {height, width} = Dimensions.get('window');
const deviceWidth = width;
const deviceHeight = height;

export default class EditShip extends Component {
    constructor(props){
      super(props)
      this.state ={
          rid:"",
          start_time:"",
          end_time:"",
          id:"",
          pressTime:false,
          success:false,
      }
    }
    onPressSuccess(){
        if(this.state.pressTime==false){
            this.setState({
                pressTime:true,

             });
            dataSource.fetchAdd(({
                rid:this.state.rid,
                start_time:this.state.start_time,
                end_time:this.state.end_time,
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
      if(this.state.pressTime==false){
          this.setState({
              pressTime:true,

           });
          // Alert.alert("取消操作");
          this.setState({
              pressTime:false,

           });
      }
    }
    render(){
        var convertStrRID = this.props.pushEvent.rid.toString();
        // var convertStrID = this.props.pushEvent.id.toString();
        var convertStrSTART = this.props.pushEvent.start_time.toString();
        var convertStrEND = this.props.pushEvent.end_time.toString();
        return(
            <View style={{
                flex:1,
                paddingTop:80,
                justifyContent: 'flex-start',
                alignItems:'center',
            }}>

                <View style={styles.container}>
                    <View style={{alignItems:'center'}}>
                        <Text>id: {this.props.pushEvent.id}</Text>
                        <Text>rid: {this.props.pushEvent.rid}</Text>
                        <Text>商家名称: {this.props.pushEvent.name}</Text>
                    </View>
                    <View style={{padding:10,width:deviceWidth-20}}>
                    <TextInput style={styles.input}
                               onChangeText={(Text)=> this.setState({"start_time": Text})}
                               placeholder={this.props.pushEvent.start_time}
                               value={this.state.start_time}/>
                    <TextInput style={styles.input}
                               onChangeText={(Text)=> this.setState({"end_time": Text})}
                               placeholder={this.props.pushEvent.end_time}
                               value={this.state.end_time}/>
                    </View>
                    <View style={styles.buttonView}>
                        <View >
                          <TouchableOpacity onPress={this.onPressSuccess.bind(this)} style={[styles.button,{backgroundColor:'#48bbec'}]}>
                              <Text style={{fontSize:20,fontWeight:'bold', color:'white',textAlign:'center'}}>
                                  修改
                              </Text>
                          </TouchableOpacity>
                        </View>
                        <View >
                          <TouchableOpacity onPress={this.onPressDel.bind(this)} style={[styles.button,{backgroundColor:'tomato'}]}>
                              <Text style={{fontSize:20,fontWeight:'bold', color:'white',textAlign:'center'}}>
                                  删除
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
        )
    }


}

  const styles = StyleSheet.create({
   container: {
     height:deviceHeight,
     flex: 1,
     paddingTop:20,
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
   loader:{
     marginTop:20,
   },
   errorMsg:{
     color:'red',
     fontSize:20,
   },

 })






AppRegistry.registerComponent('helloworld', () => helloworld);
