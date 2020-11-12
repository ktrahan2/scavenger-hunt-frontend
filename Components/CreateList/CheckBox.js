import React from 'react'
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import { StyleSheet } from 'react-native';

function myCheckBox({ 
        item, 
        isChecked,
        uncheck,
        check   
    }) {

    const handleCheck = ( event, item ) => {
        event.preventDefault()
        if (isChecked.includes(item.name)) {
          uncheck(item.name)
        } else {
          check(item.name)
        }
    }

    return (
        <CheckBox
            checked={isChecked.includes(item.name) ? true : false}
            onPress={(event) => handleCheck(event, item)}
            containerStyle={styles.checkbox}
            uncheckedColor= 'rgba(51, 156, 255, 1)'
        />
    )
}

const mapStateToProps = (state) => {
    return {
      isChecked: state.setChecked
    }
}

function mapDispatchToProps(dispatch) {
    return {
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

export default connect(mapStateToProps, mapDispatchToProps)(myCheckBox)

const styles = StyleSheet.create({

    checkbox: {
        width: 5,
    },

})