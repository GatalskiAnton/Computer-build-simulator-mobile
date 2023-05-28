import { Text, View } from 'react-native'
import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { StatusBar } from 'react-native'
import { AntDesign, Entypo, Feather, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { heightPixelS } from '../../global/adaptiveFunctions';

export default class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            height: heightPixelS(30),
        }
    }

    componentDidMount() {
        StatusBar.setBarStyle('light-content', true);
        StatusBar.setBackgroundColor("rgba(50,53,60,1)")
    }

    render() {
        return (
            <View style={styles.footer}
            >
                <Pressable style={styles.footerItem}
                    onPress={() => this.props.navigation.navigate("ProfileScreen")}
                >
                    <MaterialCommunityIcons
                        name={"account-settings"}
                        color={this.props.profileSettings ? "rgba(200,200,200,1)" : "rgba(20,23,30,1)"}
                        size={this.state.height}
                    />
                </Pressable>
                <Pressable style={styles.footerItem}
                    onPress={() => this.props.navigation.navigate("MenuScreen")}
                >
                    <Feather
                        name={"search"}
                        color={this.props.search ? "rgba(200,200,200,1)" : "rgba(20,23,30,1)"}
                        size={this.state.height}
                    />
                </Pressable>
                <Pressable style={styles.footerItem}
                    onPress={() => this.props.navigation.navigate("ShoppingcartScreen")}
                >
                    <MaterialIcons
                        name={"computer"}
                        color={this.props.shoppingcart ? "rgba(200,200,200,1)" : "rgba(20,23,30,1)"}
                        size={this.state.height}
                    />
                </Pressable>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    footer: {
        paddingBottom: heightPixelS(5),
        paddingTop: heightPixelS(5),
        width: "100%",
        flexDirection: 'row',
        backgroundColor: 'rgba(70,73,80,1)',
    },
    footerItem: {
        flex: 1,
        alignItems: 'center',
    },
});