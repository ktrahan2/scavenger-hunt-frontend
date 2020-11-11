import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { connect } from 'react-redux'
import Login from "./Login"
import Signup from "./Signup"
import HomePage from "./HomePage"
import Logout from "./Logout"
import MyHunts from "./MyHunts"
import GenerateHunt from "./GenerateList"
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
    faSignOutAlt, 
    faSignInAlt, 
    faHome,
    faUserPlus,
    faPlus,
    faList
  } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Tab = createBottomTabNavigator()
function TabContainer({ 
    isSignin, 
    updateSignInStatus, 
    setHuntListItems, 
    navigation,
  }) {

  useEffect( () => fetchAllInfo(), [])

  const fetchAllInfo = () => {
    fetch('http://localhost:7000/hunt-items')
      .then(response => response.json())
      .then(results => setHuntListItems([...results]))
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "blue",
        inactiveTintColor: "rgba(255,120,63, 1)",
        style:{ backgroundColor: 'rgba(220, 243, 255, .8)' }
      }}
    >
    {isSignin === false ? (
      <>
        <Tab.Screen
            name="HomePage"
            component={ HomePage }
            options={{
              tabBarIcon: ({ focused }) => (
                <FontAwesomeIcon 
                  icon={ faHome } 
                  color= { !focused ? "rgba(255,120,63, 1)" : 'blue' }
                />
              )
            }}
        /> 
        <Tab.Screen
            name="Login"
            component={ Login }
            options={{
              tabBarIcon: ({ focused }) => (
                <FontAwesomeIcon 
                color= { !focused ? "rgba(255,120,63, 1)" : 'blue' }
                icon={ faSignInAlt } 
                />
              )
            }}
        /> 
        <Tab.Screen
            name="Signup"
            component={ Signup }
            options={{
              tabBarIcon: ({ focused }) => (
                <FontAwesomeIcon 
                  icon={ faUserPlus } 
                  color= { !focused ? "rgba(255,120,63, 1)" : 'blue' }
                />
              )
            }}
        /> 
      </>
      ) : (
      <>
        <Tab.Screen
            name="Generate Hunt"
            component={ GenerateHunt }
            navigation={ navigation }
            options={{
              tabBarIcon: ({ focused }) => (
                <FontAwesomeIcon 
                  icon={ faPlus } 
                  color= { !focused ? "rgba(255,120,63, 1)" : 'blue' }
                />
              )
            }}
        /> 
        <Tab.Screen
            name="My Hunts"
            navigation={ navigation }
            component={ MyHunts } 
            options={{
              tabBarIcon: ({ focused }) => (
                <FontAwesomeIcon 
                  icon={ faList } 
                  color= { !focused ? "rgba(255,120,63, 1)" : 'blue' }
                />
              )
            }}
        />
        <Tab.Screen
          name="Logout"
          component={ Logout }  
          options={{
            tabBarIcon: ({ focused }) => (
              <FontAwesomeIcon 
                icon={ faSignOutAlt } 
                color= { !focused ? "rgba(255,120,63, 1)" : 'blue' }
                />
            )
          }}
          listeners={ () => ({
            tabPress: event => {
              event.preventDefault()
              AsyncStorage.removeItem("token")
              updateSignInStatus()
            }
          })
        }
        />
      </>
      )}
    </Tab.Navigator>
  );
}

const mapStateToProps = (state) => {
  return {
    isSignin: state.setSignInStatus,
    isUserId: state.setUserId,
    isUser: state.setUser
  }
}

function mapDispatchToProps(dispatch) {
  return {
    updateSignInStatus: () => dispatch({
      type: "CHANGESIGNIN",
      payload: false
    }),
    setHuntListItems: (result) => dispatch({
      type: "ALLHUNTITEMS",
      payload: result
    }),
    setUser: (user) => dispatch({
      type: "SETUSER",
      payload: user
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TabContainer);
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
});
