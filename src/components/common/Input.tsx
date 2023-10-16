import { View, StyleSheet, TextInput, TextInputProps } from "react-native"
import { KeyboardTypeOptions } from "react-native/types"

import SearchIcon from "../../shared/ui/icons/SearchIcon"
import { colors } from "../../shared/ui/theme/colors"

type Props = TextInputProps

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
        maxHeight: 45,
        paddingHorizontal: 15,
        backgroundColor: colors.backgroundSecondary,
        borderRadius: 20
    },
    textInput: {
        flex: 1,
        color: colors.white,
        marginLeft: 15
    }
})

export default Input