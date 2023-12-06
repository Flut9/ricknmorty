import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import styled from 'styled-components/native'
import { UsersList } from '../screens/UsersList'
import { HomeIcon } from '../shared/ui/icons/HomeIcon'
import { UserIcon } from '../shared/ui/icons/UserIcon'
import { colors } from '../shared/ui/theme/colors'
import { HomeNavigator } from './HomeNavigator'
import { ProfileNavigator } from './ProfileNavigator'

export type MainTabStackParams = {
    Home: undefined
    ProfileNav: undefined
}

const MainTabStack = createBottomTabNavigator<MainTabStackParams>()

export const BottomTabNavigator = () => {
    return (
      <Wrapper>
        <MainTabStack.Navigator
          screenOptions={{
            tabBarActiveTintColor: "#fff",
            tabBarInactiveTintColor: colors.lightgray,
            headerShown: false,
            tabBarStyle: {
              backgroundColor: colors.backgroundMain,
              borderTopWidth: 0,
            },
            tabBarLabelStyle: {
              fontSize: 11,
            },
          }}
        >
          <MainTabStack.Screen
            component={HomeNavigator}
            name="Home"
            options={{
              title: 'Главная',
              tabBarIcon: ({ color }) => <HomeIcon color={color} />,
            }}
          />

          <MainTabStack.Screen
            component={ProfileNavigator}
            name="ProfileNav"
            options={{
              title: 'Профиль',
              tabBarIcon: ({ color }) => <UserIcon color={color} />,
            }}
          />
        </MainTabStack.Navigator>
      </Wrapper>
    )
  }
  
  const Wrapper = styled.View`
    flex: 1;
  `