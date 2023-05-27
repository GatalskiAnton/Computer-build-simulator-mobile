import React from 'react';
import { Text, StatusBar } from 'react-native';
import globalStyles from '../global/globalStyles';
import Background from './ScreenComponents/Background'
import { StyleSheet } from 'react-native';
import { fontPixelS, heightPixelS } from '../global/adaptiveFunctions';
import { View } from 'react-native';
import DefaultButton from './ScreenComponents/DefaultButton';

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        StatusBar.setBarStyle('light-content', true);
        StatusBar.setBackgroundColor("rgba(50,53,60,1)")
    }

    render() {
        return (
            <Background source={require("../assets/img/background.png")}>
                <View style={styles.container}>
                    <Text style={[globalStyles.text, styles.title]}>PCBuilder</Text>
                </View>
                <View style={styles.buttonContainer}>
                    <DefaultButton
                        text={"START"}
                        onPress={() => this.props.navigation.navigate("EnterScreen")}
                    />
                </View>
            </Background>
        );
    };
};

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        justifyContent: 'flex-start',
    },
    buttonContainer: {
        flex: 0.5,
    },
    title: {
        fontFamily: 'Days',
        marginTop: heightPixelS(100),
        fontSize: fontPixelS(60),
    }
});