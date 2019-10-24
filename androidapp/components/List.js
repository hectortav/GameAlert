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
  ImageBackground,
} from 'react-native';
import {List, ListItem, Card, Header} from 'react-native-elements';

class GetList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: [],
      output: [],
      pref_price: props.pref_price,
      pref_percent: props.pref_percent,
      maxlimit: 200,
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
      <View>
        <View></View>
        <ScrollView
          style={{
            backgroundColor: '#232A2B',
          }}>
          {output.length ? (
            output.map(out =>
              out ? (
                <View key={out.key}>
                  <TouchableOpacity onPress={() => Linking.openURL(out.info)}>
                    <Card
                      onPress={() => Linking.openURL(out.info)}
                      containerStyle={{
                        backgroundColor: '#373F51',
                        borderColor: '#373F51',
                        borderRadius: 20,
                        elevation: 7,
                        shadowOffset: {width: 10, height: 10},
                        shadowColor: 'black',
                        shadowOpacity: 1.0,
                        height: 200,
                      }}
                      wrapperStyle={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          justifyContent: 'space-between',
                        }}>
                        <View
                          style={{
                            paddingBottom: 25,
                            paddingTop: 10,
                            paddingLeft: 10,
                          }}>
                          {
                            <Text
                              style={{
                                fontSize: 22,
                                elevation: 5,
                                textShadowColor: '#000',
                                textShadowRadius: 5,
                                color: '#fff',
                              }}>
                              {out.platform ? '[' + out.platform + ']' : ''}
                            </Text>
                          }
                        </View>
                        <View>
                          {
                            <View
                              style={{
                                paddingTop: 25,
                              }}>
                              {out.title.length > this.state.maxlimit ? (
                                <Text
                                  style={{
                                    textAlignVertical: 'center',
                                    textAlign: 'left',
                                    color: '#fff',
                                    overflow: 'hidden',
                                  }}>
                                  {out.title.substring(
                                    0,
                                    this.state.maxlimit - 3,
                                  ) + '...'}
                                </Text>
                              ) : (
                                <Text style={{color: '#fff'}}>{out.title}</Text>
                              )}
                            </View>
                          }
                        </View>
                      </View>
                      <Image
                        source={{uri: out.pic}}
                        style={{
                          backgroundColor: '#3C153B',
                          overflow: 'hidden',
                          borderWidth: 2,
                          borderColor: '#20BF55',
                          width: 60,
                          height: 60,
                          borderRadius: 60 / 2,
                        }}
                      />
                    </Card>
                  </TouchableOpacity>
                </View>
              ) : (
                <View key={Math.random()} />
              ),
            )
          ) : (
            <Text />
          )}
        </ScrollView>
      </View>
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

/*
#5B2333
#AF1B3F
#240115
*/
