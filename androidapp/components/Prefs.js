import React, {Component} from 'react';
//import Slider from './Slider';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Slider,
  Button,
  Switch,
} from 'react-native';

class Prefs extends Component {
  constructor(props) {
    super(props);

    this.state = {
      switchValue: false,
      sliderOptions: [
        {
          key: 'price',
          min: 0,
          max: 60,
          minLabel: 'Free',
          value: 10,
          delimiter: '',
        },
        {
          key: 'percentage',
          min: 0,
          max: 100,
          maxLabel: 'Free',
          value: 50,
          delimiter: '%',
        },
      ],
      sliderOptionsShow: [
        {
          key: 'price_show',
          min: 0,
          max: 60,
          minLabel: 'Free',
          value: 10,
          delimiter: '',
        },
        {
          key: 'percentage_show',
          min: 0,
          max: 100,
          maxLabel: 'Free',
          value: 50,
          delimiter: '%',
        },
      ],
    };
  }

  handleChange = target => {
    const sliderOptions = [...this.state.sliderOptions];
    const index = sliderOptions
      .map(function(x) {
        return x.key;
      })
      .indexOf(target.id);
    sliderOptions[index].value = target.value;
    this.setState({sliderOptions});
    //ls.set(target.id, target.value);
  };

  handleChangeShow = target => {
    const sliderOptionsShow = [...this.state.sliderOptionsShow];
    const index = sliderOptionsShow
      .map(function(x) {
        return x.key;
      })
      .indexOf(target.id);
    sliderOptionsShow[index].value = target.value;
    this.setState({sliderOptionsShow});
    //ls.set(target.id, target.value);
  };

  componentDidMount = () => {
    const sliderOptions = [...this.state.sliderOptions];
    var index = sliderOptions
      .map(function(x) {
        return x.key;
      })
      .indexOf('price');
    //sliderOptions[index].value = ls.get('price') || 10;
    index = sliderOptions
      .map(function(x) {
        return x.key;
      })
      .indexOf('percentage');
    //sliderOptions[index].value = ls.get('percentage') || 50;
    this.setState({sliderOptions});
  };

  notificationsSwitch = value => {
    this.setState({switchValue: value});
  };

  render() {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#232A2B',
        }}>
        <View style={{flex: 0.1}} />
        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              flex: 1,
              paddingLeft: 10,
              color: '#d3d3d3',
              fontSize: 20,
            }}>
            Preferences
          </Text>
        </View>
        <View style={styles.lineStyle} />

        <View style={{flex: 0.1}} />
        <View style={{flex: 0.2}}>
          {this.state.sliderOptionsShow.map(slider => (
            <View key={slider.key}>
              <Slider
                style={{}}
                key={slider.key}
                step={1}
                minimumValue={slider.min}
                maximumValue={slider.max}
                value={slider.value}
                onValueChange={value =>
                  this.handleChangeShow({id: slider.key, value: value})
                }
                thumbTintColor="#AF1B3F"
                maximumTrackTintColor="#D62246"
                minimumTrackTintColor="#D62246"
              />
              <View style={styles.textCon}>
                {/*<Text style={styles.colorGrey}>{slider.minLabel}</Text>*/}
                {slider.value === slider.max ? (
                  slider.maxLabel ? (
                    <Text style={styles.colorYellowActive}>
                      {slider.maxLabel}
                    </Text>
                  ) : (
                    <Text style={styles.colorYellow}>
                      {slider.value + slider.delimiter}
                    </Text>
                  )
                ) : slider.value === slider.min ? (
                  slider.minLabel ? (
                    <Text style={styles.colorYellowActive}>
                      {slider.minLabel}
                    </Text>
                  ) : (
                    <Text style={styles.colorYellow}>
                      {slider.value + slider.delimiter}
                    </Text>
                  )
                ) : (
                  <Text style={styles.colorYellow}>
                    {slider.value + slider.delimiter}
                  </Text>
                )}

                {/*<Text style={styles.colorGrey}>{slider.maxLabel}</Text>*/}
              </View>
            </View>
          ))}
        </View>
        <View style={{flex: 0.4}} />
        <View
          style={{
            flex: 0.1,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              flex: 1,
              paddingLeft: 10,
              color: '#d3d3d3',
              fontSize: 20,
            }}>
            Notifications
          </Text>

          <Switch
            trackColor={{true: '#D62246', false: '#F5F3F5'}}
            thumbColor={this.state.switchValue ? '#AF1B3F' : '#d3d3d3'}
            style={{transform: [{scaleX: 1.2}, {scaleY: 1.2}]}}
            onValueChange={this.notificationsSwitch}
            value={this.state.switchValue}
          />
        </View>
        <View style={styles.lineStyle} />

        <View style={{flex: 0.1}} />
        <View style={{flex: 0.2}}>
          {this.state.sliderOptions.map(slider => (
            <View key={slider.key}>
              <Slider
                key={slider.key}
                disabled={!this.state.switchValue}
                step={1}
                minimumValue={slider.min}
                maximumValue={slider.max}
                value={slider.value}
                onValueChange={value =>
                  this.handleChange({id: slider.key, value: value})
                }
                thumbTintColor="#AF1B3F"
                maximumTrackTintColor="#D62246"
                minimumTrackTintColor="#D62246"
              />
              <View style={styles.textCon}>
                {/*<Text style={styles.colorGrey}>{slider.minLabel}</Text>*/}
                {slider.value === slider.max ? (
                  slider.maxLabel ? (
                    <Text style={styles.colorYellowActive}>
                      {slider.maxLabel}
                    </Text>
                  ) : (
                    <Text style={styles.colorYellow}>
                      {slider.value + slider.delimiter}
                    </Text>
                  )
                ) : slider.value === slider.min ? (
                  slider.minLabel ? (
                    <Text style={styles.colorYellowActive}>
                      {slider.minLabel}
                    </Text>
                  ) : (
                    <Text style={styles.colorYellow}>
                      {slider.value + slider.delimiter}
                    </Text>
                  )
                ) : (
                  <Text style={styles.colorYellow}>
                    {slider.value + slider.delimiter}
                  </Text>
                )}

                {/*<Text style={styles.colorGrey}>{slider.maxLabel}</Text>*/}
              </View>
            </View>
          ))}
        </View>
        <View style={{flex: 0.2}} />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textCon: {
    width: 340,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  colorGrey: {
    color: '#d3d3d3',
  },
  colorYellow: {
    color: '#F5F3F5',
  },
  colorYellowActive: {
    color: '#D62246',
  },
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    margin: 10,
  },
});

export default Prefs;
/*
#232A2B 
#0D1F22 
#AF1B3F
#D62246
#3C153B
#89BD9E
#F0C987
 
*/
