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

function HomePage({ allHuntItems, isItemClicked, clickItem, unClickItem, isChecked, check, uncheck }) {

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
        <Formik>
          {({ values }) => (
            <View style={styles.container}>
                <Text style={styles.h2}>Example Hunt</Text>
                <View style={styles.listItemsContainer}>
                {itemArray.map(item => {
                  return (
                      <View style={styles.listItem} key={item.ID}>
                        <CheckBox
                          checked={isChecked.includes(item.name) ? true : false}
                          onPress={(event) => handleCheck(event, item)}
                          containerStyle={styles.checkbox}
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
                })}
                </View>   
          </View>
          )}
        </Formik>
      )
    }
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
          <>{renderList()}</>
        </View>
      </ImageBackground>
    </View>
  )
}

const mapStateToProps = (state) => {
  return {
    allHuntItems: state.setHuntListItems,
    isItemClicked: state.isItemClicked,
    isChecked: state.isChecked
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
    backgroundColor: 'rgba(165, 42, 42, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'orange',
    color: "white"
  },
  example: {
    flex: 3,
    backgroundColor: 'rgba(165, 42, 42, 0.75)',
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'orange',
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  h2: {
    flex: 1,
    fontSize: 28,
    color: "rgba(255, 160, 0, 1)",
    alignItems: "center"
  },
  listItemsContainer: {
    flex: 3,
    flexWrap: "wrap",
  },
  checkbox: {
    width: 10
  },
  text: {
    color: "rgba(255, 160, 0, 1)",
    fontSize: 20,
    justifyContent: "flex-start"
  },
  listItem: {
    flexDirection: "row",
    alignItems: "center",
    
  },
  itemImage: {
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'orange',
    width: 200,
    height: 200,
  },
});

