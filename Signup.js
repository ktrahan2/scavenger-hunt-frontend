import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';

export default class Signup extends Component {

  render() {
    return (
    <Text>
      EY im a sign up form
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
