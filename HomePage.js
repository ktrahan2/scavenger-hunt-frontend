import React, { Component } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

export default class HomePage extends Component {

    render() {
      return (
        <View>
            <Button
                title="Login"
                onPress={() =>
                    this.props.navigation.navigate("Login")
                }
            />
            <Button
                title="Sign up"
                onPress={() =>
                    this.props.navigation.navigate("Signup")
                }
            />
            <Text>HEY THERE</Text>
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
