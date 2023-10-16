import Svg, { Path } from "react-native-svg"

import { SvgProps } from "../../types/SvgIconProps"

type Props = SvgProps & {}

const SearchIcon = ({ fill = "#fff" }: Props) => {
    return (
        <Svg
            width={15}
            height={15}
            fill="none"
        >
            <Path
                d="M.797 6.89A6.242 6.242 0 017.03.657a6.242 6.242 0 016.235 6.235 6.162 6.162 0 01-1.282 3.773l3.82 3.844c.165.164.258.39.258.64 0 .524-.367.922-.898.922a.92.92 0 01-.664-.265l-3.844-3.852a6.18 6.18 0 01-3.625 1.172A6.242 6.242 0 01.797 6.891zm1.336 0a4.901 4.901 0 004.898 4.9 4.901 4.901 0 004.899-4.9A4.901 4.901 0 007.03 1.993a4.901 4.901 0 00-4.898 4.899z"
                fill={fill}
            />
        </Svg>
    )
}

export default SearchIcon