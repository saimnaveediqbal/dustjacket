import styled from 'styled-components';

export const LoadingText = styled.p`
    font-size: 2rem;
    margin: 0;
    padding: 0;
    margin-bottom: 2rem;
    font-family: "Emberly";
    animation: weight 2s ease-in-out infinite alternate;
    font-weight: 100;
    font-stretch: 100%;
    @keyframes weight {
        from {
            font-weight: 100;
        }
        to {
            font-weight: 1000;
        }
    }
`;
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: auto;
    height: 100%;
    justify-content: center;
    background-color: #31081F;
    color: white;
`;


    