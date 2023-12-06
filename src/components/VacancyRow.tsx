import styled from "styled-components/native"
import { TVacancy } from "../screens/store"
import { TrashIcon } from "../shared/ui/icons/TrashIcon"
import { colors } from "../shared/ui/theme/colors"

type Props = TVacancy & {
    onDelete: (id: string) => void
}

export const VacancyRow = ({ id, title, description, tasks, onDelete }: Props) => {
    return (
        <Wrapper>
            <VacancyTitle>{title}</VacancyTitle>
            <VacancyDesc>{description}</VacancyDesc>

            <TasksWrapper>
                {tasks.map(task => (
                    <TaskWrapper>
                        <TaskTitle>{task.title}</TaskTitle>
                        <TaskDesc>{task.description}</TaskDesc>
                        <TaskSalary>{`$${task.salary}`}</TaskSalary>
                    </TaskWrapper>
                ))}
            </TasksWrapper>

            <DeleteButton onPress={() => onDelete(id)}>
                <TrashIcon />
            </DeleteButton>
        </Wrapper>
    )
}

const Wrapper = styled.View`
    border-radius: 16px;
    background-color: ${colors.backgroundSecondary};
    row-gap: 16px;
    padding: 10px;
`

const VacancyTitle = styled.Text`
    font-size: 18px;
    color: white;
`

const VacancyDesc = styled.Text`
    font-size: 16px;
    color: ${colors.lightgray};
`

const TasksWrapper = styled.View`
    background-color: ${colors.backgroundMain};
    border-radius: 16px;
    row-gap: 8px;
    padding: 10px;
`

const TaskWrapper = styled.View`
    background-color: ${colors.backgroundSecondary};
    border-radius: 16px;
    row-gap: 8px;
    padding: 16px;
`

const TaskTitle = styled.Text`
    font-size: 14px;
    color: white;
`

const TaskDesc = styled.Text`
    font-size: 12px;
    color: ${colors.lightgray};
`

const TaskSalary = styled.Text`
    font-size: 14px;
    color: #8a8a8a;
`

const DeleteButton = styled.TouchableOpacity`
    position: absolute;
    top: 10px;
    right: 10px;
`