import { useEffect, useCallback, useState } from "react"
import { Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { NativeStackScreenProps } from "@react-navigation/native-stack"

import { CharacterUI, mapCharacterResponseToUI } from "../types/CharactersResponse"
import { MainStackParams } from "../navigation/MainStack"
import CharactersService from "../services/CharactersService"
import InfoRow from "../components/CharacterInfo/InfoRow"
import Loader from "../components/common/Loader"

import ChevronLeftIcon from "../shared/ui/icons/ChevronLeftIcon"
import styled from "styled-components/native"
import { colors } from "../shared/ui/theme/colors"

const ContainerView = styled.View<{ paddingBottom: number }>`
    flex: 1;
    padding: 15px;
    padding-bottom: ${props => props.paddingBottom}px;
    background-color: ${colors.backgroundMain};
`

const CharacterImage = styled.Image`
    height: 250px;
    border-radius: 20px;
`

const ScrollView = styled.ScrollView`
    margin-top: 25px;
`

type Props = NativeStackScreenProps<MainStackParams, "CharacterInfo">

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
        <ContainerView paddingBottom={safeAreaInsets.bottom}>
            <CharacterImage source={{uri: character.image}} />
                            
            <ScrollView>
                {Object.values(character.details).filter(item => item.description).map((item, index) => item.description && (
                    <InfoRow title={item.title} details={item.description} key={index.toString()} />
                ))}
            </ScrollView>
        </ContainerView>
    )
}

export default CharacterInfo