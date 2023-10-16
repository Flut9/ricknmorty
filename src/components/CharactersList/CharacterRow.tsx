import { View, Text, Image, StyleSheet } from "react-native"

import { colors } from "../../shared/ui/theme/colors"

type Props = {
    name: string,
    image: string
}

const CharacterRow = ({ name, image }: Props) => {
    return (
        <View style={styles.container}>
            <Image style={styles.image} source={{uri: image}} />
            <Text style={styles.text}>{name}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 15,
        padding: 15,
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 20
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 25
    },
    text: {
        flex: 1,
        color: colors.white
    }
})

export default CharacterRow