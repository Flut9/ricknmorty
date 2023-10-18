import styled, { css } from "styled-components/native"

const SpacerView = styled.View<{ size: number, axis?: SpacerAxis }>`
    ${props => {
        switch (props.axis) {
            case "vertical":
                return css`
                    height: ${props.size}px;
                `
            case "horizontal":
                return css`
                    width: ${props.size}px;
                `
        }
    }}
`

type Props = {
    size: number,
    axis?: SpacerAxis
}

type SpacerAxis = "vertical" | "horizontal"

const Spacer = ({ size, axis = "vertical" }: Props) => {
    return (
        <SpacerView size={size} axis={axis} />
    )
}

export default Spacer