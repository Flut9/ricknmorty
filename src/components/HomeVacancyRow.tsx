import styled from "styled-components/native"
import { TVacancy } from "../screens/store"
import { colors } from "../shared/ui/theme/colors"
import { useCallback, useMemo, useState } from "react"
import { ChevronDownIcon } from "../shared/ui/icons/ChevronDownIcon"
import { ChevronUpIcon } from "../shared/ui/icons/ChevronUpIcon"

type Props = TVacancy & {
    onCreatorClick: (creatorId: string) => void
}

export const HomeVacancyRow = ({ id, title, description, tasks, date, creatorId, creator, onCreatorClick }: Props) => {
    const [isTasksVisible, setTasksVisible] = useState(false)

    const Rows = useMemo(() => {
        return <TasksWrapper>
            {tasks.map(task => (
                <TaskRow>
                    <TaskTitle>{task.title}</TaskTitle>
                    <TaskDesc>{task.description}</TaskDesc>
                    <TaskSalary>{`$${task.salary}`}</TaskSalary>
                </TaskRow>
            ))}
        </TasksWrapper>
    }, [tasks])

    const onToggleTasksButtonClick = useCallback(() => {
        setTasksVisible(prev => !prev)
    }, [setTasksVisible])

    return (
        <Wrapper>
            <VacancyDate>
                <CreatorButton onPress={() => onCreatorClick(creatorId)}>
                    <CreatorText>{creator}</CreatorText>
                </CreatorButton>
                <Text>{date}</Text>
            </VacancyDate>
            <Title>{title}</Title>
            <Desc>{description}</Desc>
            {isTasksVisible && Rows}
            <ToggleTasksButton onPress={onToggleTasksButtonClick}>
                {isTasksVisible ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </ToggleTasksButton>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    background-color: ${colors.backgroundSecondary};
    border-radius: 16px;
    padding: 16px;
`

const VacancyDate = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const CreatorButton = styled.TouchableOpacity``

const CreatorText = styled.Text`
    font-size: 14px;
    color: #8a8cff;
`

const Text = styled.Text`
    font-size: 14px;
    color: ${colors.lightgray};
`

const Title = styled.Text`
    font-size: 20px;
    color: white;
    margin-top: 20px;
`

const Desc = styled.Text`
    font-size: 16px;
    color: ${colors.lightgray};
    margin-top: 8px;
`

const TasksWrapper = styled.View`
    row-gap: 12px;
    margin-top: 20px;
`

const TaskRow = styled.View`
    padding: 16px;
    row-gap: 8px;
    border-radius: 16px;
    background-color: ${colors.backgroundMain};
    padding: 16px;
`

const TaskTitle = styled.Text`
    font-size: 16px;
    color: white;
`

const TaskDesc = styled.Text`
    font-size: 14px;
    color: ${colors.lightgray};
`

const TaskSalary = styled.Text`
    font-size: 16px;
    color: #8a8a8a;
`

const ToggleTasksButton = styled.TouchableOpacity`
    margin-top: 16px;
    height: 48px;
    justify-content: center;
    align-items: center;
    border-top-width: 0.2px;
    border-top-color: white;
`