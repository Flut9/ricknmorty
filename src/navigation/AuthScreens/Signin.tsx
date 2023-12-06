import { useCallback, useEffect, useState } from "react"
import styled from "styled-components/native"
import { colors } from "../../shared/ui/theme/colors"
import Input from "../../components/common/Input"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { AuthStackParams } from "../AuthNavigator"
import { $currentUser, $customers, addCustomer, addUser, addWorker, setCurrentUser, setIsAuth } from "../../screens/store"
import uuid from "react-native-uuid"
import { useStore } from "effector-react"

type Props = NativeStackScreenProps<AuthStackParams, "Signin">

export const Signin = ({ navigation, route }: Props) => {
    const [fullname, setFullname] = useState("")
    const [mail, setMail] = useState("")
    const [role, setRole] = useState("")
    const [password, setPassword] = useState("")

    const onSigninButtonClick = useCallback(() => {
        const id = uuid.v4().toString()

        switch (role.toLowerCase()) {
            case "customer":
                addCustomer({
                    id,
                    name: fullname,
                    mail,
                    role,
                    rating: 0,
                    reviews: [],
                    vacancies: []
                })

                break
            case "worker":
                addWorker({
                    id,
                    name: fullname,
                    mail,
                    role,
                    rating: 0,
                    reviews: []
                })

                break
            default:
                break
        }

        setCurrentUser({
            id,
            name: fullname,
            mail,
            role
        })
        addUser({
            id,
            name: fullname,
            mail,
            role
        })
        setIsAuth(true)
    }, [addCustomer, addWorker, setCurrentUser, uuid, setIsAuth, fullname, mail, role, addUser])

    const onLoginButtonClick = useCallback(() => {
        navigation.goBack()
    }, [navigation])

    return (
        <SafeArea>
            <Wrapper>
                <ContentWrapper>
                    <TitleText>Создать аккаунт</TitleText>
                    <InputsWrapper>
                        <Input 
                            value={fullname}
                            placeholder="ФИО"
                            placeholderTextColor={colors.lightgray}
                            autoCapitalize="none"
                            onChangeText={setFullname}
                        />
                        <Input 
                            value={mail}
                            placeholder="Почта"
                            placeholderTextColor={colors.lightgray}
                            autoCapitalize="none"
                            onChangeText={setMail}
                        />
                        <Input 
                            value={role}
                            placeholder="Роль"
                            placeholderTextColor={colors.lightgray}
                            autoCapitalize="none"
                            onChangeText={setRole}
                        />
                        <Input 
                            value={password}
                            placeholder="Пароль"
                            placeholderTextColor={colors.lightgray}
                            autoCapitalize="none"
                            secureTextEntry={true}
                            onChangeText={setPassword}
                        />
                    </InputsWrapper>
                </ContentWrapper>

                <ButtonsWrapper>
                    <LoginButton onPress={onSigninButtonClick}>
                        <ButtonText>Создать</ButtonText>
                    </LoginButton>
                    <SigninButton onPress={onLoginButtonClick}>
                        <ButtonText>Войти в аккаунт</ButtonText>
                    </SigninButton>
                </ButtonsWrapper>
            </Wrapper>
        </SafeArea>
    )
}

const SafeArea = styled.SafeAreaView`
    flex: 1;
    background-color: ${colors.backgroundMain};
`

const Wrapper = styled.View`
    flex: 1;
    background-color: ${colors.backgroundMain};
    justify-content: space-between;
    padding: 0 16px;
`

const ContentWrapper = styled.View`
    margin-top: 32px;
`

const TitleText = styled.Text`
    font-size: 24px;
    color: white;
    text-align: center;
`

const InputsWrapper = styled.View`
    margin-top: 32px;
    row-gap: 16px;
`

const ButtonsWrapper = styled.View`
    row-gap: 16px;
`

const Button = styled.TouchableOpacity`
    height: 48px;
    justify-content: center;
    align-items: center;
    border-radius: 16px;
`

const LoginButton = styled(Button)`
    background-color: rgb(66, 66, 186);
`

const SigninButton = styled(Button)`
    background-color: rgb(58, 58, 215);
`

const ButtonText = styled.Text`
    font-size: 16px;
    color: white;
`