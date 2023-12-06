import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Customer } from "../screens/Customer"
import { TCustomer } from "../screens/store"
import { UsersList } from "../screens/UsersList"
import { colors } from "../shared/ui/theme/colors"
import { Vacancies } from "./HomeScreens/Vacancies" 

export type HomeStackParams = {
    Vacancies: undefined,
    UsersList: undefined,
    Customer: {
        id: string
    }
}

const Stack = createNativeStackNavigator<HomeStackParams>()

export const HomeNavigator = () => {
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
                name="Vacancies"
                component={Vacancies}
                options={{
                    title: "Вакансии"
                }}
            />
            <Stack.Screen
                name="UsersList"
                component={UsersList}
                options={{
                    // headerBackVisible: false
                }}
            />
            <Stack.Screen 
                name="Customer" 
                component={Customer}
            />
        </Stack.Navigator>
    )
}