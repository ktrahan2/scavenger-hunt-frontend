import { Formik } from 'formik';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Button } from 'react-native';
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'

function HomePage({ allHuntItems, isItemClicked, clickItem, unClickItem }) {

  const handleClick = (event) => {
    if (isItemClicked !== event.target.innerText) {
      console.log("clicked")
      clickItem(event.target.innerText)
    } else {
      unClickItem()
    }
  }

  const renderList = () => {
    if (allHuntItems.length > 0) {
      let first = allHuntItems[5]  
      let second = allHuntItems[6]
      return (
        <Formik
          initialValues={{
            toggle: false,
            checked: [],
          }}
          onSubmit={values => {
            console.log(values)
          }}
        >
          {({ values, handleSubmit }) => (
            <View>
                <Text>Example Hunt</Text>
                  <View>
                    <View>
                      <View style={styles.container}>
                        <CheckBox
                          title={first.name}
                          onPress={handleClick}

                        />
                        <Text
                          onClick={handleClick}
                          >
                          {first.name}
                        </Text>
                      </View>
                      <View>
                        {/* {isItemClicked === first.name ? 
                        <img 
                          src={first.image} 
                          height="100" 
                          width="100"
                        /> : null}  */}
                      </View>
                    </View>
                    <View>
                      <View>
                        {/* <label>
                          <Field type="checkbox" name="checked" value={second.name} />
                        </label> */}
                        <Text
                          class="list-item-name"
                          onClick={handleClick}
                        >
                          {second.name}
                        </Text>
                      </View>
                      <View>
                        {/* {isItemClicked === second.name ? 
                        <img 
                          class="list-image" 
                          src={second.image} 
                          height="100" 
                          width="100"
                        /> : null}  */}
                      </View>
                    </View>
                    <View>
                      <Button
                        title="Save Hunt" 
                        onPress={handleSubmit}
                      />
                    </View>
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
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'green',
    color: "white"
  },
  example: {
    flex: 3,
    backgroundColor: 'rgba(165, 42, 42, 0.75)',
    alignItems: 'center',
    paddingBottom: 5,
    paddingTop: 5,
    paddingLeft: 10,
    paddingRight: 10,
    margin: 5,
    borderStyle: 'solid',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'green',
  },
  text: {
    color: "rgba(255, 160, 0, 1)",
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center"
  },
});

const mapStateToProps = (state) => {
  return {
    allHuntItems: state.setHuntListItems,
    isItemClicked: state.isItemClicked
  }
}

function mapDispatchToProps(dispatch) {
  return {
    clickItem: (target) => dispatch({
      type: "CLICKED",
      payload: target  
    }),
    unClickItem: () => dispatch({
      type: "UNCLICKED",
      payload: ""
    })
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
