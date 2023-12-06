import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const ChevronUpIcon = () => {
  return (
    <Svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M6 15l6-6 6 6"
        stroke="#fff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}