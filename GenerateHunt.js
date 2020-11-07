import React, {useEffect} from 'react'
import { Button, StyleSheet, View, ImageBackground, TextInput } from 'react-native';
import { connect } from 'react-redux'
import { store } from './App'
import AsyncStorage from '@react-native-async-storage/async-storage'

function GenerateHunt({ 
    setHuntTitle,
    isHuntListTitle,
    navigation,
    setUserId,
    isUserId 
  }) {

    useEffect(() => {
        AsyncStorage.getItem("data")
        .then(data => JSON.parse(data))
        .then(result => {
          setUserId(result[0].id) 
        })
      },
      []
    )

    const handleCreateList = () => {
      fetch('http://localhost:7000/create-hunt-list', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Title: isHuntListTitle,
          OwnerID: isUserId
        })
      }).then(response => response.json())
          .then(console.log) 
      navigation.navigate("Create List")
    }

    return (
      <ImageBackground
      style={styles.image}
      source={require("./blue-sky.jpg")}
      >
        <View style={styles.screenContainer}>
            <View style={styles.form}>
                <TextInput
                    name="list title"
                    label="Hunt List Title"
                    style={styles.input}
                    onChangeText={ (text) => setHuntTitle(text)}
                    autoCapitalize="none"
                    placeholder="Enter Title"
                    placeholderTextColor= "black"
                />
                <Button
                    title="Get Random Hunt"
                    onPress={handleCreateList}
                    color= "black"
                    accessibilityLabel="Click to generate a hunt list"
                />
            </View>  
        </View>
      </ImageBackground>
    )
}

const mapStateToProps = (state) => {
    return {
      isHuntListTitle: state.setHuntTitle,
      isUserId: state.setUserId
    }
  }
  
function mapDispatchToProps(dispatch) {
  return {
    setHuntTitle: (name) => dispatch({
      type: "SETTITLE",
      payload: name
    }), 
    setUserId: (id) => dispatch({
      type: "SETID",
      payload: id
    })
  }
}
  
export default connect(mapStateToProps, mapDispatchToProps)(GenerateHunt);

const styles = StyleSheet.create({
    screenContainer: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    dropDown: {
      justifyContent: "center",
      alignContent: "center",
      margin: 10,
      backgroundColor: 'rgba(230, 243, 255, .1)',
      borderColor: 'rgba(230, 243, 255, .75)',
    },
    input: {
      borderWidth: 1,
      borderColor: 'rgba(230, 243, 255, .75)',
      padding: 8,
      margin: 10,
      width: "85%",
      borderRadius: 10,
      minHeight: 50,
      minWidth: "85%",
      color: "black",
      fontSize: 20
    },
    form: {
      justifyContent: "center",
      backgroundColor: 'rgba(230, 243, 255, .75)',
      borderRadius: 10,
      height: 300,
      width: 300,
      alignItems: "center" 
    },
    image: {
      flex: 1,
      resizeMode: "cover",
      justifyContent: "center"
    },
})