import React, {useEffect} from 'react'
import { TouchableOpacity, StyleSheet, View, ImageBackground, TextInput, Text } from 'react-native';
import { connect } from 'react-redux'
import AsyncStorage from '@react-native-async-storage/async-storage'

function GenerateHunt({ 
    setHuntTitle,
    isHuntListTitle,
    navigation,
    setUserId,
    isUserId,
    setHuntListId 
  }) {

    useEffect(() => {
        AsyncStorage.getItem("data")
        .then(data => JSON.parse(data))
        .then(result => {
          setUserId(result[0].id) 
        }).catch(error => {
          console.log(error)
        }) 
      },
      []
    )

    const handleCreateList = () => {
      fetch("https://on-the-hunt.herokuapp.com/create-hunt-list", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          Title: isHuntListTitle,
          OwnerID: isUserId
        })
      }).then(response => response.json())
          .then(id => setHuntListId(id))
          
      navigation.navigate("Create List")
    }

    return (
      <ImageBackground
      style={styles.image}
      source={require("./blue-sky.jpg")}
      >
        <View style={styles.screenContainer}>
            <View style={styles.form}>
                <Text style={styles.h2}>First Select a Title</Text>
                <View style={styles.borderLine}></View>
                <TextInput
                    name="list title"
                    label="Hunt List Title"
                    style={styles.input}
                    onChangeText={ (text) => setHuntTitle(text)}
                    autoCapitalize="none"
                    placeholder="Enter Title"
                    placeholderTextColor= "rgba( 61, 85, 35, 1)"
                />
                <TouchableOpacity
                  style={styles.button}
                  onPress={handleCreateList}
                >
                  <Text style={styles.buttonText}>Create Hunt List</Text>
                </TouchableOpacity>
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
    }),
    setHuntListId: (id) => dispatch({
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
    input: {
      borderWidth: 1,
      borderColor: 'rgba(230, 243, 255, .75)',
      padding: 8,
      margin: 10,
      width: "85%",
      borderRadius: 10,
      minHeight: 50,
      minWidth: "85%",
      color: "rgba( 61, 85, 35, 1)",
      fontSize: 20,
      backgroundColor: 'rgba(230, 243, 255, .85)',
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
    h2: {
      padding: 20,
      fontSize: 28,
      color: "rgba( 61, 85, 35, 1)",
      alignItems: "center"
  },
  borderLine: {
    width: "95%", 
    borderBottomWidth: 2, 
    borderBottomColor: "rgba(0, 0, 0, .3)",
    marginTop: -20,
    marginBottom: 15, 
    borderStyle: "solid"
  },
  text: {
    color: "rgba( 61, 85, 35, 1)",
    fontSize: 20,
    padding: 2
  },
  button: {
    borderWidth: 1,
    borderColor: 'rgba(230, 243, 255, .75)',
    borderStyle: "solid",
    borderRadius: 10,
    width: "75%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",  
    backgroundColor: 'rgba(230, 243, 255, .85)',
    marginTop: 15,
  },
  buttonText: {
    color: "rgba( 61, 85, 35, 1)",
    fontSize: 16,
  }


})