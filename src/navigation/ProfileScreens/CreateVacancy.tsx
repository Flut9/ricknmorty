import { useCallback, useState } from "react"
import styled from "styled-components/native"
import Input from "../../components/common/Input"
import { $currentUser, addVacancyToCustomer, TTask } from "../../screens/store"
import { colors } from "../../shared/ui/theme/colors"
import uuid from "react-native-uuid"
import { useStore } from "effector-react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { ProfileStackParams } from "../ProfileNavigator"

type Props = NativeStackScreenProps<ProfileStackParams, "CreateVacancy">

export const CreateVacancy = ({ navigation, route }: Props) => {
    const currentUser = useStore($currentUser)
    const [isTaskCreating, setTaskCreating] = useState(false)
    const [vacancyTitle, setVacancyTitle] = useState("")
    const [vacancyDesc, setVacancyDesc] = useState("")
    const [vacancyTasks, setVacancyTasks] = useState<TTask[]>([])
    const [taskTitle, setTaskTitle] = useState("")
    const [taskDesc, setTaskDesc] = useState("")
    const [taskSalary, setTaskSalary] = useState("")

    const onShowCreateTaskButtonClick = useCallback(() => {
        setTaskCreating(true)
    }, [setTaskCreating])

    const onCreateButtonClick = useCallback(() => {
        addVacancyToCustomer({
            id: currentUser.id,
            vacancy: {
                id: uuid.v4().toString(),
                title: vacancyTitle,
                description: vacancyDesc,
                tasks: vacancyTasks,
                date: "20.11.2023",
                creator: currentUser.name,
                creatorId: currentUser.id
            }
        })

        console.log(123123123132132)

        navigation.goBack()
    }, [currentUser, uuid, vacancyTitle, vacancyDesc, vacancyTasks, addVacancyToCustomer, navigation])

    const onCreateTaskButtonClick = useCallback(() => {
        setVacancyTasks(prev => [...prev, {
            id: uuid.v4().toString(),
            title: taskTitle,
            description: taskDesc,
            salary: Number(taskSalary)
        }])

        setTaskTitle("")
        setTaskDesc("")
        setTaskSalary("")
        setTaskCreating(false)
    }, [setTaskCreating, setVacancyTasks, taskTitle, taskDesc, taskSalary, uuid, setTaskTitle, setTaskSalary, setTaskDesc])

    const onCancelTaskButtonClick = useCallback(() => {
        setTaskCreating(false)
    }, [setTaskCreating])

    return (
        <Wrapper>
            <TitleInput 
                value={vacancyTitle}
                placeholder="Название"
                placeholderTextColor={colors.lightgray}
                onChangeText={setVacancyTitle}
            />
            <DescriptionInput 
                value={vacancyDesc}
                placeholder="Описание"
                multiline={true}
                placeholderTextColor={colors.lightgray}
                onChangeText={setVacancyDesc}
            />
            
            <TasksWrapper>
                {vacancyTasks.map(task => (
                    <TaskRow>
                        <TaskTitle>{task.title}</TaskTitle>
                        <TaskDesc>{task.description}</TaskDesc>
                        <TaskSalary>{`$${task.salary}`}</TaskSalary>
                    </TaskRow>
                ))}
            </TasksWrapper>

            <ShowCreateTaskButton onPress={onShowCreateTaskButtonClick}>
                <ButtonText>Добавить задачу</ButtonText>
            </ShowCreateTaskButton>

            <CreateButton onPress={onCreateButtonClick}>
                <ButtonText>Создать</ButtonText>
            </CreateButton>

            {isTaskCreating && (
                <TaskWrapper>
                    <TitleInput 
                        value={taskTitle}
                        placeholder="Название"
                        placeholderTextColor={colors.lightgray}
                        onChangeText={setTaskTitle}
                    />
                    <DescriptionInput 
                        value={taskDesc}
                        placeholder="Описание"
                        multiline={true}
                        placeholderTextColor={colors.lightgray}
                        onChangeText={setTaskDesc}
                    />
                    <Input
                        style={{ marginTop: 16 }}
                        value={taskSalary}
                        placeholderTextColor={colors.lightgray}
                        placeholder="Сумма"
                        onChangeText={setTaskSalary}
                    />

                    <CreateTaskButton onPress={onCreateTaskButtonClick}>
                        <ButtonText>Добавить</ButtonText>
                    </CreateTaskButton>
                    <CancelTaskButton onPress={onCancelTaskButtonClick}>
                        <ButtonText>Отмена</ButtonText>
                    </CancelTaskButton>
                </TaskWrapper>
            )}
        </Wrapper>
    )
}

const Wrapper = styled.ScrollView`
    flex: 1;
    background-color: ${colors.backgroundMain};
    padding: 16px;
`

const TitleInput = styled.TextInput`
    margin-top: 16px;
    padding: 0 16px;
    height: 48px;
    border-radius: 16px;
    font-size: 16px;
    color: white;
    background-color: ${colors.backgroundSecondary};
`

const DescriptionInput = styled.TextInput`
    margin-top: 16px;
    padding: 16px;
    height: 132px;
    border-radius: 16px;
    border-radius: 16px;
    color: white;
    background-color: ${colors.backgroundSecondary};
`

const TaskWrapper = styled.View`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${colors.backgroundMain};
`

const Button = styled.TouchableOpacity`
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
    margin-top: 16px;
`

const ShowCreateTaskButton = styled(Button)`
    background-color: rgb(58, 58, 215);
`

const CreateTaskButton = styled(Button)`
    background-color: rgb(58, 58, 215);
`

const CancelTaskButton = styled(Button)`
    background-color: rgb(195, 85, 85);
`

const CreateButton = styled(Button)`
    background-color: rgb(58, 58, 215);
`

const ButtonText = styled.Text`
    font-size: 16px;
    color: white;
`

const TasksWrapper = styled.View`
    row-gap: 8px;
    background-color: ${colors.backgroundSecondary};
    padding: 16px;
    margin-top: 16px;
    border-radius: 16px;
`

const TaskRow = styled.View`
    padding: 16px;
    row-gap: 8px;
    border-radius: 16px;
    background-color: ${colors.backgroundMain};
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