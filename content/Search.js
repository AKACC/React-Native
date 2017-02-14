'use strict'
import React, { Component } from 'react';
import {
    AppRegistry,
    Dimensions,
    StyleSheet,
    Text,
    TextInput,
    View,
    TouchableOpacity,
    ScrollView,
  }from 'react-native';

import SearchResults from './SearchResults'
import SearchBar from 'react-native-search-bar'
import {SegmentedControls} from 'react-native-radio-buttons'
const {height, width} = Dimensions.get('window');
const deviceWidth = width;
const deviceHeight = height;
const options = [
 "司机",
 "关店",

];
export default class Search extends Component {
  constructor(){
    super();

    this.state = {
        searchQuery:"",
        searchChoise:'uid',
    }

  }
  searchStart(){
    this.refs.searchBar.focus();
  }
  searchCancel(){
      this.refs.searchBar.blur();
  }
  onSearchPressed(){

      this.props.navigator.push({
        component: SearchResults,
        title:'搜索结果',
        passProps:{
            searchQuery: this.state.searchQuery,
            searchChoise: this.state.searchChoise,
        }
      });
  }
  onChoisePressed(){
    if(this.state.searchChoise=='uid'){
      this.setState({
        searchChoise: 'username',
      })
    }else{
      this.setState({
        searchChoise: 'uid',
      })
    }


  }
  render(){
    return(
        <View style={styles.container}>
        <ScrollView keyboardDismissMode='on-drag'>
        <View style={styles.buttonView}>
            <TouchableOpacity
                onPress={this.onChoisePressed.bind(this)}
                style={[styles.button,{backgroundColor:'black'}]}>
                <Text style={{fontSize:20,fontWeight:'bold', color:'white',textAlign:'center'}}>搜索项：{this.state.searchChoise}</Text>
            </TouchableOpacity>
        </View>
        <View>
        <SearchBar
            ref='searchBar'
            placeholder='Search'
            style={{width:deviceWidth,height:50}}
            onChangeText={(Text)=> this.setState({
                searchQuery: Text
            })}
            onSearchButtonPress={this.searchCancel.bind(this)}


        />
        </View>
          <View><SegmentedControls
                  tint={'#007AFF'}
                  selectedTint= {'white'}
                  backTint= {'#ffffff'}
                  options={ options }
                  allowFontScaling={ false } // default: true

                  selectedOption={ this.state.selectedOption }
                  optionStyles={{fontFamily: 'AvenirNext-Medium'}}
                  optionContainerStyle={{flex: 1}}
                />
            </View>
          <View style={styles.buttonView}>
              <TouchableOpacity
                  onPress={this.onSearchPressed.bind(this)}
                  style={[styles.button,{backgroundColor:'#48bbec'}]}>
                  <Text style={{fontSize:20,fontWeight:'bold', color:'white',textAlign:'center'}}>搜索</Text>
              </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
    )
  }





}
const styles = StyleSheet.create({
   container: {
     alignItems: 'center',
     height:deviceHeight,
     flex: 1,
     paddingTop:100,
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
     width:width,
     height:100,
     marginTop:20,
   },
})
AppRegistry.registerComponent('shop', () => shop);
