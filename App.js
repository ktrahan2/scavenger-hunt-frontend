import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { StyleSheet, Text, View, Button, Image} from 'react-native'
import { NavigationContainer, StackActions } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import TabContainer from "./TabContainer"

const reducer = combineReducers({
  changeSignInStatus
})

function changeSignInStatus(state=false, action) {
  switch(action.type) {
    case "CHANGESIGNIN":
      return action.payload
    default: 
      return state
  }
}

const Stack = createStackNavigator()
const store = createStore(reducer)
export default class App extends Component {

  render() {
  
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="On The Hunt"
              component={TabContainer}
              options={{
                headerStyle: {height: 100},
                headerTitleStyle: { alignSelf: 'center' },
                headerTitle: <Image 
                  style={{ width: 100, height: 90 }}
                  source = { require('./logo.png') }
                />
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
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
