import { Formik, Form, Field } from 'formik';
import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { connect } from 'react-redux'

function HomePage({ allHuntItems }) {

  const handleClick = () => {
    console.log("clicked")
  }

  const renderList = () => {
    if (allHuntItems.length > 0) {
      let first = allHuntItems.shift()  
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
                      <label>
                        <Field type="checkbox" name="checked" value={second.name} />
                      </label>
                        <span
                          onClick={handleClick}
                        >
                          {second.name}
                        </span>
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
  }
});

const mapStateToProps = (state) => {
  return {
    allHuntItems: state.setHuntListItems
  }
}

export default connect(mapStateToProps)(HomePage);
