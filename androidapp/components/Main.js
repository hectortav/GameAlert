import React, {Component} from 'react';
import GetList from './List';
import Prefs from './Prefs';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  ImageBackground,
  AsyncStorage,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showList: true,
    };
  }

  switch = () => {
    if (this.showList)
      this.setState({
        showList: false,
      });
    else
      this.setState({
        showList: true,
      });
  };

  render() {
    return (
      <View style={{backgroundColor: '#232A2B', flex: 1}}>
        <View
          style={{
            borderBottomLeftRadius: 15,
            borderBottomRightRadius: 15,
            overflow: 'hidden',
            elevation: 7,
          }}>
          <ImageBackground
            source={require('../props/header.png')}
            style={{
              width: '100%',
              height: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <View style={{flex: 0.3}} />

            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <View style={{flex: 0.1}} />
              {!this.state.showList ? (
                <Icon
                  name="arrow-left"
                  size={25}
                  color="#fff"
                  onPress={() => this.setState({showList: true})}
                />
              ) : (
                <View />
              )}
              <View style={{flex: 0.3}} />
              <Text style={{color: '#fff', fontSize: 20}}>
                {'< Game Alert />'}
              </Text>
              <View style={{flex: 0.3}} />
              {this.state.showList ? (
                <Icon
                  name="asterisk"
                  size={25}
                  color="#fff"
                  onPress={() => this.setState({showList: false})}
                />
              ) : (
                <View />
              )}
              <View style={{flex: 0.1}} />
            </View>
          </ImageBackground>
        </View>
        {this.state.showList ? <GetList /> : <Prefs />}
      </View>
    );
  }
}

export default Main;
