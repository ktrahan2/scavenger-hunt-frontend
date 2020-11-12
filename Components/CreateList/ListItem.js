import React from 'react'
import { connect } from 'react-redux'
import { Text, StyleSheet, Image, View } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { 
    faChevronCircleDown
  } from '@fortawesome/free-solid-svg-icons'

function ListItem({
    item,
    clickItem,
    unClickItem,
    isItemClicked
    }) {    

    const handleClick = ( item ) => {
        if (isItemClicked !== item.name) {
          clickItem(item.name)
        } else {
          unClickItem(item.name)
        }
    }

    return (
        <>
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
        </>
    )
}

const mapStateToProps = (state) => {
    return {
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
        })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListItem)

const styles = StyleSheet.create({
    text: {
        color: "rgba( 61, 85, 35, 1)",
        fontSize: 20,
        padding: 2
    },
    itemImage: {
        borderWidth: 3,
        borderRadius: 10,
        borderColor: "rgba(255,120,63, 1)",
        width: 200,
        height: 200,
    },
})