import React from 'react'
import MyCheckBox from './CheckBox'
import ListItem from './ListItem'
import { StyleSheet, View } from 'react-native';


export default function RenderList({ array }) {
    
    const renderList = (array) => {
        return (
            array.map(item => {
                return (
                    <View style={styles.listItem} key={item.ID}>
                        <MyCheckBox item={item}/>
                        <ListItem item={item}/> 
                    </View>
                )
            })
        )
    }

    return (
        <>
        {renderList(array)}
        </>
    )

}

const styles = StyleSheet.create({
    listItem: {
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        justifyContent: "center",
        width: "85%"
    },
})
