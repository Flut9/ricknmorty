import styled from "styled-components/native"
import { colors } from "../shared/ui/theme/colors"
import { TVacancy } from "./store"
import { TaskRow } from "./TaskRow"

type Props = TVacancy

export const VacancyRow = ({ title, description, tasks }: Props) => {
    return (
        <Wrapper>
            <TitleText>{title}</TitleText>
            <DescText>{description}</DescText>

            <TasksWrapper>
                {tasks.map((task, index) => (
                    <TaskRow 
                        title={task.title}
                        description={task.description}
                        salary={task.salary}
                        key={index.toString()}
                    />
                ))}
            </TasksWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.View``

const TitleText = styled.Text`
    font-size: 18px;
    color: white;
`

const DescText = styled.Text`
    font-size: 14px;
    color: ${colors.lightgray};
    margin-top: 8px;
`

const TasksWrapper = styled.View`
    row-gap: 8px;
    margin-top: 12px;
`