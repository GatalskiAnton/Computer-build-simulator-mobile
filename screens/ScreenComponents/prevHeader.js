import { Text, View, StyleSheet, Image } from "react-native";
import React, { Component } from "react";
import { heightPixelS, widthPixel } from "../../global/adaptiveFunctions";
import { Pressable } from "react-native";
import globalStyles from '../../global/globalStyles'

export default class header extends Component {
    render() {
        return (
            <View style={styles.headerContainer}>
                <View style={styles.header}>
                    {
                        this.props.showCross && (
                            <View style={styles.leftSide}>
                                <Pressable
                                    onPress={() =>
                                        this.props.navigation.navigate("StopSelectionScreen")
                                    }
                                >
                                    <Image
                                        style={styles.crossImage}
                                        source={require("../../assets/img/closeImage.png")}
                                        contentFit="fill"
                                    />
                                </Pressable>
                            </View>
                        )
                    }
                    {
                        this.props.showArrow && (
                            <View style={styles.leftSide}>
                                <Pressable onPress={() => this.props.navigation.goBack()}>
                                    <Image
                                        style={styles.arrowImage}
                                        source={require("../../assets/img/arrow.png")}
                                        contentFit="fill"
                                    />
                                </Pressable>
                            </View>
                        )
                    }
                    {
                        this.props.selectAll &&
                        <View style={styles.selectAllContainer}>
                            <Pressable style={styles.selectAllButton} />
                            <Text style={[globalStyles.smallText, styles.selectAllText]}>Выбрать все</Text>
                        </View>
                    }
                    {
                        this.props.showShopping && (
                            <View style={styles.rightSide}>
                                <Pressable>
                                    <Image
                                        style={styles.shoppingImage}
                                        source={require("../../assets/img/shopping.png")}
                                        contentFit="fill"
                                    />
                                </Pressable>
                            </View>
                        )
                    }
                    {
                        this.props.showBin && (
                            <View style={styles.rightSide}>
                                <Pressable>
                                    <Image
                                        style={styles.binImage}
                                        source={require("../../assets/img/bin.png")}
                                        contentFit="fill"
                                    />
                                </Pressable>
                            </View>
                        )
                    }
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    headerContainer: {
    },
    header: {
        flexDirection: "row",
        paddingBottom: heightPixelS(10),
        justifyContent: "center",
        width: "100%",
    },
    leftSide: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        marginLeft: widthPixel(-10),
        paddingTop: heightPixelS(10),
    },
    rightSide: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-end",
        marginRight: widthPixel(-10),
        paddingTop: heightPixelS(10),
    },
    crossImage: {
        width: widthPixel(55),
        height: widthPixel(55),
    },
    arrowImage: {
        width: widthPixel(60),
        height: widthPixel(55),
    },
    shoppingImage: {
        marginTop: heightPixelS(5),
        width: widthPixel(50),
        height: widthPixel(45),
    },
    binImage: {
        width: widthPixel(40),
        height: widthPixel(50),
    },
    selectAllContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
    },
    selectAllButton: {
        width: widthPixel(35),
        height: heightPixelS(45),
        backgroundColor: 'white',
        borderRadius: 15,
    },
    selectAllText: {
        paddingLeft: widthPixel(15),
    },
});
