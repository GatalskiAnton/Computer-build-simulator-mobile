import { CardStyleInterpolators, createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation"
import HomeScreen from "../screens/HomeScreen"
import { heightPixelS } from "../global/adaptiveFunctions"
import ProfileScreen from "../screens/ProfileScreen"
import EnterScreen from "../screens/EnterScreen"
import UserScreen from "../screens/SignUpScreen"
import MenuScreen from "../screens/MenuScreen"
import ResetPasswordScreen from "../screens/ResetPasswordScreen"
import ShoppingcartScreen from "../screens/ScreenComponents/ShoppingcartScreen"
import SelectionScreen from "../screens/SelectionScreen"
import ItemInfoScreen from "../screens/ItemInfoScreen"

const RootStack = createStackNavigator(
    {
        HomeScreen: {
            screen: HomeScreen,
            navigationOptions: {
                headerShown: false,
            },
        },
        EnterScreen: {
            screen: EnterScreen,
            navigationOptions: {
                headerShown: false,
            },
        },
        SignUpScreen: {
            screen: ({ navigation }) => <UserScreen
                signUp={true}
                navigation={navigation}
            />,
            navigationOptions: {
                headerShown: false,
            },
        },
        LogInScreen: {
            screen: UserScreen,
            navigationOptions: {
                headerShown: false,
            },
        },
        MenuScreen: {
            screen: MenuScreen,
            navigationOptions: {
                headerShown: false,
            },
        },
        ProfileScreen: {
            screen: ProfileScreen,
            navigationOptions: {
                headerShown: false,
            },
        },
        ResetPasswordScreen: {
            screen: ResetPasswordScreen,
            navigationOptions: {
                headerShown: false,
            },
        },
        ShoppingcartScreen: {
            screen: ShoppingcartScreen,
            navigationOptions: {
                headerShown: false,
            },
        },
        SelectCPUScreen: {
            screen: ({ navigation }) => <SelectionScreen
                navigation={navigation}
                componentName={"CPU"}
                component={"CPU"}
            />,
            navigationOptions: {
                headerShown: false,
            },
        },
        SelectMotherboardScreen: {
            screen: ({ navigation }) => <SelectionScreen
                navigation={navigation}
                componentName={"Motherboard"}
                component={"Motherboard"}
            />,
            navigationOptions: {
                headerShown: false,
            },
        },
        SelectCoolerScreen: {
            screen: ({ navigation }) => <SelectionScreen
                navigation={navigation}
                componentName={"Cooler"}
                component={"Cooler"}
            />,
            navigationOptions: {
                headerShown: false,
            },
        },
        SelectPowerSupplyScreen: {
            screen: ({ navigation }) => <SelectionScreen
                navigation={navigation}
                componentName={"Power supply"}
                component={"PowerSupply"}
            />,
            navigationOptions: {
                headerShown: false,
            },
        },
        SelectRAMScreen: {
            screen: ({ navigation }) => <SelectionScreen
                navigation={navigation}
                componentName={"RAM"}
                component={"RAM"}
            />,
            navigationOptions: {
                headerShown: false,
            },
        },
        SelectSSDScreen: {
            screen: ({ navigation }) => <SelectionScreen
                navigation={navigation}
                componentName={"SSD"}
                component={"SSD"}
            />,
            navigationOptions: {
                headerShown: false,
            },
        },
        SelectHDDScreen: {
            screen: ({ navigation }) => <SelectionScreen
                navigation={navigation}
                componentName={"HDD"}
                component={"HDD"}
            />,
            navigationOptions: {
                headerShown: false,
            },
        },
        SelectCGUScreen: {
            screen: ({ navigation }) => <SelectionScreen
                navigation={navigation}
                componentName={"GPU"}
                component={"GPU"}
            />,
            navigationOptions: {
                headerShown: false,
            },
        },
        SelectPCCaseScreen: {
            screen: ({ navigation }) => <SelectionScreen
                navigation={navigation}
                componentName={"PC case"}
                component={"PCCase"}
            />,
            navigationOptions: {
                headerShown: false,
            },
        },
        ItemInfoScreen: {
            screen: ItemInfoScreen,
            navigationOptions: {
                headerShown: false,
            },
        }
    },
    {
        initialRouteName: "HomeScreen",
        defaultNavigationOptions: {
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerTitleAlign: 'left',
            headerStyle: { height: heightPixelS(90), backgroundColor: "rgba(50, 53, 60, 1)", borderBottomWidth: 2, borderBottomColor: 'black', }
        },
    },

)

export default createAppContainer(RootStack);