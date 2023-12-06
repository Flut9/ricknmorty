import { useCallback, useState } from "react"
import { styled } from "styled-components/native"
import { colors } from "../shared/ui/theme/colors"
import uuid from "react-native-uuid"
import { addCustomer, addUser, addWorker, setCurrentUser } from "./store"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { MainStackParams } from "../navigation/MainStack"

const Wrapper = styled.View`
    flex: 1;
    background-color: ${colors.backgroundMain};
    padding: 16px;
    justify-content: space-between;
`

const TitleText = styled.Text`
    font-size: 30px;
    color: white;
    text-align: center;
`

const InputsWrapper = styled.View`
    flex: 1;
    row-gap: 40px;
`

const Input = styled.TextInput`
    height: 50px;
    font-size: 20px;
    color: white;
    border-bottom-width: 2px;
    border-bottom-color: ${colors.lightgray};
`

const SigninButton = styled.TouchableOpacity`
    height: 48px;
    background-color: #7676f4;
    border-radius: 16px;
    justify-content: center;
    align-items: center;
`

const SigninText = styled.Text`
    font-size: 20px;
    color: white;
    font-weight: 500;
`

type Props = NativeStackScreenProps<MainStackParams, "Auth">

export const Auth = ({ navigation, route }: Props) => {
    const [name, setName] = useState("")
    const [mail, setMail] = useState("")
    const [role, setRole] = useState("")

    const onSigninButtonClick = useCallback(() => {
        const id = uuid.v4().toString()
        addUser({
            id,
            name,
            mail,
            role
        })

        switch (role.toLowerCase()) {
            case "customer":
                addCustomer({
                    id,
                    name,
                    mail,
                    role,
                    rating: 4,
                    reviews: [
                        {
                            title: "Заголовок",
                            description: "Описание выполненной работы",
                            rating: 4,
                            reviewer: "Afefaefe"
                        }
                    ],
                    vacancies: [
                        {
                            title: "Название вакансии",
                            description: "Описание вакансии",
                            tasks: [
                                {
                                    title: "Задача 1",
                                    description: "Описание задачи 1",
                                    salary: 5000
                                }
                            ]
                        }
                    ]
                })
                break
            case "worker":
                addWorker({
                    id,
                    name, 
                    mail,
                    role,
                    rating: 3,
                    reviews: [
                        {
                            title: "Заголовок",
                            description: "Описание выполненной работы",
                            rating: 4,
                            reviewer: "Afefaefe"
                        }
                    ]
                })
                break
            default:
                break
        }

        setCurrentUser({
            id,
            name,
            mail,
            role
        })

        navigation.navigate("UsersList")
    }, [name, mail, role, addUser, setCurrentUser, addCustomer, addWorker])

    return (
        <Wrapper>
            <InputsWrapper>
                <TitleText>Create an account</TitleText>
                <Input 
                    value={name}
                    placeholder="Enter your name" 
                    placeholderTextColor={colors.lightgray}
                    onChangeText={setName}
                />
                <Input 
                    value={mail}
                    placeholder="Enter your e-mail" 
                    placeholderTextColor={colors.lightgray}
                    onChangeText={setMail}
                />
                <Input 
                    value={role}
                    placeholder="Enter your role" 
                    placeholderTextColor={colors.lightgray}
                    onChangeText={setRole}
                />
            </InputsWrapper>
            <SigninButton onPress={onSigninButtonClick}>
                <SigninText>Signin</SigninText>
            </SigninButton>
        </Wrapper>
    )
}