import React from 'react'
import { connect } from 'react-redux'
import { Alert, StyleSheet, Text, View, ImageBackground, ScrollView } from 'react-native';
import RenderList from './Components/CreateList/RenderList'
import MyTouchableOpacity from './Components/MyTouchableOpacity'
import { putFetch, deleteFetch } from "./FetchList"

function UserHunt({
        navigation,
        isHuntTitle,
        setHuntTitle,
        isHuntListId,
        isChecked,
        isUser,
        isUserListId,
    }) {

    const renderList = () => {
        return isUser.HuntLists.map(list => {
            if (list.ID === isHuntListId) {
                setHuntTitle(list.title)
                return <RenderList array={list.HuntItems}/>
            }
        })
    }

    const handleUpdateList = () => {
        let url = "update-user-list/" + isUserListId
        let body = { CheckedItem: isChecked }
        putFetch( url, body )
        .then(navigation.navigate("My Hunts"))
    }

    const triggerDelete = () => {
        Alert.alert(
            "Are you sure you want to delete?",
            "",
            [
                {
                    text: "Yes",
                    onPress:(handleDeleteList)
                },
                {
                    text: "No",
                    onPress: () => console.log("not doing anything")
                }
            ],
            { cancelable: false }
        )
    }

    const handleDeleteList = () => {
        let url = "delete-user-list/" + isUserListId
        deleteFetch( url )
            .then(navigation.navigate("My Hunts"))
    }
    
    return (
        <ImageBackground
            style={styles.image}
            source={require("./blue-sky.jpg")}
        >
            <View style={styles.screenContainer}>
                <ScrollView 
                    style={styles.list}
                    alignItems= 'center'
                >
                    <Text style={styles.h2}>{isHuntTitle}</Text>
                    <View style={styles.borderLine}></View>                    
                    {renderList()}
                    <View style={styles.buttonContainer}>
                        <MyTouchableOpacity 
                            buttonText={"Update List"}
                            handlePress={handleUpdateList}
                        />
                        <MyTouchableOpacity 
                            buttonText={"Delete Hunt"}
                            handlePress={triggerDelete}
                        />
                    </View>
                    <MyTouchableOpacity 
                        buttonText={"Back"}
                        handlePress={() => navigation.navigate('My Hunts')}
                    />                          
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

const mapStateToProps = (state) => {
    return {
      isThemeArray: state.setThemeArray,
      isChecked: state.setChecked,
      isItemClicked: state.setItemClicked,
      isHuntTitle: state.setHuntTitle,
      isHuntListId: state.setHuntListId,
      isUserId: state.setUserId,
      isItemIds: state.setItemId,
      isHuntListTitles: state.setHuntListTitles,
      isUser: state.setUser,
      isUserListId: state.setUserListId,
    }
}
  
function mapDispatchToProps(dispatch) {
    return {     
        setItemId: (id) => dispatch({
            type: "SETITEMID",
            payload: id
        }),
        setHuntTitle: (title) => dispatch({
            type: "SETTITLE",
            payload: title
        }),
        
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserHunt);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    list: {
        backgroundColor: 'rgba(230, 243, 255, .75)',
        borderRadius: 10,
        width: "85%",
        margin: 15,
        paddingRight: 10
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
    },
    buttonContainer: {
        flexDirection: "row",
        padding: 20,
        justifyContent: "center",
    },
    h2: {
        padding: 20,
        fontSize: 28,
        color: "rgba( 61, 85, 35, 1)", 
        alignSelf: "center"
    },
    borderLine: { 
        borderBottomWidth: 2, 
        borderBottomColor: "rgba(0, 0, 0, .3)",
        marginTop: -20,
        marginBottom: 15, 
        borderStyle: "solid",
    }
})