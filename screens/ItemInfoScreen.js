import { Text, View } from 'react-native'
import React, { Component } from 'react'
import auth from '@react-native-firebase/auth';
import Background from './ScreenComponents/Background';
import { StyleSheet, Image, ScrollView } from 'react-native';
import Footer from './ScreenComponents/Footer';
import { fontPixel, heightPixel, heightPixelS, widthPixel } from '../global/adaptiveFunctions';
import DefaultButton from './ScreenComponents/DefaultButton';
import { IP } from '../global/globalVars';

export default class ItemInfoScreen extends Component {

    constructor(params) {
        super(params);
        this.state = {
            componentInfo: JSON,
        }
    }

    componentDidMount() {
        this.getComponent();
    }

    async getComponent() {
        await fetch("http://" + IP + ":9090/PCBuilder_war_exploded/component/getInfo", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "login": auth().currentUser.email == null ? "guest" : auth().currentUser.email,
                "componentName": auth().currentUser.lastSelectedItem.component,
                "id": auth().currentUser.lastSelectedItem.id,
            })
        }).then(response => {
            if (!response.ok) {
                console.log(response.status);
                console.log(response);
                console.log(response.headers.get("errorType"))
                return;
            }
            else {
                return response.json();
            }
        }).then(json => {
            this.setState({
                componentInfo: json,
            })
        })
            .catch(error => {
                console.log(error);
            }).finally();
    }

    getInfo() {
        var keys = Object.keys(this.state.componentInfo)
        var info = [];
        for (let i = 1; i < keys.length; ++i) {
            info.push(
                <View key={i} style={[styles.infoPartContainer, { backgroundColor: i % 2 == 0 ? "rgba(30, 33, 40, 1)" : 'rgba(60,63,70,1)' }]}>
                    <Text style={[styles.text, styles.key]}>{keys[i]}</Text>
                    <Text style={[styles.text, styles.value]}>{JSON.stringify(this.state.componentInfo[keys[i]])}</Text>
                </View>)
        }
        return info;
    }

    async selectItem() {
        await fetch("http://" + IP + ":9090/PCBuilder_war_exploded/component/select", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "login": auth().currentUser.email == null ? "guest" : auth().currentUser.email,
                "componentName": auth().currentUser.lastSelectedItem.component,
                "componentId": auth().currentUser.lastSelectedItem.id,
            })
        }).then(response => {
            if (!response.ok) {
                if (response.status != 999) {
                    console.log('error');
                }
                else if (response.headers.get("errorType") == "guest") {
                    let componentName = auth().currentUser.lastSelectedItem.component;
                    let componentId = auth().currentUser.lastSelectedItem.id;
                    auth().currentUser.componentName = componentId;
                }
                return;
            }
            else {
                alert("component has been selected");
            }
        })
            .catch(error => {
                console.log(error);
            });
    }

    render() {
        return (
            <Background>
                <View style={styles.main}>
                    <View style={styles.componentImageContainer}>
                        <Image
                            style={styles.componentImage}
                            source={require("../assets/img/componentsImg/geforceRTX3060.png")}
                            contentFit="fill"
                        />
                    </View>
                    <DefaultButton
                        text={"select component"}
                        style={styles.selectButton}
                        textStyle={styles.selectButtonText}
                        onPress={() => this.selectItem()}
                    />
                    <DefaultButton
                        text={"go back"}
                        style={styles.backButton}
                        textStyle={styles.backButtonText}
                        onPress={() => this.props.navigation.goBack()}
                    />
                    <ScrollView style={styles.infoContainer}>
                        {
                            this.getInfo()
                        }
                    </ScrollView>
                </View>
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
        justifyContent: 'center',
        alignItems: 'center',
    },
    componentImageContainer: {
        width: widthPixel(330),
        height: heightPixelS(250),
        backgroundColor: "rgba(0,0,0,1)",
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: heightPixelS(20)
    },
    componentImage: {
        marginTop: heightPixelS(20),
        height: heightPixelS(200),
        width: widthPixel(300),
        padding: 20,
    },
    infoContainer: {
        width: widthPixel(360),
        paddingTop: heightPixelS(20),
    },
    infoPartContainer: {
        width: "100%",
        flexDirection: 'row',
        minHeight: heightPixelS(50),
        alignItems: 'center',
    },
    text: {
        color: 'white',
        fontSize: fontPixel(20),
        padding: 3,
    },
    key: {
        marginLeft: widthPixel(8),
        flex: 1,
    },
    value: {
        flex: 1,
        textAlign: 'right',
        marginRight: widthPixel(8),
    },
    selectButton: {
        marginTop: heightPixelS(10),
        height: heightPixel(50),
    },
    selectButtonText: {
        fontSize: fontPixel(20),
    },
    backButton: {
        marginTop: heightPixelS(10),
        width: widthPixel(200),
        height: heightPixelS(40),
    },
    backButtonText: {
        fontSize: fontPixel(20),
    }
});