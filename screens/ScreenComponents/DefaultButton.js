import { Text } from 'react-native'
import React, { Component } from 'react'
import { Pressable, View } from 'react-native'
import { StyleSheet } from 'react-native'
import globalStyles from '../../global/globalStyles';
import { heightPixelS, widthPixel } from '../../global/adaptiveFunctions'
import Svg, { Defs, Rect, LinearGradient, Stop, Ellipse } from 'react-native-svg';


export default class DefaultButton extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={[styles.container, this.props.style]}>
                <Svg height='100%' width="100%" style={StyleSheet.absoluteFillObject}
                >
                    <Defs>
                        <LinearGradient id="grad" x1='0%' y1="50%" x2="100%" y2="50%"
                        >
                            <Stop offset="0" stopColor={"rgba(6, 191, 255, 1)"} />
                            <Stop offset="1" stopColor={"rgba(45, 115, 255, 1)"} />
                        </LinearGradient>
                    </Defs>

                    <Rect width="100%" height="100%" fill="url(#grad)" rx="6" ry="6"
                    />
                </Svg>
                <Pressable onPress={this.props.onPress}
                >
                    <Text style={[globalStyles.text, this.props.textStyle]}>{this.props.text}</Text>
                </Pressable>
            </View>

        )
    }
}


const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        width: widthPixel(300),
        height: heightPixelS(75),
    },
});