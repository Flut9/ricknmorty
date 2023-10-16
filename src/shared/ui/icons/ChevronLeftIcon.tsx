import Svg, { Path } from "react-native-svg"

import { SvgProps } from "../../types/SvgIconProps"

type Props = SvgProps & {}

const ChevronLeftIcon = ({ fill = "#fff" }: Props) => {
    return (
        <Svg
            width={11}
            height={18}
            fill="none"
        >
            <Path
                d="M.515 8.814c0-.244.088-.469.274-.645L8.533.591a.869.869 0 01.635-.254c.508 0 .898.381.898.89a.936.936 0 01-.264.634L2.693 8.814l7.11 6.953c.156.166.263.38.263.635 0 .508-.39.889-.898.889a.84.84 0 01-.635-.264L.789 9.458a.88.88 0 01-.274-.644z"
                fill={fill}
            />
        </Svg>
    )
}

export default ChevronLeftIcon