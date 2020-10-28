import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class LoggedIn extends Component {

  render() {
    return (
    <Text>
      HEY THERE
    </Text>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
