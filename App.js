import 'react-native-gesture-handler'
import React, { Component } from 'react'
import { Text, Image} from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { LogBox } from 'react-native'
import TabContainer from "./Components/main/TabContainer"
import ViewHunt from "./ViewHunt"
import CreateList from "./CreateListOptions"
import UserHunt from "./UserHunt"
import SplashScreen from "./SplashScreen"
import Reducer from "./Reducer"
import logo from './assets/logo.png'

const Stack = createStackNavigator()
export const store = createStore(Reducer())
export default class App extends Component {
  
  render() {
    LogBox.ignoreAllLogs();
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
                  source = { logo }
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
                  source = { logo }
                />
              }}
            />
            <Stack.Screen
              name="Generated Hunt"
              component={ ViewHunt }
              options={{
                headerStyle: { height: 140, backgroundColor: 'rgba(220, 243, 255, .8)' },
                headerTitleStyle: { alignSelf: 'center', color: "rgba(255,120,63, 1)", fontSize: 28, fontFamily: 'Helvetica-Bold' },
                headerTitle: <Text>On The Hunt</Text>,
                headerLeft: () => <Image 
                  style={{ width: 100, height: 90 }}
                  source = { logo }
                />
              }}
            />
            <Stack.Screen
              name="User Hunt"
              component={ UserHunt }
              options={{
                headerStyle: { height: 140, backgroundColor: 'rgba(220, 243, 255, .8)' },
                headerTitleStyle: { alignSelf: 'center', color: "rgba(255,120,63, 1)", fontSize: 28, fontFamily: 'Helvetica-Bold' },
                headerTitle: <Text>On The Hunt</Text>,
                headerLeft: () => <Image 
                  style={{ width: 100, height: 90 }}
                  source = { logo }
                />
              }}
            />
            <Stack.Screen
              name="Splash Screen"
              component={ SplashScreen }
              options={{
                headerStyle: { height: 140, backgroundColor: 'rgba(220, 243, 255, .8)' },
                headerTitleStyle: { alignSelf: 'center', color: "rgba(255,120,63, 1)", fontSize: 28, fontFamily: 'Helvetica-Bold' },
                headerTitle: <Text>On The Hunt</Text>,
                headerLeft: () => <Image 
                  style={{ width: 100, height: 90 }}
                  source = { logo }
                />
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    );
  }
}
