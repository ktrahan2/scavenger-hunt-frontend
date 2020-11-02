import { Formik, Form, Field } from 'formik';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
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
                  <div role="group" aria-labelledby="checkbox-group">
                    <div>
                      <div>
                        <label>
                          <Field type="checkbox" name="checked" value={first.name} />
                        </label>
                        <span
                          onClick={handleClick}
                          >
                          {first.name}
                        </span>
                      </div>
                      <div>
                        {isItemClicked === first.name ? 
                        <img src={first.image} height="100" width="100"/> : null} 
                      </div>
                    </div>
                      <div>
                        <div>
                          <label>
                            <Field type="checkbox" name="checked" value={second.name} />
                          </label>
                          <span
                            onClick={handleClick}
                          >
                            {second.name}
                          </span>
                        </div>
                        <div>
                          {isItemClicked === second.name ? 
                          <img src={second.image} height="100" width="100"/> : null} 
                        </div>
                    </div>
                    <button type="submit">Submit</button>
                  </div>
              </Form>
          )}
        </Formik>
      )
    }
  }
 
    
      return (
        <View style={styles.container}>
          <View style={styles.description}>
            <Text>Welcome to On The Hunt. Below you can see an example of the scavenger hunts generated for you! If you click
              on the name of the item it will show a picture. The picture is just a guide to finding the item and isn't an exact
              copy. Enjoy your hunt!
            </Text>
          </View>
          <View style={styles.example}>
            <Text>{renderList()}</Text>
          </View>
        </View>
      )
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  description: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  example: {
    flex: 2,
    justifyContent: 'flex-start',
  },
  exampleLi: {
    flex: 1,
  }
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
