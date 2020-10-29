import { TabActions } from '@react-navigation/native';
import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { connect } from 'react-redux'
import Login from "./Login"
import Signup from "./Signup"
import HomePage from "./HomePage"

const Tab = createBottomTabNavigator()
function TabContainer({navigation, isSignedIn}) {

  return (
    <Tab.Navigator>
    {isSignedIn === false ? (
      <>
        <Tab.Screen
            name="HomePage"
            component={HomePage}
            onPress={() => navigation.navigate("HomePage")}
        /> 
        <Tab.Screen
            name="Login"
            component={Login}
            onPress={() => navigation.navigate("Login")}
        /> 
        <Tab.Screen
            name="Signup"
            component={Signup}
            onPress={() => navigation.navigate("Signup")}
        /> 
        </>
        ) : (
        <>
          <Tab.Screen
              name="My Hunts"
              component={HomePage}
              onPress={() => navigation.navigate("HomePage")}
          />
          <Tab.Screen
              name="Generate Hunt"
              component={Login}
              onPress={() => navigation.navigate("Login")}
          /> 
          <Tab.Screen
          name="Logout"
          component={Signup}
          onPress={() => navigation.navigate("Signup")}
          />
        </>
        )}
    </Tab.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    isSignedIn: state.changeSignInStatus
  }
}

export default connect(mapStateToProps)(TabContainer);
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
