/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  Image,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
export default class App extends React.Component {
  constructor() {
    super();
    this.state = {
      dataSource: [],
      isLoading: true,
    };
  }

  renderItem = ({item}) => {
    return (
      <View style={{flex: 1, flexDirection: 'row', marginBottom: 3}}>
        <Image
          style={{
            width: 80,
            height: 80,
            margin: 5,
            borderRadius: 40,
          }}
          source={{uri: item.avatar}}
        />
        <View style={{flex: 1, justifyContent: 'center', marginLeft: 5}}>
          <Text style={{fontSize: 18, color: '#000000', marginBottom: 5}}>
            {item.first_name} {item.last_name}
          </Text>
          <Text
            style={{
              fontSize: 16,
              opacity: 30,
              color: '#808080',
              marginBottom: 15,
            }}>
            {item.email}
          </Text>
        </View>
      </View>
    );
  };

  renderSeparator = (item) => {
    return (
      <View
        style={{
          height: 2,
          width: '100%',
          backgroundColor: '#808080',
        }}
      />
    );
  };
  componentDidMount() {
    const url = 'https://reqres.in/api/users?page=2';

    fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          dataSource: responseJson.data,
          isLoading: false,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render() {
    return (
      this.state.isLoading ?
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#330066" animating />
      </View>
      :
      <View style={styles.container}>
        <View style={styles.header}>
          <FontAwesome5 style={styles.menuIcon} name={'bars'} solid />
          <Text style={styles.headerTitle}>Contacts</Text>
          <FontAwesome5 style={styles.searchIcon} name={'search'} solid />
        </View>
        <FlatList
          data={this.state.dataSource}
          renderItem={this.renderItem}
          keyExtractor={(item, index) => index}
          ItemSeparatorComponent={this.renderSeparator}
        />
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.plus}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  btn: {
    position: 'absolute',
    width: 50,
    height: 50,
    backgroundColor: 'red',
    borderRadius: 50,
    bottom: 10,
    right: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plus: {
    color: 'white',
    fontSize: 25,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: -25,
  },
  header: {
    backgroundColor: 'red',
    height: 60,
  },
  searchIcon: {
    textAlign: 'right',
    marginTop: -25,
    marginRight: 20,
    fontSize: 25,
    color: '#FFFFFF',
  },
  menuIcon: {
    textAlign: 'left',
    marginTop: 15,
    marginLeft: 20,
    fontSize: 25,
    color: '#FFFFFF',
  },
});
