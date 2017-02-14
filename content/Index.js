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
  TouchableWithoutFeedback,
  ListView,
  Alert,
  ActivityIndicator,
  TextInput,
  NavigatorIOS,
  RefreshControl,
  Modal,

} from 'react-native';
import {RadioButtons} from 'react-native-radio-buttons'
import dataSource from './DataSource';
import PushPayload from './PushPayload';
import SearchBar from 'react-native-search-bar';
import SearchResults from './SearchResults';
import SideMenu from 'react-native-side-menu';
import {filter} from 'lodash';
import drvFilter from './drvFilter'
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

export default class indexContent extends Component {
  constructor(props){
    super(props);//props is not defined

    var ds = new ListView.DataSource({
      rowHasChanged:(r1,r2) => r1 != r2,}
      );   // 数值改变，单独渲染  sectionHeaderHasChanged: (s1, s2) => s1 !== s2 }

      this.state = {
        dataSource:ds.cloneWithRows({}),//ds.cloneWithRows(['row1','row2','row3']),
        showProgress: true,
        searchQuery:"",
        searchChoise:'username',
        refreshing: false,

        modalVisible: false,


      };
      var optionLabel = [];
      this._setSearchText = this._setSearchText.bind(this);
      //this.onSearchPressed = this.onSearchPressed.bind(this);


  }

  componentDidMount(){
    this.getData();

  }

  getData(){
      dataSource.fetchFeed((result)=>{

                if(result){
                  // var data = result.ea_data.map((driver)=>{
                  //     return (driver.username)
                  // })
                  //     console.log(data)
                  this.setState({
                    searchSource:result.ea_data,
                    dataSource:this.state.dataSource.cloneWithRows(result.ea_data),
                    showProgress: false,
                  })
                }
            }
      )
  }



  pressRow(rowData){

     this.props.navigator.push({
          title:'修改司机信息',
          component:PushPayload,
          passProps:{
            pushEvent: rowData,
          }
     });
  }



  renderRow(rowData){


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

  )}

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
  searchCancel(){
    this.refs.searchBar.blur();
  }

  _setSearchText(searchText){

    let filteredData = this._filterNotes(searchText, this.state.searchSource);
    //if(filteredData){
        this.setState({
            dataSource:this.state.dataSource.cloneWithRows(filteredData),
            searchQuery: searchText,
        })
    //}
  }
  _filterNotes(searchText, notes) {
      let text = searchText.toLowerCase();

      return filter(notes, (driver) => {
        var driverName = JSON.stringify(driver.username);
        let note = driverName.toLowerCase();

        return note.search(text) !== -1;
      });
  }
  //_setModalVisible(visible){}
  //_filteredDrv(){}
//  _renderDrvFilter(){}
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
_onRefresh() {
  this.setState({refreshing: true});

  dataSource.fetchFeed((result)=>{
            if(result){

              this.setState({
                dataSource:this.state.dataSource.cloneWithRows(result.ea_data),
                refreshing: false,
                selectedOption:"",


              })
            }
        }
  )
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
  _setModalVisible(visible) {
      this.setState({modalVisible: visible});

  }




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
    if(this.state.modalVisible){
      return(
        <View style={styles.container}>
          <View>
            <Modal
              animationType={"slide"}
              transparent={false}
              visible={this.state.modalVisible}>

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

            </Modal>
          </View>
        </View>
      )
    }
      return(




          <View style={styles.container}>
              <View style={{backgroundColor:'ghostwhite',paddingBottom:50}}>



                      <View style={styles.button}>

                          <TouchableOpacity onPress={()=>this._setModalVisible(true)} style={[styles.button,{backgroundColor:'#48bbec'}]}>
                              <Text style={{fontSize:15,fontWeight:'bold', color:'white',textAlign:'center'}}>
                                  筛选
                              </Text>

                          </TouchableOpacity>
                      </View>
                      <View style={{backgroundColor:"#D3D3D3",alignItems:'center'}}>
                            <SearchBar
                                ref='searchBar'
                                placeholder='Search'
                                style={{width:deviceWidth,height:50}}
                                onChangeText={(Text)=> {
                                    {this._setSearchText(Text)}
                                          }
                                    }
                                onSearchButtonPress={()=>{this.onSearchPressed()}}
                                showsCancelButton={true}
                            />

                       </View>

                      <ListView
                            dataSource={this.state.dataSource}//this.state.dataSource
                            renderRow={this.renderRow.bind(this)}
                            enableEmptySections={true}
                            keyboardDismissMode='on-drag'
                            refreshControl={
                                <RefreshControl
                                  refreshing={this.state.refreshing}
                                  onRefresh={this._onRefresh.bind(this)}
                                />}
                            renderHeader ={()=>this._renderHeader()}

                      />


              </View>

        </View>

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

    height:40,
    //width:100,



  },
  headingContainer: {
   padding: 4,
   backgroundColor: '#f6f7f8',
 },
 heading: {
   fontWeight:'bold',
   fontSize: 16,
 },
});


AppRegistry.registerComponent('shop', () => shop);
