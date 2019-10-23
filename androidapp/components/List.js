import React, {Component} from 'react';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  FlatList,
  Linking,
  TouchableOpacity,
} from 'react-native';
import {List, ListItem, Card} from 'react-native-elements';

class GetList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      output: [],
      pref_price: props.pref_price,
      pref_percent: props.pref_percent,
      maxlimit: 100,
    };
  }

  componentDidMount() {
    axios
      .get(
        'https://www.reddit.com/r/GameDeals/search.json?q=gamedeals&sort=hot',
      )
      .then(response => {
        //console.log(response);
        this.setState({
          posts: response.data.data.children,
        });
        this.getGames();
      })
      .catch(error => {
        console.log(error);
      });
  }

  getGames() {
    const {posts, pref_percent, pref_price} = this.state;

    if (!posts) return;

    const output = posts.map(post => {
      post = post.data;
      var flag_percent = false;
      var flag_price = false;
      var str = post.title;
      var price = str.match(
        /((€|\$|£)(\s*)([0-9]+)(.|,|')([0-9]+))|(([0-9]+)(.|,|')([0-9]+)(\s*)(€|\$|£))/g,
      );
      var percent = str.match(/(([0-9]+)(\s*)(%))|((%)(\s*)([0-9]+))/g);
      if (percent) {
        for (var i = 0; i < percent.length; i++) {
          //percent[i].replace(/(\,)/g, '.');
          percent[i] = percent[i].match(/(([0-9]+)(.|,|')([0-9]*))|([0-9]+)/g);
          if (percent[i] >= pref_percent) flag_percent = true;
        }
      }
      if (price) {
        for (i = 0; i < price.length; i++) {
          //price[i].replace(/(\,)/g, '.');
          price[i] = price[i].match(/(([0-9]+)(.|,|')([0-9]*))|([0-9]+)/g);
          if (price[i] <= pref_price) flag_price = true;
        }
      }

      if (str.indexOf('free') > -1 || flag_price || flag_percent) {
        i = 1;
        var platform = '';
        if (str.charAt(0) === '[') {
          while (str.charAt(i) !== ']' && i < str.length) {
            platform += str.charAt(i);
            i++;
          }
          i++;
        }
        if (!post.url || post.url.includes('www.reddit.com')) return null;
        const title = platform
          ? post.title.replace('[' + platform + ']', '')
          : post.title;
        return {
          title: title,
          key: post.id,
          info: post.url,
          pic: post.thumbnail,
          platform: platform,
          price: price,
          percent: percent,
        };
      }
      return null;
    });
    //console.log(output);
    this.setState({
      output: output,
    });
  }

  render() {
    const {output} = this.state;
    return (
      <SafeAreaView
        style={{
          backgroundColor: '#232A2B',
        }}>
        {output.length ? (
          output.map(out =>
            out ? (
              <View
                key={out.key}
                style={{
                  backgroundColor: '#232A2B',
                  shadowOffset: {width: 10, height: 10},
                  shadowColor: 'black',
                  shadowOpacity: 1.0,
                }}>
                <View>
                  <View
                    style={{
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      backgroundColor: '#232A2B',
                    }}
                  />
                  <Card
                    containerStyle={{
                      backgroundColor: '#0D1F22',
                      borderColor: '#0D1F22',
                      borderRadius: 10,
                    }}
                    wrapperStyle={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}
                    onPress={() => Linking.openURL(out.info)}>
                    <View
                      style={{
                        flex: 1,
                        flexDirection: 'column',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flex: 0.8,
                        }}>
                        {
                          <View>
                            {out.title.length > this.state.maxlimit ? (
                              <Text style={{color: '#d3d3d3'}}>
                                {out.title.substring(
                                  0,
                                  this.state.maxlimit - 3,
                                ) + '...'}
                              </Text>
                            ) : (
                              <Text style={{color: '#d3d3d3'}}>
                                {out.title}
                              </Text>
                            )}
                          </View>
                        }
                      </View>
                      <View>
                        {
                          <Text
                            style={{
                              flex: 0.2,
                              color: '#d3d3d3',
                            }}>
                            {out.platform ? '[' + out.platform + ']' : ''}
                          </Text>
                        }
                      </View>
                    </View>
                    <Image
                      source={{uri: out.pic}}
                      style={{
                        width: 60,
                        height: 60,
                        borderRadius: 60 / 2,
                      }}
                    />
                  </Card>
                </View>
              </View>
            ) : (
              <View key={Math.random()} style={{flex: 0}} />
            ),
          )
        ) : (
          <Text />
        )}
      </SafeAreaView>
    );
  }
}

//<View style={styles.lineStyle} />
const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
  },
  lineStyle_2: {
    borderWidth: 1.2,
    borderColor: 'black',
  },
});

export default GetList;
