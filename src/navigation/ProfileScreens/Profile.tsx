import { useStore } from "effector-react"
import { useCallback, useMemo, useState } from "react"
import styled from "styled-components/native"
import { $currentUser, $customers, $workers, deleteVacancyOfCustomer, logout, setCurrentUser, TCustomer, TWorker, updateCustomer, updateWorker } from "../../screens/store"
import { AvatarIcon } from "../../shared/ui/icons/AvatarIcon"
import { colors } from "../../shared/ui/theme/colors"
import { IconStar } from "../../screens/IconStar"
import Input from "../../components/common/Input"
import { ProfileStackParams } from "../ProfileNavigator"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { VacancyRow } from "../../components/VacancyRow"

type Props = NativeStackScreenProps<ProfileStackParams, "Profile">

export const Profile = ({ navigation, route }: Props) => {
    const currentUser = useStore($currentUser)
    const customers = useStore($customers)
    const workers = useStore($workers)
    const [isEditing, setEditing] = useState(false)
    const [fullname, setFullname] = useState(currentUser.name)
    const [mail, setMail] = useState(currentUser.mail)

    const user: TWorker | TCustomer = useMemo(() => {
        return currentUser.role === "customer" 
                ? customers.find(customer => customer.id === currentUser.id)!
                : workers.find(worker => worker.id === currentUser.id)!
    }, [currentUser, customers, workers])

    const onEditButtonClick = useCallback(() => {
        if (!isEditing) {
            setEditing(true)
            return
        }
    
        setCurrentUser({
            id: currentUser.id,
            name: fullname,
            mail: mail,
            role: currentUser.role
        })

        if (currentUser.role === "customer") {
            updateCustomer({
                id: currentUser.id,
                name: fullname,
                mail: mail
            })
        } else {
            updateWorker({
                id: currentUser.id,
                name: fullname,
                mail: mail
            })
        }
        
        setEditing(false)
    }, [isEditing, setEditing, setCurrentUser, currentUser, fullname, mail, updateCustomer, updateWorker])

    const onCreateVacancyButtonClick = useCallback(() => {
        navigation.navigate("CreateVacancy")
    }, [navigation])

    const onLogoutButtonClick = useCallback(() => {
        logout()
    }, [logout])

    const onDeleteVacancy = useCallback((id: string) => {
        deleteVacancyOfCustomer({
            customerId: user.id,
            id: id
        })
    }, [deleteVacancyOfCustomer, user])

    return (
        <Wrapper>
            <AvatarWrapper>
                <AvatarView>
                    <AvatarIcon />
                </AvatarView>
                <StarsWrapper>
                    {[1, 2, 3, 4, 5].map(el => (
                        <IconStar 
                            size={16}
                            color={el <= user.rating ? "#ed8a19" : colors.lightgray} 
                            key={el}
                        />
                    ))}
                </StarsWrapper>
            </AvatarWrapper>

            <InputsWrapper>
                <Input 
                    value={fullname}
                    placeholder="ФИО"
                    placeholderTextColor={colors.lightgray}
                    autoCapitalize="none"
                    editable={isEditing}
                    onChangeText={setFullname}
                />
                <Input 
                    value={mail}
                    placeholder="Почта"
                    placeholderTextColor={colors.lightgray}
                    autoCapitalize="none"
                    editable={isEditing}
                    onChangeText={setMail}
                />
                <EditButton onPress={onEditButtonClick}>
                    <LogoutButtonText>
                        {isEditing ? "Сохранить" : "Редактировать"}
                    </LogoutButtonText>
                </EditButton>
            </InputsWrapper>

            {user.role === "customer" && (
                <VacanciesWrapper>
                    {user.vacancies.map(vacancy => (
                        <VacancyRow 
                            id={vacancy.id}
                            title={vacancy.title}
                            description={vacancy.description}
                            tasks={vacancy.tasks}
                            key={vacancy.id}
                            creator={vacancy.creator}
                            creatorId={vacancy.creatorId}
                            date={vacancy.date}
                            onDelete={onDeleteVacancy}
                        />
                    ))}
                    <CreateVacancyButton onPress={onCreateVacancyButtonClick}>
                        <LogoutButtonText>Добавить вакансию</LogoutButtonText>
                    </CreateVacancyButton>
                </VacanciesWrapper>
            )}

            <LogoutButton onPress={onLogoutButtonClick}>
                <LogoutButtonText>Выход</LogoutButtonText>
            </LogoutButton>
        </Wrapper>
    )
}

const Wrapper = styled.ScrollView`
    flex: 1;
    background-color: ${colors.backgroundMain};
    padding: 16px;
`

const AvatarWrapper = styled.View`
    align-items: center;
    margin-top: 32px;
`

const AvatarView = styled.View`
    width: 150px;
    height: 150px;
    background-color: ${colors.backgroundSecondary};
    border-radius: 75px;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
`

const StarsWrapper = styled.View`
    margin-top: 32px;
    column-gap: 8px;
    flex-direction: row;
`

const InputsWrapper = styled.View`
    row-gap: 16px;
    margin-top: 32px;
`

const Button = styled.TouchableOpacity`
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
`

const LogoutButton = styled(Button)`
    background-color: rgb(195, 85, 85);
    margin-top: 32px;
    margin-bottom: 32px;
`

const EditButton = styled(Button)`
    background-color: rgb(58, 58, 215);
`

const VacanciesWrapper = styled.View`
    row-gap: 16px;
    margin-top: 32px;
`

const CreateVacancyButton = styled(Button)`
    background-color: rgb(58, 58, 215);
`

const LogoutButtonText = styled.Text`
    font-size: 16px;
    color: white;
`