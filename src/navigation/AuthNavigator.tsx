import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Auth } from "../screens/Auth"
import { Login } from "./AuthScreens/Login"
import { colors } from "../shared/ui/theme/colors"
import { Signin } from "./AuthScreens/Signin"

export type AuthStackParams = {
    Login: undefined
    Signin: undefined
}

const Stack = createNativeStackNavigator<AuthStackParams>()

export const AuthNavigator = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colors.backgroundMain
                },
                headerTintColor: colors.white
            }}
        >
            <Stack.Screen
                name="Login"
                component={Login}
                options={{
                    headerShown: false
                }}
            />
            <Stack.Screen
                name="Signin"
                component={Signin}
                options={{
                    headerShown: false
                }}
            />
        </Stack.Navigator>
    )
}