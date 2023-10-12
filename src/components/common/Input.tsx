import { View, StyleSheet, TextInput } from "react-native"
import { KeyboardTypeOptions } from "react-native/types"

import SearchIcon from "../../assets/icons/SearchIcon"
import { colors } from "../../assets/colors"

type Props = {
    value?: string,
    placeholder?: string,
    keyboardType?: KeyboardTypeOptions,
    autoCapitalized?: "none" | "words" | "sentences" | "characters",
    placeholderTextColor?: string, 
    onChangeText: (text: string) => void
}

const Input = (props: Props) => {
    return (
        <View style={styles.container}>
            <SearchIcon />
            <TextInput style={styles.textInput} {...props} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
        columnGap: 15,
        maxHeight: 45,
        paddingHorizontal: 15,
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 20
    },
    textInput: {
        flex: 1,
        color: colors.white
    }
})

export default Input