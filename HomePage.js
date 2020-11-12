import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux'
import RenderList from './Components/CreateList/RenderList'

function HomePage({ 
    allHuntItems
  }) {

  const renderList = () => {
    if (allHuntItems.length > 0) {
      let first = allHuntItems[5]  
      let second = allHuntItems[6]
      let itemArray = [first, second]
      return <RenderList array={itemArray}/>
    }
  }
 
  return (
    <ImageBackground
      style={styles.image}
      source={require("./blue-sky.jpg")}
    >
      <View style={styles.container}>
        <View style={styles.description}>
          <Text style={styles.textDescription}>Welcome to On The Hunt. Below you can see an example scavenger hunt! If you click
            on the name of the item it will show a picture. The picture is just a guide to help find the item and isn't an exact
            copy. Enjoy your hunt!
          </Text>
        </View>
        <View style={styles.example}>
          <Text style={styles.h2}>Example Hunt</Text>
          <View style={styles.borderLine}></View>
          <>{renderList()}</>
        </View>
      </View>
    </ImageBackground>
  )
}

const mapStateToProps = (state) => {
  return {
    allHuntItems: state.setHuntListItems,
  }
}

export default connect(mapStateToProps)(HomePage)
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    flex: 1,
    backgroundColor: 'rgba(230, 243, 255, .75)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
    borderRadius: 10,
  },
  example: {
    flex: 3,
    backgroundColor: 'rgba(230, 243, 255, .75)',
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
    borderRadius: 10,
    alignItems: "center",
    width: "85%",
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
  textDescription: {
    color: "rgba( 61, 95, 35, 1)",
    fontSize: 20,
    padding: 2
  },
  borderLine: {
    width: "100%", 
    borderBottomWidth: 2, 
    borderBottomColor: "rgba(0, 0, 0, .3)",
    marginTop: -20,
    marginBottom: 15, 
    borderStyle: "solid"
  }

});

