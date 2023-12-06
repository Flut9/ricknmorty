import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { colors } from "../shared/ui/theme/colors"
import { CreateVacancy } from "./ProfileScreens/CreateVacancy"
import { Profile } from "./ProfileScreens/Profile"

export type ProfileStackParams = {
    Profile: undefined
    CreateVacancy: undefined
}

const Stack = createNativeStackNavigator<ProfileStackParams>()

export const ProfileNavigator = () => {
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
                name="Profile"
                component={Profile}
                options={{
                    title: "Профиль"
                }}
            />
            <Stack.Screen
                name="CreateVacancy"
                component={CreateVacancy}
                options={{
                    title: "Вакансия"
                }}
            />
        </Stack.Navigator>
    )
}