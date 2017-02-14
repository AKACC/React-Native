'use strict'

import React, { Component } from 'react';
import {
  AppRegistry,
  Button,
  Dimensions,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  TabBarIOS,
  Alert,
  NavigatorIOS,
  TextInput,
  TouchableHighlight,
} from 'react-native';

import SearchBar from 'react-native-searchbar';
import IndexPage from './Index'
import AddShop from './AddShop'
import Search from './Search'
import drvFilter from './drvFilter'
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
const {height, width} = Dimensions.get('window');
const deviceWidth = width;
const deviceHeight = height;
var base64Icon = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEsAAABLCAQAAACSR7JhAAADtUlEQVR4Ac3YA2Bj6QLH0XPT1Fzbtm29tW3btm3bfLZtv7e2ObZnms7d8Uw098tuetPzrxv8wiISrtVudrG2JXQZ4VOv+qUfmqCGGl1mqLhoA52oZlb0mrjsnhKpgeUNEs91Z0pd1kvihA3ULGVHiQO2narKSHKkEMulm9VgUyE60s1aWoMQUbpZOWE+kaqs4eLEjdIlZTcFZB0ndc1+lhB1lZrIuk5P2aib1NBpZaL+JaOGIt0ls47SKzLC7CqrlGF6RZ09HGoNy1lYl2aRSWL5GuzqWU1KafRdoRp0iOQEiDzgZPnG6DbldcomadViflnl/cL93tOoVbsOLVM2jylvdWjXolWX1hmfZbGR/wjypDjFLSZIRov09BgYmtUqPQPlQrPapecLgTIy0jMgPKtTeob2zWtrGH3xvjUkPCtNg/tm1rjwrMa+mdUkPd3hWbH0jArPGiU9ufCsNNWFZ40wpwn+62/66R2RUtoso1OB34tnLOcy7YB1fUdc9e0q3yru8PGM773vXsuZ5YIZX+5xmHwHGVvlrGPN6ZSiP1smOsMMde40wKv2VmwPPVXNut4sVpUreZiLBHi0qln/VQeI/LTMYXpsJtFiclUN+5HVZazim+Ky+7sAvxWnvjXrJFneVtLWLyPJu9K3cXLWeOlbMTlrIelbMDlrLenrjEQOtIF+fuI9xRp9ZBFp6+b6WT8RrxEpdK64BuvHgDk+vUy+b5hYk6zfyfs051gRoNO1usU12WWRWL73/MMEy9pMi9qIrR4ZpV16Rrvduxazmy1FSvuFXRkqTnE7m2kdb5U8xGjLw/spRr1uTov4uOgQE+0N/DvFrG/Jt7i/FzwxbA9kDanhf2w+t4V97G8lrT7wc08aA2QNUkuTfW/KimT01wdlfK4yEw030VfT0RtZbzjeMprNq8m8tnSTASrTLti64oBNdpmMQm0eEwvfPwRbUBywG5TzjPCsdwk3IeAXjQblLCoXnDVeoAz6SfJNk5TTzytCNZk/POtTSV40NwOFWzw86wNJRpubpXsn60NJFlHeqlYRbslqZm2jnEZ3qcSKgm0kTli3zZVS7y/iivZTweYXJ26Y+RTbV1zh3hYkgyFGSTKPfRVbRqWWVReaxYeSLarYv1Qqsmh1s95S7G+eEWK0f3jYKTbV6bOwepjfhtafsvUsqrQvrGC8YhmnO9cSCk3yuY984F1vesdHYhWJ5FvASlacshUsajFt2mUM9pqzvKGcyNJW0arTKN1GGGzQlH0tXwLDgQTurS8eIQAAAABJRU5ErkJggg==';

export default class appContainer extends Component {
    constructor(props){
      super(props)//props is not defined
      this.state = {
        selectTab:'feed',
        sideMenuOpen: false,

          }

      }

    _onSetSideMenuOpen(open) {
      this.setState({
        sideMenuOpen: open,});
    }
    onPressShow(){
      this.setState({selectTab:'feed'});
    }
    onPressAdd(){
      this.refs.nav.push({
          component:AddShop,
          title:"添加司机信息"
      })

    }
    onPressDriver(){
      this.setState({selectTab:'filter'});
      this.refs.nav.push({
          component:drvFilter,
          title:"司機"
      })

    }
    onPressSearch(){
      this.setState({selectTab:'search'});
    }



    render(){

            const menu = <Menu navigator={navigator}/>;
            return (
              <SideMenu menu={menu} openMenuOffset={deviceWidth/2}
              isOpen={this.state.sideMenuOpen} onChange={(isOpen)=>this._onSetSideMenuOpen(isOpen)}>
                <View style={{flex:1,marginTop:20}}>





                      <TabBarIOS style={{height:deviceHeight,width:deviceWidth}} translucent={true} >
                            <TabBarIOS.Item
                                title="正在开发中"
                                icon={{uri: base64Icon, scale: 3}}
                                selected={this.state.selectTab === 'filter'}

                                >


                                      <View style={styles.container} ></View>

                            </TabBarIOS.Item>
                              <TabBarIOS.Item
                                  title="展示"
                                  systemIcon='contacts'
                                  selected={this.state.selectTab === 'feed'}
                                  onPress={this.onPressShow.bind(this)}>


                                    <NavigatorIOS
                                        ref='nav'
                                        style={{
                                          flex:1
                                        }}
                                        initialRoute={{
                                          component:IndexPage,
                                          title:'司机信息',
                                          leftButtonTitle: "Menu",
                                          onLeftButtonPress:()=>{
                                              {this._onSetSideMenuOpen(true) }
                                          },
                                          rightButtonSystemIcon: 'add',

                                          onRightButtonPress:()=>{


                                            {this.onPressAdd()}

                                          }
                                        }}
                                       />

                              </TabBarIOS.Item>
                              <TabBarIOS.Item
                                  title="搜索"
                                  selected={this.state.selectTab === 'search'}
                                  onPress={this.onPressSearch.bind(this)}
                                  systemIcon='search' >


                                  <NavigatorIOS
                                      ref='nav'
                                      style={{
                                        flex:1
                                      }}
                                      initialRoute={{
                                        component:Search,
                                        title:'搜索',

                                      }}
                                     />

                              </TabBarIOS.Item>

                            </TabBarIOS>


                </View>
                </SideMenu>
              )
        }


    }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop:20,

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


  textStyle:{
    justifyContent:'center',
    alignItems: 'center',
    marginTop:height/2.5,
  },


});


AppRegistry.registerComponent('appContainer', () =>appContainer);
