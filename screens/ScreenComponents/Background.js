import React, { Component } from 'react'
import { StyleSheet, Dimensions, View } from 'react-native'

export default class Background extends Component {
    render() {
        return (
            <View style={styles.bgImage}>{this.props.children}</View>
        )
    }
}

const styles = StyleSheet.create({
    bgImage: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
        backgroundColor: 'rgba(50,53,60,1)',
    },
});