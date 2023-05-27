import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import Background from './ScreenComponents/Background'
import InputField from './ScreenComponents/InputField'
import { fontPixel, heightPixelS, widthPixel } from '../global/adaptiveFunctions'
import globalStyles from '../global/globalStyles'
import DefaultButton from './ScreenComponents/DefaultButton'
import { KeyboardAvoidingView } from 'react-native'
import { resetPassword } from '../global/globalFuntions'
import auth from '@react-native-firebase/auth';

export default class ResetPasswordScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            emailText: '',
            inputError: false,
            errorMessage: '',
        }
    }

    async tryResetPassword() {
        if (this.state.emailText === '') {
            this.setState({
                inputError: true,
                errorMessage: 'Fill in all the fields',
            });
            return;
        }
        if (!this.validateEmail()) {
            this.setState({
                inputError: true,
                errorMessage: 'Your email is invalid',
            })
            return;
        }
        console.log(auth().currentUser.googleAcc)
        if (auth().currentUser.googleAcc) {
            this.setState({
                inputError: true,
                errorMessage: 'can\'t change password of google signed user',
            })
            return;
        }
        await resetPassword(this.state.emailText.trim(), this.props.navigation)
            .catch((error) => {
                if (error.code === "auth/user-not-found") {
                    this.setState({
                        inputError: true,
                        errorMessage: 'User with email ' + this.state.emailText + ' not found',
                    });
                }
            });
    }

    validateEmail = () => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
        return reg.test(this.state.emailText);
    };

    render() {
        return (
            <Background>
                <KeyboardAvoidingView
                    behavior={Platform.OS === "ios" ? "padding" : "height"}
                    style={styles.container}
                >
                    {
                        this.state.inputError &&
                        <View style={styles.errorContainer}>
                            <Text style={[globalStyles.text, styles.errorText]}>{this.state.errorMessage}</Text>
                        </View>
                    }
                    <Text style={[globalStyles.text, styles.titleText]}>RESET PASWWORD</Text>
                    <Text style={styles.text}>Please, enter your email</Text>
                    <View style={styles.inputContainer}>
                        <InputField
                            title={'Email'}
                            style={[styles.inputField, this.state.inputError ? styles.error : {}]}
                            onChangeText={(text) => this.setState({ emailText: text.trim(), inputError: false, })}
                        />
                        <DefaultButton
                            text={"continue"}
                            style={styles.button}
                            textStyle={styles.buttonText}
                            onPress={() => this.tryResetPassword()}
                        />
                    </View>
                </KeyboardAvoidingView>
            </Background>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: widthPixel(360),
        backgroundColor: 'rgba(28,30,37,1)',
        alignItems: 'center'
    },
    inputField: {
        width: '100%',
        marginBottom: heightPixelS(20),
        marginTop: heightPixelS(10),
    },
    titleText: {
        margin: heightPixelS(10),
        fontSize: 28,
    },
    text: {
        margin: heightPixelS(10),
        color: 'white',
        fontFamily: 'Days',
        fontSize: fontPixel(20),
    },
    buttonText: {
        fontSize: fontPixel(25),
    },
    button: {
        height: heightPixelS(40),
        marginBottom: heightPixelS(20),
    },
    errorContainer: {
        borderColor: 'rgba(180,64,64,1)',
        borderWidth: 3,
        backgroundColor: 'rgba(24,26,33,1)',
        width: widthPixel(330),
        minHeight: heightPixelS(60),
        borderRadius: 6,
    },
    errorText: {
        fontSize: fontPixel(15),
        fontFamily: '',
        textAlign: 'left',
        padding: widthPixel(5),
    },
    error: {
        borderColor: 'rgba(180,64,64,1)',
        borderWidth: 1,
    }
});