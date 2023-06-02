import { StyleSheet, Text, View } from 'react-native'
import React, { Component } from 'react'
import Footer from './ScreenComponents/Footer'
import Background from './ScreenComponents/Background'
import { IP } from '../global/globalVars';
import auth from '@react-native-firebase/auth';

export default class ShoppingcartScreen extends Component {
    componentDidMount() {
        this.getPC();
    }

    async getPC() {
        console.log(123)
        await fetch("http://" + IP + ":9090/PCBuilder_war_exploded/component/getPC", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "login": auth().currentUser.email == null ? "guest" : auth().currentUser.email,
                "componentName": this.props.component,
            })
        }).then(response => {
            if (!response.ok) {
                console.log(response.status);
                console.log(response);
                console.log(response.headers.get("errorType"))
                return;
            }
            else {
            }
        }).then(json => {
        })
            .catch(error => {
                console.log(error);
            }).finally(this.setState({
                isLoading: false,
            }));
    }

    render() {
        return (
            <Background>
                <View style={styles.main}>

                </View>
                <Footer
                    shoppingcart={true}
                    navigation={this.props.navigation}
                />
            </Background>

        )
    }
}


const styles = StyleSheet.create({
    main: {
        flex: 1,
    }
});