import { useEffect, useCallback } from "react"
import { Pressable } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useQuery } from "@tanstack/react-query"

import { CharacterUI, mapCharacterResponseToUI } from "../types/CharactersResponse"
import { MainStackParams } from "../navigation/MainStack"
import CharactersService from "../services/CharactersService"
import InfoRow from "../components/CharacterInfo/InfoRow"
import Loader from "../components/common/Loader"

import ChevronLeftIcon from "../shared/ui/icons/ChevronLeftIcon"
import styled from "styled-components/native"
import { colors } from "../shared/ui/theme/colors"
import { ThemeContext } from "./App"

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
    const { id, name } = route.params
    const safeAreaInsets = useSafeAreaInsets()
    const { data, isLoading } = useQuery<any, any, CharacterUI>({
        queryKey: ["character", id],
        queryFn: () => fetchCharacter(),
        select: ({data}) => mapCharacterResponseToUI(data)
    })

    useEffect(() => {
        setupNavBar()
    }, [])

    const fetchCharacter = useCallback(async () => {
        return await CharactersService.getCharacter(id)
    }, [])

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

    if (!data) {
        return null
    }

    return (
        <ContainerView paddingBottom={safeAreaInsets.bottom}>
            <CharacterImage source={{uri: data.image}} />
                            
            <ScrollView>
                {Object.values(data.details).filter(item => item.description).map((item, index) => item.description && (
                    <InfoRow title={item.title} details={item.description} key={index.toString()} />
                ))}
            </ScrollView>
        </ContainerView>
    )
}

export default CharacterInfo