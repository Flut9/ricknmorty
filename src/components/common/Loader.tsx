import { View, ActivityIndicator, StyleSheet } from "react-native"

import { colors } from "../../shared/ui/theme/colors"

const Loader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: colors.backgroundSecondary
    }
})

export default Loader