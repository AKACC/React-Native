const React = require('react');
import{
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  PickerIOS,
  TouchableOpacity,
  NavigatorIOS,
} from 'react-native';

import IndexPage from './Index'
const { Component } = React;

const {height, width} = Dimensions.get('window');
const deviceWidth = width;
const deviceHeight = height;

var PickerItemIOS = PickerIOS.Item;
var Zone = {
  Scarborough: {
    name: 'Scarborough',
    value: 1,
  },
  Downtown: {
    name: 'Downtown',
    value:2,
  },
  Markham: {
    name: 'Markham',
    value:3,
  },
}
class Menu extends Component {
  constructor(props){
    super(props);
    this.state={
      zoneSelected:1,
    }
  }
  onFilterPress(){
    console.log(this.state.zoneSelected)
    this.setState({
      zoneSelected:this.state.zoneSelected,
    })

  }
  render() {

    return (
      <View style={styles.container}>
      <ScrollView scrollsToTop={false} >
            <View >

              <Text >筛选项：</Text>
            </View>

            <Text

              >
              地区
            </Text>

            <PickerIOS
          selectedValue={this.state.zoneSelected}
          onValueChange={(zone) => this.setState({zoneSelected:zone})}>
          {Object.keys(Zone).map((value) => (
            <PickerItemIOS
              key={value}
              value={Zone[value].value}
              label={Zone[value].name}
            />
          ))}
        </PickerIOS>

        <View >
          <TouchableOpacity onPress={this.onFilterPress.bind(this)} style={[styles.button,{backgroundColor:'#48bbec'}]}>
              <Text style={{fontSize:20,fontWeight:'bold', color:'white',textAlign:'center'}}>
                  确定
              </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      </View>
    )
  }
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop:50,

      //justifyContent: 'center',
      //alignItems: 'center',
      //backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    fontStyle: {
      fontSize:15,
      textAlign:'center',
      marginTop:10,
      color:'grey',
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

    textStyle:{
      justifyContent:'center',
      alignItems: 'center',
      marginTop:height/2.5,
    },


  });

module.exports = Menu;
