
import React, { Component } from 'react'
import Background from './ScreenComponents/Background'
import DefaultButton from './ScreenComponents/DefaultButton'
import { StyleSheet, Text } from 'react-native'
import { fontPixel, heightPixelS } from '../global/adaptiveFunctions'
import globalStyles from '../global/globalStyles';
import { StatusBar } from 'react-native'
import auth from '@react-native-firebase/auth';

export default class EnterScreen extends React.Component {

    componentDidMount() {
        StatusBar.setBarStyle('light-content', true);
        StatusBar.setBackgroundColor("rgba(50,53,60,1)")
        if (auth().currentUser != null) {
            this.props.navigation.navigate("ProfileScreen");
        }
    }

    async handleGuestButton() {
        await auth().signInAnonymously().then(() => this.props.navigation.navigate("ProfileScreen")).catch(error => console.log(error));
    }

    render() {
        return (
            <Background>
                <DefaultButton
                    text={"Sign up free"}
                    onPress={() => this.props.navigation.navigate("SignUpScreen")}
                    style={styles.button}
                    textStyle={styles.buttonText}
                />
                <DefaultButton
                    text={"Continue as guest"}
                    onPress={() => this.handleGuestButton()}
                    style={styles.button}
                    textStyle={styles.buttonText}
                />
                <Text style={[globalStyles.text, styles.text]}>Already have an account?</Text>
                <DefaultButton
                    text={"Sign in"}
                    onPress={() => this.props.navigation.navigate("LogInScreen")}
                    style={styles.button}
                    textStyle={styles.buttonText}
                />
            </Background>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        marginTop: heightPixelS(10),
    },
    buttonText: {
        fontSize: fontPixel(30),
    },
    text: {
        marginTop: heightPixelS(60),
        fontSize: fontPixel(20),
    },
});