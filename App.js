import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { StyleSheet, Text, Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import TabContainer from "./TabContainer"
import AsyncStorage from '@react-native-async-storage/async-storage'

const reducer = combineReducers({
  changeSignInStatus,
  setHuntListItems,
  isItemClicked,
  isChecked
})

function setHuntListItems(state=[], action) {
  switch(action.type) {
    case "ALLHUNTITEMS":
      return action.payload
    default: 
      return state
  }
}

function changeSignInStatus(state=false, action) {
  switch(action.type) {
    case "CHANGESIGNIN":
      return action.payload
    default: 
      return state
  }
}

function isItemClicked(state="", action) {
  switch(action.type) {
    case "CLICKED":
      return action.payload
    case "UNCLICKED":
      return action.payload
    default:
      return state
  }
}

function isChecked(state=[], action) {
  switch(action.type) {
    case "CHECK":
      return [...state, action.payload]
      
    case "UNCHECK":
      const filteredIsChecked = state.filter(el => el != action.payload)
      return filteredIsChecked
    default: 
      return state
  }
}

const Stack = createStackNavigator()
export const store = createStore(reducer)
console.log(store.getState())

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
                headerStyle: {height: 140, backgroundColor: 'rgba(165, 42, 42, 1)'},
                headerTitleStyle: { alignSelf: 'center', color: "orange", fontSize: 28, fontFamily: 'Helvetica-Bold' },
                headerTitle: <Text>On The Hunt</Text>,
                headerLeft: () => <Image 
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


