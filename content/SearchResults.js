'use strict'
import React, { Component } from 'react';
import {
  AppRegistry,
  Dimensions,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableHighlight,
  ListView,
  Alert,
  ActivityIndicator,
  TextInput,
} from 'react-native';

import _ from 'lodash'
import iteratee from 'lodash.iteratee'
import DataSource from './DataSource'
import PushPayload from './PushPayload'


const {height, width} = Dimensions.get('window');



export default class SearchResults extends Component {
  constructor(props){
    super(props);//props is not defined

    var ds = new ListView.DataSource({
      rowHasChanged:(r1,r2) => r1 != r2 });   // 数值改变，单独渲染



      this.state = {
        dataSource:ds.cloneWithRows({}),//[],//ds.cloneWithRows(['row1','row2','row3']),
        showProgress: true,

        searchQuery:props.searchQuery,
        searchChoise:props.searchChoise,
      };

  }

  componentDidMount(){
    this.doSearch();

  }
  // levenshtein(a, b){
  //   var al = a.length + 1;
  //   var bl = b.length + 1;
  //   var result = [];
  //   var temp = 0;
  //   // 创建一个二维数组
  //   for (var i = 0; i < al; result[i] = [i++]) {}
  //   for (var i = 0; i < bl; result[0][i] = i++) {}
  //   for (i = 1; i < al; i++) {
  //     for (var j = 1; j < bl; j++) {
  //       // 判断最上方和最左方数字是否相等
  //       temp = a[i - 1] == b[j - 1] ? 0 : 1;
  //       // result[i - 1][j] + 1 左方数字
  //       // result[i][j - 1] + 1 上方数字
  //       // result[i - 1][j - 1] + temp 左上方数字
  //       result[i][j] = Math.min(result[i - 1][j] + 1, result[i][j - 1] + 1, result[i - 1][j - 1] + temp);
  //     }
  //   }
  //
  //   return result[i-1][j-1];
  //
  // }
  doSearch(){


        if(this.props.searchChoise == 'uid'){

            this.searchQuery = Number(this.props.searchQuery);
            DataSource.fetchSearch((results)=>{
                var matchDat=[];

                // this.setState(({
                //   dataSource: this.state.dataSource.cloneWithRows(results.ea_data),//results.ea_data[_.findIndex(results.ea_data,[this.props.searchChoise,this.searchQuery])],//this.state.dataSource.cloneWithRows(results)
                //   pressTime:false,
                //   showProgress:false,
                // }));
                results.ea_data.map((data)=>{

                      if(data.uid == this.searchQuery){
                          matchDat.push(data);
                      }
                })

                {this.matchData(matchDat)}
            })
        }
        if(this.props.searchChoise == 'username'){
    
            this.searchQuery = this.props.searchQuery.toLowerCase();

            DataSource.fetchSearch((results)=>{
                var matchDat=[];

                results.ea_data.map((data)=>{
                      if(data.username){
                          var driverName = data.username.toLowerCase();
                              if(driverName.search(this.searchQuery)!== -1){
                                  matchDat.push(data);
                              }
                      }
                })

                {this.matchData(matchDat)}
            })
        }


  }


  matchData(found){

        this.setState(({
          dataSource: this.state.dataSource.cloneWithRows(found),//results.ea_data[_.findIndex(results.ea_data,[this.props.searchChoise,this.searchQuery])],//this.state.dataSource.cloneWithRows(results)
          pressTime:false,
          showProgress:false,
        }));

  }
  pressRow(rowData){

     this.props.navigator.push({
          title:'修改关店时间',
          component:PushPayload,
          passProps:{
            pushEvent: rowData,
          }
     });
  }



  renderRow(rowData){
    // if(rowData){

      return(

        <TouchableHighlight
            onPress={()=>this.pressRow(rowData)}
            underlayColor='#ddd'
            style={{flex:1}}>
            <View style={{flex:1,flexDirection:'row',borderColor:'#D7D7D7',borderBottomWidth:1}}>

                <View style={{paddingLeft:20,flexDirection:'row',padding:10}} >
                    <Text style={{color:'#333'}}>
                        {rowData.username}
                    </Text>

                </View>

            </View>
        </TouchableHighlight>
    // }
  )}


  render(){
    if(this.state.showProgress){
      return(

        <View style={{
                flex:1,
                justifyContent:'center'}}>

            <ActivityIndicator
                  size='large'
                  animating={true} />
        </View>
      )
    }

      if(this.state.dataSource._cachedRowCount!=0){
              return(
                <View style={styles.container}>
                    <ListView
                          dataSource={this.state.dataSource}//this.state.dataSource
                          renderRow={this.renderRow.bind(this)}
                          enableEmptySections={true} />
                </View>
              )
        }else{
          return(
            <View style={styles.container}>
              <View style={{backgroundColor:"#D3D3D3",flexDirection:'row'}}>
                  <View><Text>未找到对应信息</Text></View>
              </View>
            </View>
          )
        }
  }
  onPressCancel(){
        this.props.navigator.pop();

        // this.props.navigator.popToTop({
        //   component:IndexPage
        // });

  }
  pressEdit(){
    console.log(this.state)
     this.props.navigator.push({
          title:'修改关店时间',
          component:PushPayload,
          passProps:{
            pushEvent: this.state.dataSource,
          }
     });
  }

  // render(){
  //   if(this.state.showProgress){
  //     return(
  //
  //       <View style={{
  //               flex:1,
  //               justifyContent:'center'}}>
  //
  //           <ActivityIndicator
  //                 size='large'
  //                 animating={true} />
  //       </View>
  //     )
  //   }

  // }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:45,
    width:width,
    //justifyContent: 'center',
    //alignItems: 'center',
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
});


AppRegistry.registerComponent('shop', () => shop);
