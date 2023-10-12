import { useState, useEffect, useCallback } from "react"
import { Keyboard, KeyboardEvent, FlatList, Pressable, StyleSheet, View, ActivityIndicator } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { CharacterResponse } from "../types/CharactersResponse"
import { MainStackParams } from "../navigation/MainStack"
import CharactersService from "../services/CharactersService"
import CharacterRow from "../components/CharactersList/CharacterRow"
import Input from "../components/common/Input"
import Spacer from "../components/common/Spacer"
import Loader from "../components/common/Loader"

import { colors } from "../assets/colors"

type Props = NativeStackScreenProps<MainStackParams, "CharactersList">

const CharactersList = ({ navigation }: Props) => {
    const [characters, setCharacters] = useState<CharacterResponse[]>([])
    const [filteredCharacters, setFilteredCharacters] = useState<CharacterResponse[]>([])
    const [page, setPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(0)
    const [searchText, setSearchText] = useState("")
    const [isLoading, setLoading] = useState(false)
    const [isPageLoading, setPageLoading] = useState(false)
    const [keyboardHeight, setKeyboardHeight] = useState(0)
    const safeAreaInsets = useSafeAreaInsets()

    useEffect(() => {
        const showingSubscription = Keyboard.addListener("keyboardDidShow", handleKeyboardShowing)
        const hidingSubscription = Keyboard.addListener("keyboardDidHide", handleKeyboardHiding)

        setupNavBar()
        setLoading(true)
        fetchCharacters(page)

        return () => {
            showingSubscription.remove()
            hidingSubscription.remove()
        }
    }, [])

    const handleKeyboardShowing = useCallback((event: KeyboardEvent) => {
        setKeyboardHeight(event.endCoordinates.height)
    }, [])

    const handleKeyboardHiding = useCallback(() => {
        setKeyboardHeight(0)
    }, [])

    const setupNavBar = useCallback(() => {
        navigation.setOptions({ headerShown: false })
    }, [])

    const fetchCharacters = useCallback(async (page: number) => {
        let response = await CharactersService.getCharacters(page)

        if (response?.data) {
            setCharacters([...characters, ...response.data.results])
            setFilteredCharacters([...characters, ...response.data.results])
            setPagesCount(response.data.info.pages)
        }

        setLoading(false)
        setPageLoading(false)
    }, [characters, searchText])

    const searchCharacters = useCallback((text: string) => {
        setFilteredCharacters(characters.filter(character => character.name.toLowerCase().includes(text.toLowerCase())))
    }, [characters])

    const handleInputChanged = useCallback((text: string) => {
        setSearchText(text)
        searchCharacters(text)
    }, [searchText, characters])

    const handleScrollEnding = useCallback(() => {
        if (isPageLoading || page === pagesCount || searchText !== "") {
            return
        }

        setPageLoading(true)
        setPage(page + 1)
        fetchCharacters(page + 1)
    }, [page, isPageLoading, searchText, characters])

    if (isLoading) {
        return <Loader />
    }

    return (
        <View 
            style={[
                styles.container, 
                { 
                    paddingTop: safeAreaInsets.top === 0 ? 15 : safeAreaInsets.top,
                    paddingLeft: safeAreaInsets.left === 0 ? 15 : safeAreaInsets.left,
                    paddingRight: safeAreaInsets.right === 0 ? 15 : safeAreaInsets.right
                }
            ]}
        >
            <Input
                value={searchText}
                placeholder="Search..."
                autoCapitalized="none"
                placeholderTextColor={colors.lightgray}
                onChangeText={handleInputChanged} 
            />
            <FlatList
                style={styles.list}
                contentInset={{ bottom: keyboardHeight }}
                data={filteredCharacters}
                renderItem={({ item }) => (
                    <Pressable 
                        onPress={() => navigation.navigate("CharacterInfo", { id: item.id, name: item.name })}
                    >
                        <CharacterRow 
                            name={item.name}
                            image={item.image} 
                        />
                    </Pressable>
                )}
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={handleScrollEnding}
                ListFooterComponent={() => {
                    return isPageLoading && page !== pagesCount
                        ? (
                            <View style={styles.pageLoader}>
                                <ActivityIndicator />
                            </View>
                        )
                        : null
                }}
                ItemSeparatorComponent={() => <Spacer size={15} />}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.backgroundMain,
        rowGap: 35
    },
    list: {
        flex: 1
    },
    pageLoader: {
        paddingVertical: 30
    }
})

export default CharactersList