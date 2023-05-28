import { Text, View } from 'react-native'
import React, { Component } from 'react'
import Background from './ScreenComponents/Background'
import Footer from './ScreenComponents/Footer'
import { StyleSheet } from 'react-native'
import DefaultButton from './ScreenComponents/DefaultButton'
import { fontPixel, heightPixelS, widthPixel } from '../global/adaptiveFunctions'
import globalStyle from '../global/globalStyles';
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import InputField from './ScreenComponents/InputField'

export default class MenuScreen extends Component {
    render() {
        return (
            <Background>
                <View style={styles.main}></View>
                <Text style={[globalStyle.text, styles.textContainer]}>Select {"\n"}component</Text>
                <ScrollView style={styles.buttonsContainer}
                    contentContainerStyle={{ alignItems: 'center' }}
                >
                    <DefaultButton
                        text="CPU"
                        textStyle={styles.buttonText}
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate("SelectCPUScreen")}
                    />
                    <DefaultButton
                        text="Motherboard"
                        textStyle={styles.buttonText}
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate("SelectMotherboardScreen")}
                    />
                    <DefaultButton
                        text="Cooler"
                        textStyle={styles.buttonText}
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate("SelectCoolerScreen")}
                    />
                    <DefaultButton
                        text="Power supply"
                        textStyle={styles.buttonText}
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate("SelectPowerSupplyScreen")}
                    />
                    <DefaultButton
                        text="RAM"
                        textStyle={styles.buttonText}
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate("SelectRAMScreen")}
                    />
                    <DefaultButton
                        text="SSD"
                        textStyle={styles.buttonText}
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate("SelectSSDScreen")}
                    />
                    <DefaultButton
                        text="HDD"
                        textStyle={styles.buttonText}
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate("SelectHDDScreen")}
                    />
                    <DefaultButton
                        text="GPU"
                        textStyle={styles.buttonText}
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate("SelectCGUScreen")}
                    />
                    <DefaultButton
                        text="PC case"
                        textStyle={styles.buttonText}
                        style={styles.button}
                        onPress={() => this.props.navigation.navigate("SelectPCCaseScreen")}
                    />
                </ScrollView>

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
    },
    buttonsContainer: {
        width: "100%",
        paddingBottom: heightPixelS(15),
    },
    button: {
        height: heightPixelS(60),
        marginTop: heightPixelS(15),
    },
    buttonText: {
        fontSize: fontPixel(27),
    },
    textContainer: {
        marginTop: heightPixelS(15),
    },
});