import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Background from './ScreenComponents/Background'
import Footer from './ScreenComponents/Footer'
import { StyleSheet } from 'react-native'

export default class MenuScreen extends Component {
    render() {
        return (
            <Background>
                <View style={styles.main}></View>
                <Footer
                    search={true}
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