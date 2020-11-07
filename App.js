import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { StyleSheet, Text, Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import TabContainer from "./TabContainer"
import CreatedHunt from "./CreatedHunt"
import CreateList from "./CreateList"
import AsyncStorage from '@react-native-async-storage/async-storage'

const reducer = combineReducers({
  setSignInStatus,
  setHuntListItems,
  setItemClicked,
  setChecked,
  setThemeSelected,
  setItemAmount,
  setThemeArray,
  setHuntTitle,
  setUserId
})

function setUserId(state=0, action) {
  switch(action.type) {
    case "SETID":
      return action.payload
    default:
      return state 
  }
}

function setHuntTitle( state="", action ) {
  switch(action.type) {
    case "SETTITLE":
      return action.payload
    default: 
      return state
  }
}

function setThemeArray( state=[], action ) {
  switch(action.type) {
    case "CREATEARRAY":
      return [...action.payload]
    default:
      return state
  }
}

function setItemAmount(state="", action) {
  switch(action.type) {
    case "UPDATEITEMAMOUNT":
      return action.payload
    default: 
      return state
  }
}

function setThemeSelected( state="", action ) {
  switch(action.type) {
    case "UPDATETHEME":
      return action.payload
    default:
      return state
  }
}

function setHuntListItems(state=[], action) {
  switch(action.type) {
    case "ALLHUNTITEMS":
      return action.payload
    default: 
      return state
  }
}

function setSignInStatus(state=false, action) {
  switch(action.type) {
    case "CHANGESIGNIN":
      return action.payload
    default: 
      return state
  }
}

function setItemClicked( state="", action ) {
  switch(action.type) {
    case "CLICKED":
      return action.payload
    case "UNCLICKED":
      return action.payload
    default:
      return state
  }
}

function setChecked( state=[], action)  {
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

export default class App extends Component {

  render() {
  
    return (
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="On The Hunt"
              component={ TabContainer }
              options={{
                headerStyle: { height: 140, backgroundColor: 'rgba(220, 243, 255, .8)' },
                headerTitleStyle: { alignSelf: 'center', color: "rgba(255,120,63, 1)", fontSize: 28, fontFamily: 'Helvetica-Bold' },
                headerTitle: <Text>On The Hunt</Text>,
                headerLeft: () => <Image 
                  style={{ width: 100, height: 90 }}
                  source = { require('./logo.png') }
                />
              }}
            />
            <Stack.Screen
              name="Create List"
              component={ CreateList }
              options={{
                headerStyle: { height: 140, backgroundColor: 'rgba(220, 243, 255, .8)' },
                headerTitleStyle: { alignSelf: 'center', color: "rgba(255,120,63, 1)", fontSize: 28, fontFamily: 'Helvetica-Bold' },
                headerTitle: <Text>On The Hunt</Text>,
                headerLeft: () => <Image 
                  style={{ width: 100, height: 90 }}
                  source = { require('./logo.png') }
                />
              }}
            />
            <Stack.Screen
              name="Generated Hunt"
              component={ CreatedHunt }
              options={{
                headerStyle: { height: 140, backgroundColor: 'rgba(220, 243, 255, .8)' },
                headerTitleStyle: { alignSelf: 'center', color: "rgba(255,120,63, 1)", fontSize: 28, fontFamily: 'Helvetica-Bold' },
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


