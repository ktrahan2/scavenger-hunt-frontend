import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { connect } from 'react-redux'
import Login from "./Login"
import Signup from "./Signup"
import HomePage from "./HomePage"
import Logout from "./Logout"
import MyHunts from "./MyHunts"
import GenerateHunt from "./GenerateHunt"
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
function TabContainer({ Signin, isSignedIn, setHuntListItems }) {

  useEffect( () => fetchAllHuntItems(), [])

  const fetchAllHuntItems = () => {
    fetch('https://on-the-hunt.herokuapp.com/hunt-items')
      .then(response => response.json())
      .then(results => setHuntListItems([...results]))
  }

  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "orange",
        inactiveTintColor: "white",
        style:{backgroundColor: 'rgba(165, 42, 42, 1)'}
      }}
    >
    {Signin === false ? (
      <>
        <Tab.Screen
            name="HomePage"
            component={HomePage}
            options={{
              tabBarIcon: ({focused}) => (
                <FontAwesomeIcon 
                  icon={ faHome } 
                  color= {!focused ? 'white' : "orange"}
                />
              )
            }}
        /> 
        <Tab.Screen
            name="Login"
            component={Login}
            options={{
              tabBarIcon: ({focused}) => (
                <FontAwesomeIcon 
                  color= {!focused ? 'white' : "orange"}
                  icon={ faSignInAlt } 
                />
              )
            }}
        /> 
        <Tab.Screen
            name="Signup"
            component={Signup}
            options={{
              tabBarIcon: ({focused}) => (
                <FontAwesomeIcon 
                  icon={ faUserPlus } 
                  color= {!focused ? 'white' : "orange"}
                />
              )
            }}
        /> 
      </>
      ) : (
      <>
        <Tab.Screen
            name="Generate Hunt"
            component={GenerateHunt}
            options={{
              tabBarIcon: ({focused}) => (
                <FontAwesomeIcon 
                  icon={ faPlus } 
                  color= {!focused ? 'white' : "orange"}
                />
              )
            }}
        /> 
        <Tab.Screen
            name="My Hunts"
            component={MyHunts}
            options={{
              tabBarIcon: ({focused}) => (
                <FontAwesomeIcon 
                  icon={ faList } 
                  color= {!focused ? 'white' : "orange"}
                />
              )
            }}
        />
        <Tab.Screen
          name="Logout"
          component={Logout}  
          options={{
            tabBarIcon: ({focused}) => (
              <FontAwesomeIcon 
                icon={ faSignOutAlt } 
                color= {!focused ? 'white' : "orange"}
              />
            )
          }}
          listeners={ () => ({
            tabPress: event => {
              event.preventDefault()
              AsyncStorage.removeItem("token")
              isSignedIn()
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
    Signin: state.changeSignInStatus
  }
}

function mapDispatchToProps(dispatch) {
  return {
    isSignedIn: () => dispatch({
      type: "CHANGESIGNIN",
      payload: false
    }),
    setHuntListItems: (result) => dispatch({
      type: "ALLHUNTITEMS",
      payload: result
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
