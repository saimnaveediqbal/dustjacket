import React from 'react';
import { BookPopup, Info, MainImage, Title, MiniImage, BasedOnList, BasedOn, ExternalButton } from './elements';
const BookComponent = ({ readalike, trigger }) => {
    return (
      <BookPopup trigger={trigger} modal>
        <MainImage src={readalike.simplifiedPresentationMetadata.coverImage} alt="book cover" />
        <Info>

        <Title>{readalike.simplifiedPresentationMetadata.title}</Title>
        <p>{readalike.simplifiedPresentationMetadata.authors[0]}</p>
        {readalike.basedOn && 
        <>
          <p>Denne anbefalingen er basert på disse bøkene:</p>
          <BasedOnList>
            {readalike.basedOn.map((book) => (
              <BasedOn>
                <MiniImage src={book.simplifiedPresentationMetadata.coverImage} />
                <span>{book.simplifiedPresentationMetadata.title}</span>
                <p>
                  {[...Array(book.rating)].map((e, i) => <span style={{color:"red"}}>⭐</span>)}
                </p>
              </BasedOn>
            ))}
          </BasedOnList>
        </>
        }
        {readalike.rating &&
        <p>
          {[...Array(readalike.rating)].map((e, i) => <span style={{color:"red"}}>⭐</span>)}
        </p>
        }
        <ExternalButton href={`https://nestebok.no/verk/${readalike.id}`}>Se i nestebok</ExternalButton>
        </Info>
      </BookPopup>
    );
  };
  
  export default BookComponent;
  