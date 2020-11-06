import React from 'react'
import { connect } from 'react-redux'
import { Button, StyleSheet, Text, View, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
    faChevronCircleDown
  } from '@fortawesome/free-solid-svg-icons'

function CreatedHunt({
    isThemeArray,
    isItemClicked,
    clickItem,
    unClickItem,
    navigation
    }) {

    const handleClick = ( item ) => {
        if (isItemClicked !== item.name) {
            console.log("clicked")
            clickItem(item.name)
        } else {
            unClickItem(item.name)
        }
    }
    
    const generateHuntList = () => {
        return isThemeArray.map(item => {
            return (
                <View style={styles.listItem} key={item.ID}>
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
    }

    return (
        <>
        {generateHuntList()}
        <View>
            <Button
                title="Save List"
                //onPress to save list to backend as well
                onPress={() => navigation.navigate('My Hunts')}
            />
            <Button
                title="Get a new list"
                onPress={() => navigation.navigate('On The Hunt')}
            />
        </View>
        </>
    )
}

const mapStateToProps = (state) => {
    return {
      isThemeArray: state.setThemeArray,
      isChecked: state.setChecked,
      isItemClicked: state.setItemClicked,
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
    }
  
}
  
export default connect(mapStateToProps, mapDispatchToProps)(CreatedHunt);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1
    },
    itemImage: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: 'orange',
        width: 200,
        height: 200,
      },
})