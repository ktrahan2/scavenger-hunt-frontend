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

const Tab = createBottomTabNavigator()
function TabContainer({ Signin, isSignedIn, setHuntListItems }) {

  useEffect( () => {
    fetch('https://on-the-hunt.herokuapp.com/hunt-items')
      .then(response => response.json())
      .then(results => setHuntListItems([...results]))
    },
    [],
  )

  return (
    <Tab.Navigator>
    {!localStorage.token && Signin === false ? (
      <>
        <Tab.Screen
            name="HomePage"
            component={HomePage}
            options={{
              tabBarIcon: () => (
                <FontAwesomeIcon icon={ faHome } />
              )
            }}
        /> 
        <Tab.Screen
            name="Login"
            component={Login}
            options={{
              tabBarIcon: () => (
                <FontAwesomeIcon icon={ faSignInAlt } />
              )
            }}
        /> 
        <Tab.Screen
            name="Signup"
            component={Signup}
            options={{
              tabBarIcon: () => (
                <FontAwesomeIcon icon={ faUserPlus } />
              )
            }}
        /> 
      </>
      ) : (
      <>
        <Tab.Screen
            name="My Hunts"
            component={MyHunts}
            options={{
              tabBarIcon: () => (
                <FontAwesomeIcon icon={ faList } />
              )
            }}
        />
        <Tab.Screen
            name="Generate Hunt"
            component={GenerateHunt}
            options={{
              tabBarIcon: () => (
                <FontAwesomeIcon icon={ faPlus } />
              )
            }}
        /> 
        <Tab.Screen
          name="Logout"
          component={Logout}  
          options={{
            tabBarIcon: () => (
              <FontAwesomeIcon icon={ faSignOutAlt } />
            )
          }}
          listeners={ () => ({
            tabPress: event => {
              event.preventDefault()
              localStorage.removeItem("token")
              localStorage.removeItem("userID")
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
