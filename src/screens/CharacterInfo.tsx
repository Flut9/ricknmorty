import { useEffect, useCallback, useState } from "react"
import { ScrollView, View, Image, Pressable, StyleSheet } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { CharacterUI, mapCharacterResponseToUI } from "../types/CharactersResponse"
import { MainStackParams } from "../navigation/MainStack"
import CharactersService from "../services/CharactersService"
import InfoRow from "../components/CharacterInfo/InfoRow"
import Loader from "../components/common/Loader"

import ChevronLeftIcon from "../shared/ui/icons/ChevronLeftIcon"
import { colors } from "../shared/ui/theme/colors"

type Props = NativeStackScreenProps<MainStackParams, "CharacterInfo">

type CharDetails = {
    title: string, 
    description: string
}

const CharacterInfo = ({ navigation, route }: Props) => {
    const [character, setCharacter] = useState<CharacterUI>()
    const [isLoading, setIsLoading] = useState(false)
    const { id, name } = route.params
    const safeAreaInsets = useSafeAreaInsets()

    useEffect(() => {
        setupNavBar()
        fetchCharacter()
    }, [])

    const fetchCharacter = useCallback(async () => {
        setIsLoading(true)

        let response = await CharactersService.getCharacter(id)

        if (response?.data) {
            setCharacter(mapCharacterResponseToUI(response.data))
        }
        
        setIsLoading(false)
    }, [setCharacter, setIsLoading])

    const setupNavBar = useCallback(() => {
        navigation.setOptions({
            title: name,
            headerLeft: () => (
                <Pressable onPress={navigation.goBack}>
                    <ChevronLeftIcon />
                </Pressable>
            )
        })
    }, [])

    if (isLoading) {
        return <Loader />
    }

    if (!character) {
        return null
    }

    return (
        <View style={[styles.container, { paddingBottom: safeAreaInsets.bottom }]}>
            <Image source={{uri: character.image}} style={styles.image} />
                            
            <ScrollView>
                {Object.values(character.details).filter(item => item.description).map((item, index) => item.description && (
                    <InfoRow title={item.title} details={item.description} key={index.toString()} />
                ))}
            </ScrollView>
        </View>
    )
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