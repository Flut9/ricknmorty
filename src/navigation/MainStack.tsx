import { createNativeStackNavigator } from "@react-navigation/native-stack"

import CharactersList from "../screens/CharactersList"
import CharacterInfo from "../screens/CharacterInfo"

import { colors } from "../assets/colors"

export type MainStackParams = {
    CharactersList: undefined,
    CharacterInfo: {
        id: number,
        name: string
    }
}

const MainStack = () => {
    const Stack = createNativeStackNavigator()

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
                name="CharactersList" 
                component={CharactersList} 
            />
            <Stack.Screen 
                name="CharacterInfo"
                component={CharacterInfo}
            />
        </Stack.Navigator>
    )
}

export default MainStack