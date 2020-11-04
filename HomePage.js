import { Formik, Form, Field } from 'formik';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import { connect } from 'react-redux'

function HomePage({ allHuntItems, isItemClicked, clickItem, unClickItem }) {

  const handleClick = (event) => {
    if (isItemClicked !== event.target.innerText) {
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
          {({ values }) => (
            <Form>
                <h1 id="checkbox-group">Example Hunt</h1>
                  <div class="example-container" role="group" aria-labelledby="checkbox-group">
                    <div class="list-item">
                      <div>
                        <label>
                          <Field type="checkbox" name="checked" value={first.name} />
                        </label>
                        <span
                          class="list-item-name"
                          onClick={handleClick}
                          >
                          {first.name}
                        </span>
                      </div>
                      <div>
                        {isItemClicked === first.name ? 
                        <img 
                          class="list-image" 
                          src={first.image} 
                          height="100" 
                          width="100"
                        /> : null} 
                      </div>
                    </div>
                    <div class="list-item">
                      <div>
                        <label>
                          <Field type="checkbox" name="checked" value={second.name} />
                        </label>
                        <span
                          class="list-item-name"
                          onClick={handleClick}
                        >
                          {second.name}
                        </span>
                      </div>
                      <div>
                        {isItemClicked === second.name ? 
                        <img 
                          class="list-image" 
                          src={second.image} 
                          height="100" 
                          width="100"
                        /> : null} 
                      </div>
                    </div>
                    <div class="button-container">
                      <button class="button" type="submit">Save Hunt</button>
                    </div>
                  </div>
              </Form>
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
    backgroundColor: 'rgb(0, 153, 0)',
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
