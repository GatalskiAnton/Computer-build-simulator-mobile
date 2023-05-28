import { Text, View, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import Background from './ScreenComponents/Background'
import Footer from './ScreenComponents/Footer'
import auth from '@react-native-firebase/auth';
import globalStyles from '../global/globalStyles'
import { ActivityIndicator, FlatList, Image, Pressable, TouchableOpacity } from 'react-native';
import { fontPixel, heightPixelS, widthPixel } from '../global/adaptiveFunctions';
import ItemInfoScreen from './ItemInfoScreen';
import InputField from './ScreenComponents/InputField';
import DefaultButton from './ScreenComponents/DefaultButton';
import SearchComponentBar from './ScreenComponents/SearchComponentBar'

export default class SelectionScreen extends Component {

    constructor(params) {
        super(params);
        this.state = {
            data: [],
            isLoading: true,
            textForSearch: "",
        }
    }

    componentDidMount() {
        this.getComponent();
    }


    getData(json) {
        switch (this.props.component) {
            case "CPU":
                this.setState({ data: json.CPU });
                break;
            case "GPU":
                this.setState({ data: json.GPU });
                break;
            case "Cooler":
                this.setState({ data: json.Cooler });
                break;
            case "HDD":
                this.setState({ data: json.HDD });
                break;
            case "Motherboard":
                this.setState({ data: json.Motherboard });
                break;
            case "PCCase":
                this.setState({ data: json.PCCase });
                break;
            case "PowerSupply":
                this.setState({ data: json.PowerSupply });
                break;
            case "RAM":
                this.setState({ data: json.RAM });
                break;
            case "SSD":
                this.setState({ data: json.SSD });
                break;
            default:
                this.setState({ data: null });
                break;
        }
    }

    async getComponent() {
        await fetch("http://192.168.0.100:9090/PCBuilder_war_exploded/component/getAll", {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                "login": auth().currentUser.email == null ? "guest" : auth().currentUser.email,
                "componentName": this.props.component,
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
            this.getData(json);
        })
            .catch(error => {
                console.log(error);
            }).finally(this.setState({
                isLoading: false,
            }));
    }

    navigateToItem(item) {
        auth().currentUser.lastSelectedItem = {
            "component": this.props.component,
            "id": item.id,
        }
        this.props.navigation.navigate("ItemInfoScreen");
    }

    render() {
        return (
            <Background>
                <View
                    style={styles.main}
                >
                    <Text style={[globalStyles.text, styles.textContainer]}>select {"\n" + this.props.componentName}</Text>
                    <View style={styles.utilsContainer}>
                        <SearchComponentBar
                            title="search"
                            style={styles.search}
                            onChangeText={(text) => { this.setState({ textForSearch: text }); console.log(this.state.textForSearch) }}
                        />
                        <DefaultButton
                            text="Back to select"
                            style={styles.button}
                            textStyle={styles.buttonText}
                            onPress={() => this.props.navigation.goBack()}
                        />
                        <DefaultButton
                            text="see only compatible components"
                            style={[styles.button, styles.bigButton]}
                            textStyle={styles.buttonText}

                        />
                    </View>
                    <View style={styles.componentsContainer}>
                        {
                            this.state.isLoading ? (
                                <ActivityIndicator />
                            ) : <FlatList
                                contentContainerStyle={styles.components}
                                nestedScrollEnabled={true}
                                data={this.state.data}
                                keyExtractor={({ id }) => id}
                                renderItem={({ item }) => {
                                    console.log("../assets/img/componentsImg/photos/" + this.props.componentName + "/" + item.name + ".jpg");
                                    return (
                                        <TouchableOpacity style={styles.component}
                                            onPress={() => this.navigateToItem(item)}
                                        >
                                            <Image
                                                style={styles.componentImage}
                                                source={require("../assets/img/componentsImg/photos/RAM/RipjawsS5.jpg")}
                                                resizeMode='stretch'
                                            />
                                            <Text style={[styles.componentText, styles.componentTextContainer]}>{item.name}</Text>
                                            <Text style={[styles.componentText, styles.componentTextContainer]}>${item.price} USD</Text>
                                        </TouchableOpacity>

                                    )
                                }}
                            />
                        }
                    </View>
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
    },
    textContainer: {
        paddingTop: heightPixelS(20),
        marginBottom: heightPixelS(15),
    },
    componentsContainer: {
        paddingTop: heightPixelS(20),
        width: "100%",
    },
    component: {
        width: widthPixel(350),
        backgroundColor: "rgba(16, 24, 34, 1)",
        marginBottom: heightPixelS(15),
        flexDirection: 'row',
        paddingLeft: widthPixel(5),
        paddingTop: heightPixelS(5),
        paddingBottom: heightPixelS(5),
        borderWidth: 1,
        borderColor: 'rgba(255,255,255,0.3)',
    },
    components: {
        width: widthPixel(360),
        alignItems: 'center',
    },
    componentImage: {
        height: heightPixelS(70),
        width: widthPixel(80),
        backgroundColor: "rgba(51,51,51,1)",
        borderWidth: 1,
        borderColor: 'white',
    },
    componentTextContainer: {
        flex: 1,
        paddingLeft: widthPixel(5),
        verticalAlign: 'middle',
        textAlign: 'center',
    },
    componentText: {
        color: "white",
        fontSize: fontPixel(15),
    },
    utilsContainer: {
        width: widthPixel(360),
        backgroundColor: "rgba(30, 33, 40, 1)",
        justifyContent: 'center',
        alignItems: 'center',
        height: heightPixelS(180),
        paddingBottom: heightPixelS(10),
    },
    button: {
        height: heightPixelS(35),
        width: widthPixel(200),
        marginBottom: heightPixelS(10),
    },
    buttonText: {
        fontSize: fontPixel(15),
    },
    search: {
        marginBottom: heightPixelS(10),
    },
    bigButton: {
        width: widthPixel(240),
        height: heightPixelS(50),
    }
});