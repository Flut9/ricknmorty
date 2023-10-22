import { useState, useEffect, useCallback } from "react"
import {
    Pressable, 
    Platform,
    FlatList,
    ListRenderItemInfo
} from "react-native"
import { EdgeInsets, useSafeAreaInsets } from "react-native-safe-area-context"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { useCharacters } from "../hooks/useCharacters"
import { MainStackParams } from "../navigation/MainStack"
import { CharacterResponse } from "../types/CharactersResponse"
import CharacterRow from "../components/CharactersList/CharacterRow"
import Input from "../components/common/Input"
import Spacer from "../components/common/Spacer"
import Loader from "../components/common/Loader"

import styled from "styled-components/native"
import { colors } from "../shared/ui/theme/colors"

const KeyboardAvoidingView = styled.KeyboardAvoidingView<{ safeAreaInsets: EdgeInsets }>`
    flex: 1;
    background-color: ${colors.backgroundMain};
    padding: 0 15px;
    padding-top: ${props => props.safeAreaInsets.top}px;
`

const CharactersFlatList = styled.FlatList`
    flex: 1;
    margin-top: 35px;
` as typeof FlatList

const FooterLoaderView = styled.View`
    padding: 30px 0;
`

const FooterLoaderActivityIndicator = styled.ActivityIndicator``

type Props = NativeStackScreenProps<MainStackParams, "CharactersList">

const CharactersList = ({ navigation }: Props) => {
    const [searchText, setSearchText] = useState("")
    const {
        characters,
        isLoading,
        isFetching,
        fetchNextPage
    } = useCharacters(searchText)
    const safeAreaInsets = useSafeAreaInsets()

    useEffect(() => {
        setupNavBar()
    }, [])

    const setupNavBar = useCallback(() => {
        navigation.setOptions({ headerShown: false })
    }, [])

    const renderListItem = useCallback(({ item }: ListRenderItemInfo<CharacterResponse>) => {
        return (
            <Pressable 
                onPress={() => navigation.navigate("CharacterInfo", { id: item.id, name: item.name })}
            >
                <CharacterRow 
                    name={item.name}
                    image={item.image} 
                />
            </Pressable>
        )
    }, [])

    const renderListSeparator = useCallback(() => {
        return <Spacer size={15} />
    }, [])

    const renderListFooter = useCallback(() => {
        return isFetching
            ? (
                <FooterLoaderView>
                    <FooterLoaderActivityIndicator />
                </FooterLoaderView>
            )
            : null
    }, [isFetching])

    const getKeyExtractor = useCallback((character: CharacterResponse) => {
        return String(character.id)
    }, [])

    const handleInputChanged = useCallback((text: string) => {
        setSearchText(text)
    }, [setSearchText])

    const handleScrollEnding = useCallback(() => {
        if (searchText || isLoading || isFetching) {
            return
        }

        fetchNextPage()
    }, [searchText, isLoading, isFetching, fetchNextPage])
    
    if (isLoading) {
        return <Loader />
    }

    if (!characters) {
        return null
    }

    return (
        <KeyboardAvoidingView
            safeAreaInsets={safeAreaInsets}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            <Input
                value={searchText}
                placeholder="Search..."
                autoCapitalize="none"
                placeholderTextColor={colors.lightgray}
                onChangeText={handleInputChanged} 
            />
            <CharactersFlatList
                data={characters}
                renderItem={renderListItem}
                keyExtractor={getKeyExtractor}
                showsVerticalScrollIndicator={false}
                onEndReached={handleScrollEnding}
                ListFooterComponent={renderListFooter}
                ItemSeparatorComponent={renderListSeparator}
            />
        </KeyboardAvoidingView>
    )
}

export default CharactersList