import { useState, useEffect, useCallback, useMemo } from "react"
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
import CharactersService from "../services/CharactersService"
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
    const { characters, setCharacters } = useCharacters(searchText)
    const [page, setPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(0)
    const [isLoading, setLoading] = useState(false)
    const [isPageLoading, setPageLoading] = useState(false)
    const safeAreaInsets = useSafeAreaInsets()

    useEffect(() => {
        setupNavBar()
        setLoading(true)
        fetchCharacters(page)
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
        return isPageLoading && page !== pagesCount
            ? (
                <FooterLoaderView>
                    <FooterLoaderActivityIndicator />
                </FooterLoaderView>
            )
            : null
    }, [isPageLoading, page, pagesCount])

    const fetchCharacters = useCallback(async (page: number) => {
        let response = await CharactersService.getCharacters(page)

        if (response?.data) {
            setCharacters([...characters, ...response.data.results])
            setPagesCount(response.data.info.pages)
        }

        setLoading(false)
        setPageLoading(false)
    }, [characters, setLoading, setPageLoading, setCharacters, setPagesCount])

    const handleInputChanged = useCallback((text: string) => {
        setSearchText(text)
    }, [setSearchText])

    const handleScrollEnding = useCallback(() => {
        if (isPageLoading || page === pagesCount || searchText !== "") {
            return
        }

        setPageLoading(true)
        setPage(page + 1)
        fetchCharacters(page + 1)
    }, [page, isPageLoading, searchText, fetchCharacters, setPage, setPageLoading])

    if (isLoading) {
        return <Loader />
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
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={handleScrollEnding}
                ListFooterComponent={renderListFooter}
                ItemSeparatorComponent={renderListSeparator}
            />
        </KeyboardAvoidingView>
    )
}

export default CharactersList