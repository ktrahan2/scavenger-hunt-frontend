import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { StyleSheet, Text, Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { combineReducers, createStore } from 'redux'
import TabContainer from "./TabContainer"

const reducer = combineReducers({
  changeSignInStatus,
  setHuntListItems,
  isItemClicked
})

const isSignedIn = () => {
  let state = ""
  localStorage.token ? state = true : state = false
  return state
}

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

const Stack = createStackNavigator()
export const store = createStore(reducer, {changeSignInStatus: isSignedIn()})
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
                headerStyle: {height: 100, backgroundColor: "rgba(255, 128, 0, 1)"},
                headerTitleStyle: { alignSelf: 'center', color: "white", fontSize: 28, fontFamily: 'Helvetica-Bold' },
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


