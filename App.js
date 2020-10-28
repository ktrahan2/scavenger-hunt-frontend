import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import HomePage from "./HomePage"
import Login from "./Login"
import Signup from "./Signup"

const Stack = createStackNavigator()
export default class App extends Component {

  // const handleLogin = () => {
  //   console.log("pressed")
  // }

  // const handleSignup = () => {
  //   console.log("pressed")
  // }

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Homepage"
            component={HomePage}
          />
          <Stack.Screen
            name="Login"
            component={Login}
          />  
          <Stack.Screen
            name="Signup"
            component={Signup}
          />  
        </Stack.Navigator>
      </NavigationContainer>
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
