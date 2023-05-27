import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Background from './ScreenComponents/Background'
import Footer from './ScreenComponents/Footer'
import { StyleSheet } from 'react-native'
import 'expo-dev-client';
import { firebase } from '../config'
import DefaultButton from './ScreenComponents/DefaultButton'
import { fontPixel, heightPixelS } from '../global/adaptiveFunctions'
import globalStyles from '../global/globalStyles'

export default class ProfileScreen extends Component {

    render() {
        return (
            <Background>
                <View style={styles.main}>

                    <Text style={globalStyles.text}>Welcome to PCBUILDER</Text>
                    <View style={styles.infoContainer}>
                        <Text style={styles.infoText}>account email {"\n"}{firebase.auth().currentUser?.email}{"\n"}</Text>
                        <Text style={styles.infoText}>account id{"\n"}{firebase.auth().currentUser?.uid}{"\n"}</Text>
                    </View>
                    <DefaultButton
                        text={"Change password"}
                        style={styles.button}
                        textStyle={styles.buttonText}
                        onPress={() => this.props.navigation.navigate("ResetPasswordScreen")}
                    />
                    <DefaultButton
                        text={"logout"}
                        style={styles.button}
                        textStyle={styles.buttonText}
                    />
                </View>
                <Footer
                    profileSettings={true}
                    navigation={this.props.navigation}
                />
            </Background>
        )
    }
}

const styles = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        marginBottom: heightPixelS(10),
        marginTop: heightPixelS(10),
        height: heightPixelS(50),
    },
    buttonText: {
        fontSize: fontPixel(20),
    },
    infoText: {
        textAlign: 'center',
        fontFamily: 'Days',
        color: 'rgba(255,255,255,1)',
        fontSize: fontPixel(20),
    },
    infoContainer: {
        width: '100%',
        padding: heightPixelS(20),
        marginTop: heightPixelS(20),
        backgroundColor: 'rgba(28,30,37,1)',
        marginBottom: heightPixelS(20),
    },

});