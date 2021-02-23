import React from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import MyForm from './Components/CreateForm/Form'
import blueSky from './assets/blue-sky.jpg'

export default function Signup({ navigation }) {

  const inputsArray = ["username", "password", "email"]
  const formButton = "Signup"
  
  return (
    <ImageBackground
      style={styles.image}
      source={blueSky}
    >
      <View style={styles.container}>
        <MyForm 
          url="create-user"
          navigation={navigation}
          inputsArray={inputsArray}
          formButton={formButton}
        />
      </View>
    </ImageBackground>
  )
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  }
});
