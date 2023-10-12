import { useEffect, useCallback, useState } from "react"
import { ScrollView, View, Image, Pressable, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { CharacterResponse } from "../types/CharactersResponse"
import { MainStackParams } from "../navigation/MainStack"
import CharactersService from "../services/CharactersService"
import InfoRow from "../components/CharacterInfo/InfoRow"
import Loader from "../components/common/Loader"

import ChevronLeftIcon from "../assets/icons/ChevronLeftIcon"
import { colors } from "../assets/colors"

type Props = NativeStackScreenProps<MainStackParams, "CharacterInfo">

const CharacterInfo = ({ navigation, route }: Props) => {
    const [character, setCharacter] = useState<CharacterResponse | undefined>(undefined)
    const [isLoading, setIsLoading] = useState(false)
    const { id, name } = route.params
    const safeAreaInsets = useSafeAreaInsets()

    useEffect(() => {
        setupNavBar()
        setIsLoading(true)
        fetchCharacter()
    }, [])

    const fetchCharacter = useCallback(async () => {
        let response = await CharactersService.getCharacter(id)

        if (response?.data) {
            setCharacter(response.data)
        }
        
        setIsLoading(false)
    }, [])

    const routeToBack = useCallback(() => {
        navigation.goBack()
    }, [])

    const setupNavBar = useCallback(() => {
        navigation.setOptions({
            title: name,
            headerLeft: () => (
                <Pressable onPress={routeToBack}>
                    <ChevronLeftIcon />
                </Pressable>
            )
        })
    }, [])

    if (isLoading) {
        return <Loader />
    }

    if (character) {
        return (
            <View style={[styles.container, { paddingBottom: safeAreaInsets.bottom }]}>
                <Image source={{uri: character.image}} style={styles.image} />
                            
                <ScrollView>
                    {character.name && <InfoRow title="Name:" details={character.name} />}
                    {character.species && <InfoRow title="Species:" details={character.species} />}
                    {character.type && <InfoRow title="Type:" details={character.type} />}
                    {character.origin.name && <InfoRow title="Origin name:" details={character.origin.name} />}
                    {character.location.name && <InfoRow title="Current location:" details={character.location.name} />}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        rowGap: 25,
        paddingHorizontal: 15,
        backgroundColor: colors.backgroundMain
    },
    image: {
        height: 250,
        borderRadius: 20
    }
})

export default CharacterInfo