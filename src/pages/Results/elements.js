import styled from 'styled-components';
import BookPopup from './BookPopup';
import CollapseComponent from './Collapse';
export const Header = styled.h1`
    font-size: 5rem;
    padding: 0;
    margin-top: 2rem;
    margin-bottom: 0;
    font-family: "Emberly";
    transition: font-weight 1s ease-in-out;
    font-weight: 100;
    font-stretch: 100%;
    &:hover {
        font-weight: 1000;
        font-stretch: 125%;
    }
`;

export const Wrapper = styled.div`
    width: 100%;
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    background-color: #31081F;
    color: white;
    overflow-x: hidden;
    @media (max-width: 768px) {
        margin-bottom: 0;
    }
`;

export const BookContainer = styled.div`
    background-color: #31081F;
    overflow-x: scroll;
    overflow-y: hidden;
    color: white;
    display: flex;
    flex-direction: row;
    width: 100%;
    padding: 50px 10px;
    flex-shrink: 0;
    @media (max-width: 768px) {
        margin-top: 0;
        padding: 0;
    }
`;
    
export const Book = styled.div`
    width: 19%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: end;
    margin: 0;
    padding: 0;
    flex-shrink: 0;
    @media (max-width: 768px) {
        width: 40%;
        margin-right: 10px;
    }
`;

export const BookImage = styled.img`
    width: 90%;
    height: calc(0.9*0.19*90vw*1.8);
    object-fit: cover;
    border-radius: 1rem;
    transition: all 0.5s ease-in-out;
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
    @media (max-width: 768px) {
        height: calc(0.9*0.4*90vw*1.8);
    }
`;

export const Author = styled.p`
    margin: 0.1rem;
    font-weight: 900;
`
export const Title = styled.p`
    margin: 0;
`

export const BookList = styled.div`
    flex-wrap: wrap;
    color: white;
    display: flex;
    flex-direction: row;
    width: 80%;
    background-color: #EEE0CB;
    border-radius: 1rem;
    justify-content: space-around;
    margin: auto;
`;
    
export const BookThumbnail = styled.img`
    width: 5%;
    height: calc(0.9*0.05*90vw*1.6);
    object-fit: cover;
    border-radius: 0.6vw;
    transition: all 0.5s ease-in-out;
    &:hover {
        transform: scale(1.1);
        cursor: pointer;
    }
    margin: 0.5rem;
    @media (max-width: 768px) {
        width: 15%;
        height: calc(0.9*0.15*90vw*1.6);
    }
`;

export const TermList = styled.div`
    flex-wrap: wrap;
    color: white;
    display: flex;
    flex-direction: row;
    width: 80%;
    background-color: #EEE0CB;
    color: black;
    border-radius: 1rem;
`;

export const Term = styled.p`
    margin: 0.5rem 0.85rem;
    font-size: 1.5rem;
    font-weight: 900;
`;

export const Popup = styled(BookPopup)`
    &-content {
        background-color: #eee0cb;
        color: black;
        width: 50%;
        height: 60%;
        padding: 1rem;
        border-radius: 1rem;
        animation: fadein 0.4s ease-out;
        -webkit-animation: fadein 0.4s ease-out;
        @keyframes fadein {
            0% {    transform: scale(1) translateY(0px);    opacity: 0;    box-shadow: 0 0 0 rgba(241, 241, 241, 0);  }  1% {    transform: scale(0.96) translateY(10px);    opacity: 0;    box-shadow: 0 0 0 rgba(241, 241, 241, 0);  }  100% {    transform: scale(1) translateY(0px);    opacity: 1;    box-shadow: 0 0 500px rgba(241, 241, 241, 0);  }
        }
    }
    &-overlay {
        background-color: rgba(0,0,0,0.5);
    }
`;

export const Collapse = styled(CollapseComponent)``;

export const About = styled.div`
    box-sizing: border-box;
    color: white;
    width: 80%;
    background-color: #EEE0CB;
    color: black;
    border-radius: 1rem;
    margin: auto;
    margin-bottom: 2rem;
    padding: 1rem;
    font-size: 1.1rem;
    line-height: 1.5rem;
`;