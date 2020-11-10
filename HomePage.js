import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
    faChevronCircleDown
  } from '@fortawesome/free-solid-svg-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';

function HomePage({ 
    allHuntItems, 
    isItemClicked,
    clickItem, 
    unClickItem, 
    isChecked, 
    check, 
    uncheck 
  }) {

  const handleClick = ( item ) => {
    if (isItemClicked !== item.name) {
      clickItem(item.name)
    } else {
      unClickItem(item.name)
    }
  }

  const handleCheck = ( event, item ) => {
    event.preventDefault()
    if (isChecked.includes(item.name)) {
      uncheck(item.name)
    } else {
      check(item.name)
    }
  }

  const renderList = () => {
    if (allHuntItems.length > 0) {
      let first = allHuntItems[5]  
      let second = allHuntItems[6]
      let itemArray = [first, second]
    return (
      itemArray.map(item => {
        return (
          <View style={styles.listItem} key={item.ID}>
            <CheckBox
              checked={isChecked.includes(item.name) ? true : false}
              onPress={(event) => handleCheck(event, item)}
              containerStyle={styles.checkbox}
              uncheckedColor= 'rgba(51, 156, 255, 1)'
            />
            <Text 
                style={styles.text}
                onPress={() => handleClick(item)}
                >
                {item.name} <FontAwesomeIcon icon={ faChevronCircleDown } />
            </Text>
            <View>
              { isItemClicked === item.name ?
                  <Image
                    style={styles.itemImage}
                    source={{uri: item.image}}
                  />
                : null
              } 
            </View> 
          </View>
        )
      })
    )}
  }
 
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.image}
        source={require("./blue-sky.jpg")}
      >
        <View style={styles.description}>
          <Text style={styles.text}>Welcome to On The Hunt. Below you can see an example scavenger hunt! If you click
            on the name of the item it will show a picture. The picture is just a guide to help find the item and isn't an exact
            copy. Enjoy your hunt!
          </Text>
        </View>
        <View style={styles.example}>
          <Text style={styles.h2}>Example Hunt</Text>
          <View style={styles.borderLine}></View>
          <>{renderList()}</>
        </View>
      </ImageBackground>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    allHuntItems: state.setHuntListItems,
    isItemClicked: state.setItemClicked,
    isChecked: state.setChecked
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickItem: (item) => dispatch({
      type: "CLICKED",
      payload: item  
    }),
    unClickItem: () => dispatch({
      type: "UNCLICKED",
      payload: ""
    }),
    check: (item) => dispatch({
      type: "CHECK",
      payload: item
    }),
    uncheck: (item) => dispatch({
      type: "UNCHECK",
      payload: item
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)
  
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
  checkbox: {
    width: 5
  },
  text: {
    color: "rgba( 61, 85, 35, 1)",
    fontSize: 20,
    padding: 2
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  itemImage: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: "rgba(255,120,63, 1)",
    width: 200,
    height: 200,
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

