import React from 'react';
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
function TabContainer({ isSignedIn }) {

  return (
    <Tab.Navigator>
    {!localStorage.token ? (
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
            //add a modal that ask are sure to log out
            // tabBarButton: () => (Storage.removeItems("token"))
            tabBarIcon: () => (
              <FontAwesomeIcon icon={ faSignOutAlt } />
            )
          }}
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

export default connect(mapStateToProps)(TabContainer);
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
