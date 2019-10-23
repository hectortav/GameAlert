import React, {Component} from 'react';
import GetList from './List';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

class Main extends Component {
  state = {};
  render() {
    return (
      <View style={{backgroundColor: '#232A2B', flex: 1}}>
        <GetList pref_price={100} pref_percent={0} />
      </View>
    );
  }
}

export default Main;
