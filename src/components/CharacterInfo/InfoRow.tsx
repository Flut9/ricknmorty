import styled from "styled-components/native"
import { colors } from "../../shared/ui/theme/colors"

const ContainerView = styled.View`
    padding: 10px 0;
`

const TitleText = styled.Text`
    color: ${colors.lightgray};
    font-size: 14px;
`

const DetailsText = styled.Text`
    color: ${colors.white};
    font-size: 18px;
    margin-top: 5px;
`

type Props = {
    title: string,
    details: string
}

const InfoRow = ({ title, details }: Props) => {
    return (
        <ContainerView>
            <TitleText>{title}</TitleText>
            <DetailsText>{details}</DetailsText>
        </ContainerView>
    )
}

export default InfoRow