import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

class MySlider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      min: props.min,
      max: props.max,
      minLabel: props.minLabel,
      maxLabel: props.maxLabel,
      delimiter: props.delimiter,
      value: props.defaultValue,
    };
  }

  handleChange = event => {
    this.props.onValueChange({id: this.state.id, value: event.target.value});
    this.setState({value: event.target.value});
  };

  render() {
    return (
      <View>
        <Text>
          {this.props.value === this.state.max
            ? this.state.maxLabel
            : this.props.value}
          {this.state.delimiter}
        </Text>

        <View className="slidecontainer">
          <input
            type="range"
            min={this.state.min}
            max={this.state.max}
            className="slider"
            onChange={this.handleChange}
            value={this.props.value}
          />
          <View
            style={{
              width: '100%',
              margin: 'auto',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Text style={{margin: 'auto', padding: '0%'}}>
              {this.state.minLabel}
            </Text>
            <Text style={{margin: 'auto', padding: '90%'}}>
              {this.state.maxLabel}
            </Text>
          </View>
        </View>
      </View>
    );
  }
}

export default MySlider;
