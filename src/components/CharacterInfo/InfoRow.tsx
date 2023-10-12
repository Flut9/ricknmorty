import { View, Text, StyleSheet } from "react-native"

import { colors } from "../../assets/colors"

type Props = {
    title: string,
    details: string
}

const InfoRow = ({ title, details }: Props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.titleText}>{title}</Text>
            <Text style={styles.detailsText}>{details}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        rowGap: 5,
        paddingVertical: 10
    },
    titleText: {
        color: colors.lightgray,
        fontSize: 14
    },
    detailsText: {
        color: colors.white,
        fontSize: 18
    }
})

export default InfoRow