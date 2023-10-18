import styled from "styled-components/native"
import { colors } from "../../shared/ui/theme/colors"

const ContainerView = styled.View`
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${colors.backgroundSecondary};
`

const ActivityIndicator = styled.ActivityIndicator``

const Loader = () => {
    return (
        <ContainerView>
            <ActivityIndicator />
        </ContainerView>
    )
}

export default Loader