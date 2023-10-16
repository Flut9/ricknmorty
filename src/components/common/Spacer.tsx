import { View, StyleSheet } from "react-native"

type Props = {
    size: number,
    axis?: SpacerAxis
}

type SpacerAxis = "vertical" | "horizontal"

const Spacer = ({ size, axis = "vertical" }: Props) => {
    return (
        <View style={getStyles(axis, size).spacer} />
    )
}

const getStyles = (axis: SpacerAxis, size: number) => StyleSheet.create({
    spacer: axis === "vertical" ? { height: size } : { width: size }
})

export default Spacer