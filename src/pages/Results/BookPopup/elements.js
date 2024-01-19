import styled from 'styled-components';
import Popup from 'reactjs-popup';

export const BookPopup = styled(Popup)`
    &-content {
        background-color: #eee0cb;
        color: black;
        width: 50%;
        height: 60%;
        padding: 1rem;
        border-radius: 1rem;
        animation: fadein 0.4s ease-out;
        -webkit-animation: fadein 0.4s ease-out;
        display: flex;
        align-items: center;
        @keyframes fadein {
            0% {
                transform: scale(1) translateY(0px);
                opacity: 0;
                box-shadow: 0 0 0 rgba(241, 241, 241, 0);
            }        
            1% {
                transform: scale(0.96) translateY(10px);
                opacity: 0;
                box-shadow: 0 0 0 rgba(241, 241, 241, 0);
            }
            100% {
                transform: scale(1) translateY(0px);
                opacity: 1;
                box-shadow: 0 0 500px rgba(241, 241, 241, 0);  
            }
        }
        @media (max-width: 768px) {
            width: 80%;
            height: 80%;
            flex-direction: column;
            justify-content: space-around;
            align-items: center;
        }
    }

    &-overlay {
        background-color: rgba(0,0,0,0.5);
    }
`;
export const Info = styled.div`
    display: flex;
    flex-direction: column;
    padding: 3%;
    flex-grow: 1;
    @media (max-width: 768px) {
        flex-grow: 0;
        width: 80%;
    }
`
export const MainImage = styled.img`
    border-radius: 1rem;
    width: 40%;
    object-fit: contain;
    flex-shrink: 0;
`

export const Title = styled.h1`
    font-family: "Emberly";
    font-size: "1.3rem";
    margin-bottom: 0;
`

export const BasedOnList = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
`

export const MiniImage = styled.img`
    width: 40%;
    border-radius: 0.5rem;
`

export const BasedOn = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

export const ExternalButton = styled.a`
    align-self: center;
    width: 40%;
    text-align: center;
    padding: 1rem;
    text-decoration: none;
    color: white;
    background-color: #31081F;
    border-radius: 10rem;
    transition: opacity 0.2s ease-in-out;
    &:hover {
        opacity: 0.8;
    }
`