import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { useStore } from "effector-react"
import { useCallback, useMemo } from "react"
import styled from "styled-components/native"
import { HomeVacancyRow } from "../../components/HomeVacancyRow"
import { $customers } from "../../screens/store"
import { colors } from "../../shared/ui/theme/colors"
import { HomeStackParams } from "../HomeNavigator"

type Props = NativeStackScreenProps<HomeStackParams, "Vacancies">

export const Vacancies = ({ navigation, route }: Props) => {
    const customers = useStore($customers)
    
    const vacancies = useMemo(() => {
        return customers.flatMap(customer => customer.vacancies)
    }, [customers])

    const onCreatorClick = useCallback((creatorId: string) => {
        navigation.navigate("Customer", {
            id: creatorId
        })
    }, [navigation])

    return (
        <Wrapper>
            <VacanciesWrapper>
                {vacancies.map(vacancy => (
                    <HomeVacancyRow 
                        id={vacancy.id}
                        title={vacancy.title}
                        description={vacancy.description}
                        tasks={vacancy.tasks}
                        date={vacancy.date}
                        creator={vacancy.creator}
                        creatorId={vacancy.creatorId}
                        onCreatorClick={onCreatorClick}
                    />
                ))}
            </VacanciesWrapper>
        </Wrapper>
    )
}

const Wrapper = styled.ScrollView`
    flex: 1;
    background-color: ${colors.backgroundMain};
    padding: 16px;
`

const VacanciesWrapper = styled.View`
    flex: 1;
    row-gap: 24px;
`