import { useMemo } from "react"
import styled from "styled-components/native"
import { colors } from "../shared/ui/theme/colors"
import { TTask } from "./store"

type Props = TTask

export const TaskRow = ({ title, description, salary }: Props) => {
    const salaryText = useMemo(() => `$${salary}`, [salary])

    return (
        <Wrapper>
            <TitleText>{title}</TitleText>
            <DescText>{description}</DescText>
            <SalaryText>{salaryText}</SalaryText>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    background-color: ${colors.backgroundMain};
    border-radius: 16px;
    padding: 16px;
`

const TitleText = styled.Text`
    font-size: 14px;
    color: white;
`

const DescText = styled.Text`
    font-size: 12px;
    color: ${colors.lightgray};
    margin-top: 4px;
`

const SalaryText = styled.Text`
    font-size: 12px;
    color: #a7d9ff;
    margin-top: 10px;
`