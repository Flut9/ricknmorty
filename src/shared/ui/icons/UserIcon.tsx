import * as React from "react"
import Svg, { Path } from "react-native-svg"

type Props = {
    color?: string
}

export const UserIcon = ({ color = "#fff" }: Props) => {
  return (
    <Svg
      width="32px"
      height="32px"
      viewBox="0 0 24 24"
      fill="none"
    >
      <Path
        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  )
}
