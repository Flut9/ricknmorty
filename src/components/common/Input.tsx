import { TextInputProps } from "react-native"
import styled from "styled-components/native"
import { colors } from "../../shared/ui/theme/colors"

const Wrapper = styled.View<{ isEditing: boolean }>`
    height: 48px;
    border-bottom-width: 1px;
    border-bottom-color: ${({ isEditing }) => isEditing ? colors.white : colors.lightgray};
`

const TextInput = styled.TextInput<{ isEditing: boolean }>`
    flex: 1;
    color: ${({ isEditing }) => isEditing ? colors.white : colors.lightgray};
    font-size: 16px;
`

type Props = TextInputProps

const Input = (props: Props) => {
    return (
        <Wrapper isEditing={props.editable ?? true}>
            <TextInput isEditing={props.editable ?? true} {...props} />
        </Wrapper>
    )
}

export default Input