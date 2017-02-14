'use strict'
import React, { Component } from 'react';
import {Text,
        AppRegistry,
        View,
        StyleSheet,
        Dimensions,
        Modal,
        TouchableOpacity,
        TouchableWithoutFeedback,
        ListView,
    } from 'react-native';
import {RadioButtons} from 'react-native-radio-buttons'
import {filter} from 'lodash';
import dataSource from './DataSource';
const {height, width} = Dimensions.get('window');
const deviceWidth = width;
const deviceHeight = height;
const options = [
  {
    label:"Scarborough",
    zone:'1',
  },
  {
    label:"Markham",
    zone: '2',
  },
  {
    label:"Downtown",
    zone: '3',
  },
];
//   const options = [
//    "Scarborough",
//    "Markham",
//    "Downtown"
//  ];
const normalStyle = {
    color: 'white'
  };

const selectedStyle = {
  color: '#f80046',
  fontWeight: 'bold'
};
export default class drvFilter extends Component{
  constructor(props) {
    super(props);

    var ds = new ListView.DataSource({
      rowHasChanged:(r1,r2) => r1 != r2,}
      );   // 数值改变，单独渲染  sectionHeaderHasChanged: (s1, s2) => s1 !== s2 }

    this.state={
      dataSource:ds.cloneWithRows({}),//ds.cloneWithRows(['row1','row2','row3']),
      selectedOption:"",
    }
  }


  _filteredDrv(){

    var zone = Number(this.state.selectedZone);
    // console.log(filter(this.state.searchSource,{'zone':Number(this.state.selectedZone)}))
    this.setState({
        dataSource:this.state.dataSource.cloneWithRows(filter(this.state.searchSource,{'zone':Number(this.state.selectedZone)})),
        modalVisible: false,
        showProgress:false,

    })
    this.props.navigator.pop();
  }
  _renderOption(option, selected, onSelect, index){
        var option = option.label;

        const style = selected ? { fontWeight: 'bold'} : {};

        return (
          <TouchableWithoutFeedback onPress={onSelect} key={index}>
            <View><Text style={style}>{option}</Text></View>
          </TouchableWithoutFeedback>
        );
      }
    _setSelectedOption(selectedOption){
          console.log(selectedOption)
          var selectedArea = selectedOption.label;
          var selectedZone = selectedOption.zone;

           this.setState({
             selectedOption:selectedArea,
             selectedZone:selectedZone,
           });
  }
  _setModalVisible(visible) {
      this.setState({modalVisible: visible});

  }
  _renderContainer(optionNodes){
     return <View>{optionNodes}</View>;
  }
  _renderHeader(){

      var area = this.state.selectedOption;
    if(area){
      return(

        <View style={{height:45,alignItems:'center', justifyContent:'center'}}>
            <Heading label={area} />
        </View>
      )
    }else{
      return(
        <View></View>
      )
    }
  }

  render(){
      return(

            <View style={{marginTop: 22}}>
               <View>
                 <Text>Hello World!</Text>
                 <View style={{margin: 20}}>
                   <RadioButtons
                     options={options}
                     style={{ tint:'#007AFF',
                              backTint:'#ffffff',
                              textAlign:'center',
                            }}
                     onSelection={this._setSelectedOption.bind(this)}
                     selectedOption={this.state.selectedOption}
                     renderOption={this._renderOption.bind(this)}
                     renderContainer={this._renderContainer.bind(this)}

                   />
                   <Text>Selected option: {this.state.selectedOption || 'none'}</Text>
                 </View>

                 <View style={styles.buttonView}>
                     <View >
                       <TouchableOpacity onPress={()=>this._filteredDrv() } style={[styles.button,{backgroundColor:'#48bbec'}]}>
                           <Text style={{fontSize:20,fontWeight:'bold', color:'white',textAlign:'center'}}>
                               修改
                           </Text>
                       </TouchableOpacity>
                     </View>

                     <View >
                       <TouchableOpacity onPress={() => {
                         this._setModalVisible(!this.state.modalVisible)
                       }} style={[styles.button,{backgroundColor:'grey'}]}>
                           <Text style={{fontSize:20,fontWeight:'bold', color:'white',textAlign:'center'}}>
                               取消
                           </Text>
                       </TouchableOpacity>
                      </View>
                </View>

               </View>
            </View>
          );

  }
}
const styles = StyleSheet.create({
  container: {
    height:deviceHeight/2,
    paddingTop:20,

    //justifyContent: 'center',
    //alignItems: 'center',
    //backgroundColor: '#F5FCFF',
  },

  });
AppRegistry.registerComponent('drvFilter', () =>drvFilter);
