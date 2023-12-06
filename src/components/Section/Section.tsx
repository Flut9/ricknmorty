import { ReactNode } from "react"
import styled from "styled-components/native"

type Props = {
    title: string
    children: ReactNode
}

export const Section = ({ title, children }: Props) => {
    return (
        <Wrapper>
            <TitleText>{title}</TitleText>

            <ContentWrapper>
                {children}
            </ContentWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    margin-top: 36px;
    row-gap: 26px;
`

const TitleText = styled.Text`
    flex: 1;
    font-size: 26px;
    color: white;
`

const ContentWrapper = styled.View``