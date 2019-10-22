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
} from 'react-native';
import {List, ListItem} from 'react-native-elements';

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
      <SafeAreaView>
        {output.length ? (
          output.map(out =>
            out ? (
              <ListItem
                key={out.key}
                roundAvatar
                onPress={() => Linking.openURL(out.info)}
                title={
                  out.title.length > this.state.maxlimit
                    ? out.title.substring(0, this.state.maxlimit - 3) + '...'
                    : out.title
                }
                subtitle={out.platform ? '[' + out.platform + ']' : ''}
                rightAvatar={out.pic ? {source: {uri: out.pic}} : null}
                bottomDivider={true}
                topDivider={true}
              />
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
    margin: 10,
  },
});

export default GetList;
