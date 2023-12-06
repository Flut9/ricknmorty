import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useStore } from "effector-react"
import { useCallback, useEffect, useState } from "react"
import styled from "styled-components/native"
import Input from "../../components/common/Input"
import { $users, setCurrentUser, setIsAuth } from "../../screens/store"
import { colors } from "../../shared/ui/theme/colors"
import { AuthStackParams } from "../AuthNavigator"

type Props = NativeStackScreenProps<AuthStackParams, "Login">

export const Login = ({ navigation, route }: Props) => {
    const users = useStore($users)
    const [mail, setMail] = useState("")
    const [password, setPassword] = useState("")

    const onLoginButtonClick = useCallback(() => {
        const user = users.find(user => user.mail === mail)

        if (user) {
            setCurrentUser(user)
            setIsAuth(true)
        }
    }, [navigation, users, mail, setCurrentUser, setIsAuth])

    const onSigninButtonClick = useCallback(() => {
        navigation.navigate("Signin")
    }, [navigation])
    
    return (
        <SafeArea>
            <Wrapper>
                <ContentWrapper>
                    <TitleText>Войти в аккаунт</TitleText>
                    <InputsWrapper>
                        <Input 
                            value={mail}
                            placeholder="Почта"
                            placeholderTextColor={colors.lightgray}
                            autoCapitalize="none"
                            onChangeText={setMail}
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
                    <LoginButton onPress={onLoginButtonClick}>
                        <ButtonText>Войти</ButtonText>
                    </LoginButton>
                    <SigninButton onPress={onSigninButtonClick}>
                        <ButtonText>Создать аккаунт</ButtonText>
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
    background-color: rgb(58, 58, 215);
`

const SigninButton = styled(Button)`
    background-color: rgb(66, 66, 186);
`

const ButtonText = styled.Text`
    font-size: 16px;
    color: white;
`