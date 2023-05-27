import { StyleSheet, Image, KeyboardAvoidingView, Pressable, Text, View, Keyboard, Alert } from 'react-native'
import { fontPixel, heightPixelS, widthPixel } from '../global/adaptiveFunctions'
import globalStyles from '../global/globalStyles'
import InputField from './ScreenComponents/InputField'
import Background from './ScreenComponents/Background'
import DefaultButton from './ScreenComponents/DefaultButton'
import { firebase } from '../config'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import 'expo-dev-client';
import React from 'react'
import PasswordToggle from './ScreenComponents/PasswordToggle'

console.warn = function () { }

export default class UserScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
            confirmPasswordText: "",
            passwordText: "",
            emailText: "",
            passwordSelect: false,
            confirmPasswordSelect: false,
            emailSelect: false,
            inputError: false,
            errorMessage: "",
        };
    }

    componentDidMount() {
        console.ignoreLogs = true;
        GoogleSignin.configure({
            webClientId: '428376461010-8pql8ftnvopmnujra24kprs855j2cs9h.apps.googleusercontent.com',
        });
    }

    onGoogleButtonPress = async () => {
        try {
            await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
            const { idToken } = await GoogleSignin.signIn();
            const googleCredential = auth.GoogleAuthProvider.credential(idToken);
            auth().signInWithCredential(googleCredential)
                .then((user) => {
                    auth().currentUser.googleAcc = true;
                    this.setState({
                        emailText: auth().currentUser.email,
                        passwordText: "",
                    });
                    this.loginToDbAndNavigate();
                }).catch((error) => console.log(error));
        }
        catch (error) {
            this.setState({
                inputError: true,
                errorMessage: 'Unknown error'
            });
        }
    }

    validateEmail = () => {
        let reg = "^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$";
        return String(this.state.emailText).match(reg);
    };

    async handleSignButton() {
        Keyboard.dismiss();
        this.setState({
            passwordSelect: false,
            confirmPasswordSelect: false,
            emailSelect: false,
            inputError: false,
            errorMessage: '',
        });

        if (this.state.passwordText === "" || (this.state.confirmPasswordText === "" && this.props.signUp) || this.state.emailText === "") {
            this.setState({
                passwordSelect: this.state.passwordText === "",
                confirmPasswordSelect: this.props.signUp ? this.state.confirmPasswordText === "" : false,
                emailSelect: this.state.emailText === "",
                inputError: true,
                errorMessage: 'Fill in all the fields',
            });
            return;
        }

        if (!this.validateEmail()) {
            this.setState({
                emailSelect: true,
                inputError: true,
                errorMessage: 'Your email is invalid',
            })
            return;
        }

        if (this.props.signUp && this.state.passwordText.length < 6) {
            this.setState({
                passwordSelect: true,
                inputError: true,
                errorMessage: 'Password should be at least 6 characters',
            })
            return;
        }

        if (this.props.signUp && this.state.passwordText !== this.state.confirmPasswordText) {
            this.setState({
                passwordSelect: true,
                confirmPasswordSelect: true,
                inputError: true,
                errorMessage: 'Passwords are not same',
            })
            return;
        }
        this.props.signUp ? await this.signUp() : await this.signIn();
    }

    async signUp() {
        await firebase.auth().createUserWithEmailAndPassword(this.state.emailText, this.state.passwordText).catch(error => {
            if (error.code === 'auth/email-already-in-use') {
                this.setState({
                    inputError: true,
                    errorMessage: 'User with this email already exists'
                });
                return;
            }
            else {
                this.setState({
                    inputError: true,
                    errorMessage: 'Unknown error'
                });
                return;
            }
        });
        await firebase.auth().currentUser.sendEmailVerification().catch(error => console.log(error));
        await firebase.auth().signOut().catch(error => { console.log(error); });
        Alert.alert("Check your email", "Please verify your email. Check out link in your inbox");
        this.props.navigation.navigate("LogInScreen")
    }

    async regUserToDb() {
        await fetch("http://192.168.0.100:9090/PCBuilder_war_exploded/user/register",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    requestType: "componentRequest",
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    "login": this.state.emailText,
                    "password": this.state.passwordText,
                    "googleAccount": auth().currentUser.googleAcc,
                })
            }).then(response => {
                if (response.ok) {
                    return;
                }
                if (response.status !== 999) {
                    console.log("some error");
                }
                switch (response.headers.get("errorType")) {
                    case "userExists": {
                        this.setState({
                            inputError: true,
                            errorMessage: 'user with this login is exists'
                        });
                        return;
                    }
                    case "invalidLogin", "shortPassword": {
                        console.log("incorrectData???")
                        return;
                    }
                    case "noConnection": {
                        this.setState({
                            inputError: true,
                            errorMessage: 'server is not responding, try again later'
                        });
                        return;
                    }
                }
            }
            ).catch(error => console.log(error));
    }

    async loginToDbAndNavigate() {
        let isExists = true;
        await fetch("http://192.168.0.100:9090/PCBuilder_war_exploded/user/login",
            {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    requestType: "componentRequest",
                    'Access-Control-Allow-Origin': '*',
                },
                body: JSON.stringify({
                    "login": this.state.emailText,
                    "password": this.state.passwordText,
                    "googleAccount": auth().currentUser.googleAcc,
                })
            }).then(response => {
                if (!response.ok) {
                    if (response.status !== 999) {
                        console.log("some error");
                    }
                    switch (response.headers.get("errorType")) {
                        case "userNotFound": {
                            isExists = false;
                            break;
                        }
                        case "incorrectPassword": {
                            this.setState({
                                inputError: true,
                                errorMessage: 'unexpected error '
                            });
                            return;
                        }
                        case "noConnection": {
                            this.setState({
                                inputError: true,
                                errorMessage: 'server is not responding, try again later'
                            });
                            return;
                        }
                    }
                }
            })
            .catch(error => {
                console.log(error);
                return;
            }).then(() => {
                if (!isExists) {
                    this.regUserToDb().then(() => this.props.navigation.navigate("ProfileScreen"));
                }
                else {
                    this.props.navigation.navigate("ProfileScreen");
                }
            });
    }

    async signIn() {
        await firebase.auth().signInWithEmailAndPassword(this.state.emailText, this.state.passwordText)
            .catch((error) => {
                if (error.code === "auth/wrong-password") {
                    this.setState({
                        inputError: true,
                        errorMessage: 'incorrect password'
                    });
                    return;
                }
            }).then(async () => {
                if (firebase.auth().currentUser.emailVerified) {
                    auth().currentUser.googleAcc = false;
                    this.loginToDbAndNavigate();
                }
                else {
                    alert("Please, verify your email");
                }
            });
    }

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
                    <Text style={[globalStyles.text, styles.titleText]}>{(this.props.signUp ? "Sign up" : "Sign in")}{'\n'}PCBuilder</Text>
                    <View style={styles.signUpContainer}>
                        <View style={styles.inputContainer}>
                            <InputField
                                title={'email'}
                                style={this.state.inputError && this.state.emailSelect ? styles.error : {}}
                                onChangeText={(text) => this.setState({
                                    inputError: false,
                                    emailText: text.trim()
                                })}
                            />
                            <PasswordToggle
                                title={'password'}
                                onChangeText={(text) => { this.setState({ passwordText: text, inputError: false }) }}
                                maxLength={15}
                                style={this.state.passwordSelect && this.state.inputError ? styles.error : {}}
                            />
                            {
                                this.props.signUp &&
                                <PasswordToggle
                                    title={'confirm password'}
                                    maxLength={15}
                                    style={this.state.inputError && this.state.confirmPasswordSelect ? styles.error : {}}
                                    onChangeText={(text) => this.setState({
                                        inputError: false,
                                        confirmPasswordText: text
                                    })}
                                />
                            }
                        </View>
                        <DefaultButton
                            style={[styles.button]}
                            text={this.props.signUp ? 'Create new account' : "sign in"}
                            textStyle={styles.textStyle}
                            onPress={() => this.handleSignButton()}
                        />
                        <Pressable style={[styles.button, styles.googleButton]}
                            onPress={() => this.onGoogleButtonPress()}
                        >
                            <Image
                                style={styles.googleImage}
                                source={require("../assets/img/googleLogo.png")}
                                contentFit="fill"
                            />
                            <Text style={[globalStyles.text, styles.googleButtonText]}>
                                Continue with google
                            </Text>
                        </Pressable>
                        {
                            this.props.signUp &&
                            <View>
                                <Text style={[globalStyles.text, styles.textStyle]}>Or</Text>
                                <DefaultButton
                                    style={[styles.button]}
                                    text={'Sign in'}
                                    textStyle={styles.textStyle}
                                    onPress={() => this.props.navigation.navigate("LogInScreen")}
                                />
                            </View>
                        }
                        {
                            !this.props.signUp &&
                            <View style={styles.utilsContainer}>
                                <Pressable
                                    onPress={() => this.props.navigation.navigate("SignUpScreen")}
                                ><Text style={styles.utilsText}>Register</Text></Pressable>
                                <Pressable onPress={() => this.props.navigation.navigate("ResetPasswordScreen")}><Text style={styles.utilsText}>Password reset</Text></Pressable>
                            </View>
                        }
                    </View>
                </KeyboardAvoidingView>
            </Background>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: heightPixelS(25),
    },
    errorContainer: {
        borderColor: 'rgba(180,64,64,1)',
        borderWidth: 2,
        backgroundColor: 'rgba(24,26,33,1)',
        width: widthPixel(330),
        borderRadius: 6,
    },
    errorText: {
        marginTop: heightPixelS(10),
        marginBottom: heightPixelS(10),
        fontSize: fontPixel(15),
        fontFamily: '',
        textAlign: 'left',
        padding: widthPixel(5),
    },

    titleText: {
        fontSize: fontPixel(50),
        fontFamily: 'Days'
    },
    inputContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: heightPixelS(10),
    },
    signUpContainer: {
        marginTop: heightPixelS(10),
        backgroundColor: 'rgba(28,30,37,1)',
        width: widthPixel(360),
        alignItems: 'center',
        paddingBottom: heightPixelS(10),
    },
    button: {
        height: heightPixelS(40),
        width: widthPixel(300),
    },
    googleButton: {
        flexDirection: 'row',
        marginTop: heightPixelS(10),
        borderRadius: 10,
        alignItems: 'center',
        backgroundColor: 'rgba(50,53,60,1)'
    },
    googleButtonText: {
        fontSize: fontPixel(15),
    },
    googleImage: {
        marginRight: widthPixel(10),
        marginLeft: widthPixel(5),
        height: 0.9 * heightPixelS(40),
        width: 0.9 * heightPixelS(40),
    },
    textStyle: {
        fontSize: fontPixel(20),
        padding: heightPixelS(10),
    },
    error: {
        borderColor: 'rgba(180,64,64,1)',
        borderWidth: 1,
    },
    utilsContainer: {
        marginTop: heightPixelS(25),
        flexDirection: 'row',
        width: widthPixel(300),
        justifyContent: 'space-between',
        alignItems: 'center',
        height: heightPixelS(50),
    },
    utilsText: {
        color: 'rgba(54, 146, 231, 1)',
        fontSize: fontPixel(18),
    },
});