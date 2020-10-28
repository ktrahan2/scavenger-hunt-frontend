import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class HomePage extends Component {

    render() {
      return (
        <View>
            <Text>HEY THERE</Text>
            <Button
                title="Login"
                onPress={() =>
                    this.props.navigation.navigate("LoggedIn")
                }
            />
        </View>
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
