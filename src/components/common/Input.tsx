import { TextInputProps } from "react-native"

import SearchIcon from "../../shared/ui/icons/SearchIcon"
import styled from "styled-components/native"
import { colors } from "../../shared/ui/theme/colors"

const ContainerView = styled.View`
    flex: 1;
    flex-direction: row;
    align-items: center;
    max-height: 45px;
    padding: 0 15px;
    background-color: ${colors.backgroundSecondary};
    border-radius: 20px;
`

const TextInput = styled.TextInput`
    flex: 1;
    color: ${colors.white};
    margin-left: 15px;
`

type Props = TextInputProps

const Input = (props: Props) => {
    return (
        <ContainerView>
            <SearchIcon />
            <TextInput {...props} />
        </ContainerView>
    )
}

export default Input