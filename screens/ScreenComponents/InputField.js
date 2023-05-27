import { Text, View, TextInput, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import globalStyles from '../../global/globalStyles'
import { fontPixel, heightPixelS, widthPixel } from '../../global/adaptiveFunctions';


export default class InputField extends React.Component {
    render() {
        return (
            <View style={[styles.textInputContainer]}>
                <Text style={[globalStyles.text, styles.textInputText]}>{this.props.title}</Text>
                <TextInput
                    {...this.props}
                    autoCorrect={false}
                    autoCapitalize='none'
                    style={[styles.textInput, this.props.style]}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    textInputContainer: {
        marginTop: heightPixelS(20),
        width: '90%',
    },
    textInputText: {
        textAlign: 'left',
        fontSize: fontPixel(15),
    },
    textInput: {
        marginTop: heightPixelS(5),
        backgroundColor: 'rgba(50,53,60,1)',
        height: heightPixelS(40),
        color: 'rgba(255,255,255,1)',
        paddingLeft: widthPixel(5),
        fontSize: fontPixel(20),
        borderRadius: 6,
    },
});