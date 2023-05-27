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