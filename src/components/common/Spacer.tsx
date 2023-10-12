import { View } from "react-native"

type Props = {
    size: number,
    axis?: "vertical" | "horizontal"
}

const Spacer = ({ size, axis = "vertical" }: Props) => {
    return (
        <View style={axis === "vertical" ? {height: size} : {width: size}}></View>
    )
}

export default Spacer