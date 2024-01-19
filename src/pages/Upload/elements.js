import styled from 'styled-components';


export const Title = styled.h1`
    font-size: 5rem;
    margin: 0;
    padding: 0;
    margin-bottom: 2rem;
    font-family: "Emberly";
    transition: font-weight 1s ease-in-out;
    font-weight: 100;
    font-stretch: 100%;
    &:hover {
        font-weight: 1000;
        font-stretch: 125%;
    }
`;

export const Container = styled.div`
    width: 100%;
    overflow-x: hidden;
    background-color: #31081F;
    color: white;
    display: flex;
`;
export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: auto;
    height: 100vh;
    width: 80%;
`;

export const FileInput = styled.input`
    display: none;
`;

export const FileInputLabel = styled.label`
    border-radius: 4rem;
    padding: 1rem 2rem;
    border: none;
    font-size: 1.5rem;
    background-color: #EEE0CB;
    cursor: pointer;
    color: black;
    margin-bottom: 2rem;
    &:hover {
        background-color: #E0CBAE;
    }
    &:active {
        background-color: #D4B78F;
    }
`;

export const Description = styled.p`
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
    margin-bottom: 2rem;
`;

export const Question = styled.p`
    font-size: 1.5rem;
    margin: 0;
    padding: 0;
    margin-bottom: 2rem;
    text-decoration: underline dotted;
    cursor: pointer;
`;

export const HowToContent = styled.div`
    color: black;
    background-color: #EEE0CB;
    padding: 1rem;
    width: 90%;
    margin: auto;
    margin-bottom: 2rem;
    border-radius: 1rem;
`;