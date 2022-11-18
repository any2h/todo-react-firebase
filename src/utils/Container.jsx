import styled from "styled-components"

const StyledContainer = styled.div`
    max-width: 40rem;
    margin-inline: auto;
    margin-top: 2rem;
    padding-inline: 1rem;
    background-color: rgb(184, 181, 255);
    border-radius: 20px;
`

const Container = ({ children }) => {
    return (
        <StyledContainer>{children}</StyledContainer>
    )
}

export default Container
