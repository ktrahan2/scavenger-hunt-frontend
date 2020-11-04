import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, Image } from 'react-native';
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
  faCheckCircle,
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

  const handleCheck = ( item ) => {
    if (isChecked.includes(item.name)) {
      uncheck(item.name)
    } else {
      check(item.name)
      console.log(isChecked)
    }
  }

  const renderList = () => {
    if (allHuntItems.length > 0) {
      let first = allHuntItems[5]  
      let second = allHuntItems[6]
      let itemArray = [first, second]
      return (
        <Formik
          initialValues={{
            toggle: false,
            checked: [],
          }}
        >
          {({ values }) => (
            <View>
                <Text style={styles.h2}>Example Hunt</Text>
                {itemArray.map(item => {
                  return (
                    <View key={item.ID}>
                      <CheckBox
                        
                        checked={isChecked.includes(item.name) ? true : false}
                        onIconPress={handleCheck(item)}
                        containerStyle={styles.checkbox}
                      />
                      <Text
                          style={styles.text}
                          onPress={() => handleClick(item)}
                          >
                          {item.name} <FontAwesomeIcon icon={ faChevronCircleDown } />
                      </Text>
                      { isItemClicked === item.name ?
                        <View style={styles.itemImage}> 
                          <Image
                            style={{height: 199, width: 199, borderRadius: 7}}
                            source={{uri: item.image}}
                          />
                        </View>
                        : null
                      }  
                    </View>
                  )
                 })}
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
          <Text style={styles.text}>{renderList()}</Text>
        </View>
      </ImageBackground>
    </View>
  )
}
  
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
    justifyContent: "center",
    backgroundColor: 'rgba(165, 42, 42, 0.75)',
    alignItems: 'center',
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
  listitem: {
    flex: 1,

  },
  text: {
    color: "rgba(255, 160, 0, 1)",
    fontSize: 20,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
  h2: {
    fontSize: 28,
    
    color: "rgba(255, 160, 0, 1)",
  },
  itemImage: {
    borderStyle: 'solid',
    borderWidth: 3,
    borderRadius: 10,
    borderColor: 'orange',
    width: 205,
    height: 205

  },
  checkbox: {
    width: 10
  }
});

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
    check: (item) => ({
      type: "CHECK",
      payload: item
    }),
    uncheck: (item) => ({
      type: "UNCHECK",
      payload: item
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage)