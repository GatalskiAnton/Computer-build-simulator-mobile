import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import { TextInput } from 'react-native';
import { fontPixel, heightPixelS, widthPixel } from '../../global/adaptiveFunctions';
import globalStyles from '../../global/globalStyles'
import { Pressable } from 'react-native';
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons';


export default class SearchComponentBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iconName: 'search',
            sizeOfIcon: 0,
        }
    }

    render() {
        return (
            <View style={[styles.textInputContainer]}>
                <Text style={[globalStyles.text, styles.textInputText]}>{this.props.title}</Text>
                <View style={[styles.inputContainer, styles.textInput, this.props.style]} onLayout={(event) => this.setState({
                    sizeOfIcon: event.nativeEvent.layout.height,
                })}>
                    <TextInput
                        autoCorrect={false}
                        autoCapitalize='none'
                        onChangeText={(text) => { this.props.onChangeText(text) }}
                        style={[{ flex: 1 }, styles.text]}
                    />
                    <Pressable onPress={() => this.props.searchFunction()
                    }
                        style={{ justifyContent: 'center', alignItems: 'center', paddingRight: widthPixel(5) }}
                    ><EvilIcons
                            name={this.state.iconName}
                            size={this.state.sizeOfIcon * 0.8}
                            color={'white'}
                        /></Pressable>
                </View>
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
        paddingLeft: widthPixel(5),
        fontSize: fontPixel(20),
        borderRadius: 6,
        width: '100%',
    },
    text: {
        color: 'white',
        fontSize: fontPixel(20),
    },
    inputContainer: {
        flexDirection: 'row',
    },
    icon: {

    },
});