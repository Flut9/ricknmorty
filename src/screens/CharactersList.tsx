import { useState, useEffect, useCallback } from "react"
import { FlatList, Pressable, StyleSheet, View, ActivityIndicator } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { useCharacters } from "../hooks/useCharacters"
import { useKeyboard } from "../hooks/useKeyboard"
import { MainStackParams } from "../navigation/MainStack"
import CharactersService from "../services/CharactersService"
import CharacterRow from "../components/CharactersList/CharacterRow"
import Input from "../components/common/Input"
import Spacer from "../components/common/Spacer"
import Loader from "../components/common/Loader"

import { colors } from "../assets/colors"

type Props = NativeStackScreenProps<MainStackParams, "CharactersList">

const CharactersList = ({ navigation }: Props) => {
    const [searchText, setSearchText] = useState("")
    const [characters, setCharacters] = useCharacters(searchText)
    const [page, setPage] = useState(1)
    const [pagesCount, setPagesCount] = useState(0)
    const [isLoading, setLoading] = useState(false)
    const [isPageLoading, setPageLoading] = useState(false)
    const safeAreaInsets = useSafeAreaInsets()
    const keyboardHeight = useKeyboard()

    useEffect(() => {
        setupNavBar()
        setLoading(true)
        fetchCharacters(page)
    }, [])

    const setupNavBar = useCallback(() => {
        navigation.setOptions({ headerShown: false })
    }, [])

    const fetchCharacters = useCallback(async (page: number) => {
        let response = await CharactersService.getCharacters(page)

        if (response?.data) {
            setCharacters([...characters, ...response.data.results])
            setPagesCount(response.data.info.pages)
        }

        setLoading(false)
        setPageLoading(false)
    }, [characters, searchText])

    const handleInputChanged = useCallback((text: string) => {
        setSearchText(text)
    }, [searchText, characters])

    const handleScrollEnding = useCallback(() => {
        if (isPageLoading || page === pagesCount || searchText !== "") {
            return
        }

        setPageLoading(true)
        setPage(page + 1)
        fetchCharacters(page + 1)
    }, [page, isPageLoading, searchText, fetchCharacters])

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
                data={characters}
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