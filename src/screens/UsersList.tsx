import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useStore } from "effector-react"
import React, { useCallback, useEffect, useMemo } from "react"
import { FlatList, ListRenderItemInfo, Pressable } from "react-native"
import styled from "styled-components/native"
import { MainStackParams } from "../navigation/MainStack"
import { colors } from "../shared/ui/theme/colors"
import { $currentUser, $customers, $users, $workers, TCustomer, TUser } from "./store"

const UserRowWrapper = styled.View`
    height: 64px;
    padding: 0 16px;
    background-color: ${colors.backgroundSecondary};
    border-radius: 16px;
    flex-direction: row;
    align-items: center;
`

const UserRowTextWrapper = styled.View`
    flex: 1;
    row-gap: 10px;
`

const UserRowTitle = styled.Text`
    font-size: 20px;
    color: white;
`

const UserRowSubtitle = styled.Text`
    font-size: 14px;
    color: ${colors.lightgray};
`

type UserRowProps = {
    name: string,
    mail: string,
    role: string
}

const UserRow = ({ name, mail, role }: UserRowProps) => {
    return (
        <UserRowWrapper>
            <UserRowTextWrapper>
                <UserRowTitle>{name}</UserRowTitle>
                <UserRowSubtitle>{role}</UserRowSubtitle>
            </UserRowTextWrapper>
        </UserRowWrapper>
    )
}

const Wrapper = styled.View`
    flex: 1;
    background-color: ${colors.backgroundMain};
    padding: 16px;
`

const List = styled.FlatList`
    flex: 1;
` as typeof FlatList

const Spacer = styled.View`
    height: 16px;
`

type Props = NativeStackScreenProps<MainStackParams, "UsersList">

export const UsersList = ({ navigation, route }: Props) => {
    const customers = useStore($customers)
    const workers = useStore($workers)
    const currentUser = useStore($currentUser)

    const users = useMemo(() => {
        if (currentUser.role.toLowerCase() === "customer") {
            return workers.filter(user => user.role.toLowerCase() === "worker")
        }

        return customers.filter(user => user.role.toLowerCase() === "customer")
    }, [workers, customers, currentUser])

    const renderListItem = useCallback(({ item }: ListRenderItemInfo<TCustomer>) => {
        return (
            <Pressable 
                onPress={() => {
                    navigation.navigate("Customer", {
                        customer: item
                    })
                }}
            >
                <UserRow name={item.name} role={item.role} mail={item.mail} />
            </Pressable>
        )
    }, [])

    const renderListSeparator = useCallback(() => {
        return <Spacer />
    }, [])

    const getKeyExtractor = useCallback((user: TUser) => {
        return user.id
    }, [])

    return (
        <Wrapper>
            <List 
                data={customers}
                renderItem={renderListItem}
                keyExtractor={getKeyExtractor}
                showsVerticalScrollIndicator={false}
                ItemSeparatorComponent={renderListSeparator}
            />
        </Wrapper>
    )
}