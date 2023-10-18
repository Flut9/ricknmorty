import styled from "styled-components/native"
import { colors } from "../../shared/ui/theme/colors"

const ContainerView = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    padding: 15px;
    background-color: ${colors.backgroundSecondary};
    border-radius: 20px;
`

const CharacterImage = styled.Image`
    width: 50px;
    height: 50px;
    border-radius: 25px;
`

const NameText = styled.Text`
    flex: 1;
    color: ${colors.white};
    margin-left: 15px;
`

type Props = {
    name: string,
    image: string
}

const CharacterRow = ({ name, image }: Props) => {
    return (
        <ContainerView>
            <CharacterImage source={{uri: image}} />
            <NameText>{name}</NameText>
        </ContainerView>
    )
}

export default CharacterRow