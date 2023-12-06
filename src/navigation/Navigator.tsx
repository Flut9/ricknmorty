import { NavigationContainer } from "@react-navigation/native"
import { useStore } from "effector-react"
import { $isAuth } from "../screens/store"
import { AuthNavigator } from "./AuthNavigator"
import { BottomTabNavigator } from "./BottomTabNavigator"

const Navigator = () => {
    const isAuth = useStore($isAuth)

    return (
        <NavigationContainer>
            {isAuth ? <BottomTabNavigator /> : <AuthNavigator />}
        </NavigationContainer>
    )
}

export default Navigator