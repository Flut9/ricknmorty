import styled from "styled-components/native"
import { colors } from "../shared/ui/theme/colors"
import { IconStar } from "./IconStar"
import { TReview } from "./store"

const Wrapper = styled.View`
    flex-direction: row;
    border-radius: 16px;
    background-color: ${colors.backgroundSecondary};
    padding: 16px;
`

const TextWrapper = styled.View`
    row-gap: 8px;
    flex: 1;
`

const ReviewerText = styled.Text`
    font-size: 12px;
    color: #fff;
`

const TitleText = styled.Text`
    font-size: 18px;
    color: white;
`

const DescriptionText = styled.Text`
    font-size: 16px;
    color: ${colors.lightgray};
`

const RatingWrapper = styled.View``

const Stars = styled.View`
    flex-direction: row;
    column-gap: 4px;
`

type Props = TReview

export const ReviewRow = ({ title, rating, description, reviewer }: Props) => {
    return (
        <Wrapper>
            <TextWrapper>
                <ReviewerText>{reviewer === "" ? "Аноним" : reviewer}</ReviewerText>
                <TitleText>{title}</TitleText>
                <DescriptionText>{description}</DescriptionText>
            </TextWrapper>

            <RatingWrapper>
                <Stars>
                    {[1, 2, 3, 4, 5].map(el => (
                        <IconStar size={10} color={el <= rating ? "#ed8a19" : colors.lightgray} />
                    ))}
                </Stars>
            </RatingWrapper>
        </Wrapper>
    )
}  