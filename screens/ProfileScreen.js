import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Background from './ScreenComponents/Background'
import Footer from './ScreenComponents/Footer'
import { StyleSheet } from 'react-native'
import 'expo-dev-client';
import { firebase } from '../config'
import DefaultButton from './ScreenComponents/DefaultButton'
import { fontPixel, heightPixelS, widthPixel } from '../global/adaptiveFunctions'
import globalStyles from '../global/globalStyles'
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
export default class ProfileScreen extends Component {


    async logout() {
        await auth().signOut().then(async () => {
            await GoogleSignin.signOut().then(this.props.navigation.navigate("EnterScreen")).catch(error => console.log(error));
        }).catch(error => console.log(error));

    }

    componentDidMount() {
        console.ignoreLogs = true;
        GoogleSignin.configure({
            webClientId: '428376461010-8pql8ftnvopmnujra24kprs855j2cs9h.apps.googleusercontent.com',
        });
    }


    render() {
        return (
            <Background>
                <View style={styles.main}>
                    <Text style={globalStyles.text}>Welcome to PCBUILDER</Text>
                    <View style={styles.infoContainer}>
                        {
                            auth().currentUser.email == null ? <Text style={styles.infoText}>guest</Text> :
                                <View>
                                    <Text style={styles.infoText}>account email {"\n"}{auth().currentUser.email}{"\n"}</Text>
                                    <Text style={styles.infoText}>account id{"\n"}{auth().currentUser.uid}{"\n"}</Text>
                                </View>

                        }
                    </View>
                    {
                        auth().currentUser.email == null ?
                            <View>
                                <DefaultButton
                                    text={"sign in"}
                                    style={styles.button}
                                    textStyle={styles.buttonText}
                                    onPress={() => this.props.navigation.navigate("LogInScreen")}
                                />
                                <DefaultButton
                                    text={"sign up"}
                                    style={styles.button}
                                    textStyle={styles.buttonText}
                                    onPress={() => this.props.navigation.navigate("SignUpScreen")}
                                />
                            </View> :
                            <View>
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
                                    onPress={() => this.logout()}
                                />
                            </View>

                    }

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
        width: widthPixel(300),
    },
    infoContainer: {
        width: '100%',
        padding: heightPixelS(20),
        marginTop: heightPixelS(20),
        backgroundColor: 'rgba(28,30,37,1)',
        marginBottom: heightPixelS(20),
    },

});