import { colors } from "../shared/ui/theme/colors"
import { styled } from "styled-components/native"
import { useCallback, useEffect, useMemo, useState } from "react"
import { NativeStackScreenProps } from "@react-navigation/native-stack"
import { IconStar } from "./IconStar"
import { ReviewRow } from "./ReviewRow"
import { useStore } from "effector-react"
import { $currentUser, $customers, addReviewToCustomer } from "./store"
import { AvatarIcon } from "../shared/ui/icons/AvatarIcon"
import { Section } from "../components/Section/Section"
import { VacancyRow } from "./VacancyRow"
import { HomeStackParams } from "../navigation/HomeNavigator"
import uuid from "react-native-uuid"

const Wrapper = styled.ScrollView`
    flex: 1;
    background-color: ${colors.backgroundMain};
    padding: 16px;
`

const AvatarWrapper = styled.View`
    align-items: center;
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

const TextWrapper = styled.View`
    row-gap: 10px;
`

const RoleText = styled.Text`
    font-size: 18px;
    color: white;
`

const MailText = styled.Text`
    font-size: 16px;
    color: ${colors.lightgray};
`

const IdText = styled.Text`
    font-size: 16px;
    color: ${colors.lightgray};
`

const RatingView = styled.View`
    margin-top: 20px;
    flex-direction: row;
    column-gap: 10px;
    align-items: center;
`

const RatingCountText = styled.Text`
    font-size: 20px;
    color: ${colors.lightgray};
`
    
const ReviewsWrapper = styled.View`
    row-gap: 16px;
`

const CreateReviewWrapper = styled.View`
    row-gap: 16px;
    padding-bottom: 26px;
`

const SetStarWrapper = styled.View`
    flex-direction: row;
    column-gap: 8px;
`

const SetStarButton = styled.TouchableOpacity``

const CreateReviewInput = styled.TextInput`
    padding: 0 16px;
    height: 40px;
    color: white;
    font-size: 16px;
    border-radius: 16px;
    background-color: ${colors.backgroundSecondary};
`

const CreateReviewDescriptionInput = styled.TextInput`
    padding: 0 16px;
    height: 100px;
    color: white;
    font-size: 12px;
    border-radius: 16px;
    background-color: ${colors.backgroundSecondary};
`

const CreateReviewButton = styled.TouchableOpacity`
    height: 48px;
    background-color: #7676f4;
    border-radius: 16px;
    justify-content: center;
    align-items: center;
`

const CreateReviewButtonText = styled.Text`
    font-size: 20px;
    color: white;
    font-weight: 500;
`

const VacanciesWrapper = styled.View`
    row-gap: 12px;
    background-color: ${colors.backgroundSecondary};
    padding: 16px;
    border-radius: 16px;
`

type Props = NativeStackScreenProps<HomeStackParams, "Customer">

export const Customer = ({ navigation, route }: Props) => {
    const customerId = route.params.id
    const customers = useStore($customers)
    const currentUser = useStore($currentUser)
    const [reviewTitle, setReviewTitle] = useState("")
    const [reviewDescription, setReviewDescription] = useState("")
    const [currentStar, setCurrentStar] = useState(3)

    const customer = useMemo(() => {
        return customers.find(cust => cust.id === customerId)!
    }, [customers, customerId])

    const ratingsCount = useMemo(() => customer.reviews.length, [customer])

    useEffect(() => {
        navigation.setOptions({
            title: customer.name
        })
    }, [navigation])

    const onCreateReviewButtonClick = useCallback(() => {
        addReviewToCustomer({
            id: customerId,
            review: {
                id: uuid.v4().toString(),
                title: reviewTitle,
                description: reviewDescription,
                rating: currentStar,
                reviewer: currentUser.name
            }
        })
    }, [addReviewToCustomer, customerId, currentUser, reviewDescription, reviewTitle, currentStar, uuid])

    const onSetStarButtonClick = useCallback((stars: number) => { 
        setCurrentStar(stars)
    }, [setCurrentStar])

    return (
        <Wrapper>
            <AvatarWrapper>
                <AvatarView>
                    <AvatarIcon />
                </AvatarView>
            </AvatarWrapper>

            <Section title="Инфо">
                <TextWrapper>
                    <RoleText>{customer.role}</RoleText>
                    <MailText>{customer.mail}</MailText>
                    <IdText>{customer.id}</IdText>
                </TextWrapper>

                <RatingView>
                    {[1, 2, 3, 4, 5].map(el => (
                        <IconStar 
                            size={24}
                            color={el <= customer.rating ? "#ed8a19" : colors.lightgray} 
                            key={el}
                        />
                    ))}
                    <RatingCountText>{`(${ratingsCount})`}</RatingCountText>
                </RatingView>
            </Section>

            {customer.vacancies.length !== 0 && <Section title="Вакансии">
                <VacanciesWrapper>
                    {customer.vacancies.map((el, index) => (
                        <VacancyRow 
                            id={el.id}
                            title={el.title}
                            description={el.description}
                            tasks={el.tasks}
                            key={index.toString()}
                            creator={el.creator}
                            creatorId={el.creatorId}
                            date={el.date}
                        />
                    ))}
                </VacanciesWrapper>
            </Section>}

            {customer.reviews.length !== 0 && <Section title="Отзывы">
                <ReviewsWrapper>
                    {customer.reviews.map((el, index) => (
                        <ReviewRow 
                            id={el.id}
                            title={el.title}
                            description={el.description}
                            rating={el.rating}
                            reviewer={el.reviewer}
                            key={index.toString()}
                        />
                    ))}
                </ReviewsWrapper>
            </Section>}

            <Section title="Добавление отзыва">
                <CreateReviewWrapper>
                    <SetStarWrapper>
                        {[1, 2, 3, 4, 5].map(el => (
                            <SetStarButton onPress={() => onSetStarButtonClick(el)}>
                                <IconStar 
                                    size={24}
                                    color={el <= currentStar ? "#ed8a19" : colors.lightgray} 
                                    key={el}
                                />
                            </SetStarButton>
                        ))}
                    </SetStarWrapper>
                    <CreateReviewInput 
                        value={reviewTitle}
                        placeholder="Enter a review title"
                        placeholderTextColor={colors.lightgray}
                        onChangeText={setReviewTitle}
                    />
                    <CreateReviewDescriptionInput 
                        value={reviewDescription}
                        placeholder="Enter a review description"
                        placeholderTextColor={colors.lightgray}
                        onChangeText={setReviewDescription}
                    />
                    <CreateReviewButton onPress={onCreateReviewButtonClick}>
                        <CreateReviewButtonText>Добавить</CreateReviewButtonText>
                    </CreateReviewButton>
                </CreateReviewWrapper>
            </Section>
        </Wrapper>
    )
}