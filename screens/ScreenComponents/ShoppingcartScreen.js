import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Background from './Background'
import Footer from './Footer'

export default class ShoppingcartScreen extends Component {
    render() {
        return (
            <Background>
                <View style={{ flex: 1 }}></View>
                <Footer
                    shoppingcart={true}
                    navigation={this.props.navigation}
                />
            </Background>
        )
    }
}