import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { connect } from 'react-redux'
import MyTouchableOpacity from '../MyTouchableOpacity'
import { getFetch } from "../../utility/FetchList"
import blueSky from '../../assets/blue-sky.jpg'

function MyHunts({
        setHuntListId,
        navigation,
        isUser,
        isUserId,
        setCheckedGroup,
        setUserListId,

    }) {

    const handlePress = (id) => {
        getUserLists(id)
        setHuntListId(id)
        navigation.navigate("User Hunt")
    }

    const getUserLists = (id) => {
        let huntListId = id
        let url = "user-lists/" + isUserId + "/" + huntListId
        getFetch( url )
            .then(data => {
                    setUserListId(data[0].ID)
                    setCheckedGroup([...data[0].CheckedItem])
            })
    }

    const renderHuntListTitles = () => {
        if (isUser.ID != 0 && isUser.HuntLists != null) {
        return (
            isUser.HuntLists.map((list, index) => { 
                return (
                    <MyTouchableOpacity
                        key={list.title+index} 
                        buttonText={list.title}
                        handlePress={() => handlePress(list.ID)}
                    />
                )
            })
        )
        }
    }

    return (
        <ImageBackground
            style={styles.image}
            source={blueSky}
        >
            <View style={styles.screenContainer}>
                <ScrollView 
                    style={styles.form}
                    justifyContent= "flex-start"
                    alignItems= "center"
                >
                    <Text style={styles.h2}>Your Hunts</Text>
                    <View style={styles.borderLine}></View>
                    <Text style={styles.text}>
                        Select or create a list to get started!
                    </Text>
                    {renderHuntListTitles()}
                </ScrollView>
            </View>
        </ImageBackground>
    )
}

const mapStateToProps = (state) => {
    return {
        isUser: state.setUser,
        isUserId: state.setUserId
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setHuntListId: (id) => dispatch({
            type: "SETID",
            payload: id
        }),
        setUserListId: (id) => dispatch({
            type: "SETUSERLISTID",
            payload: id
        }),
        setCheckedGroup: (array) => dispatch({
            type: "CHECKGROUP",
            payload: array
        }),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(MyHunts);

const styles = StyleSheet.create({
    screenContainer: {
        flex: 1,
        alignItems: "center",
        justifyContent: 'flex-start',
    },
    image: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "center"
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
        marginBottom: 20, 
        borderStyle: "solid"
    },
    form: {
        backgroundColor: 'rgba(230, 243, 255, .75)',
        borderRadius: 10,
        height: "100%",
        width: "75%",
        margin: 15 
    },
    text: {
        color: "rgba( 61, 85, 35, 1)",
        fontSize: 18,
        marginBottom: 20
    }
})