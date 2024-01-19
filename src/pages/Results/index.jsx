import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Title,
  BookContainer,
  Book,
  BookImage,
  Wrapper,
  Author,
  Header,
  BookThumbnail,
  BookList,
  Term,
  TermList,
  Popup,
  About
} from './elements';
import Collapse from './Collapse';
function Results() {
  const location = useLocation();
  const [result, setResult] = useState(location.state?.result[0]);
  const [terms, setTerms] = useState(location.state?.result[1]);
  const [books, setBooks] = useState(location.state?.result[2]);
  const navigate = useNavigate();

  
  useEffect(() => {
    if (result) {
      setResult(result.sort((a, b) => (a.weight > b.weight) ? -1 : 1))
    } else {
      navigate('/')
    }
  }, [result])
  
  return (
      <Wrapper>
      <Header>Dine topp 10 readalikes</Header>
      <BookContainer>
        {result
        .sort((a, b) => (a.weight > b.weight) ? -1 : 1)
        .slice(0, 10)
        .map((readalike) => (
          <Book>
            <Author>
              {readalike.simplifiedPresentationMetadata.title}
            </Author>
            <Title>
              {readalike.simplifiedPresentationMetadata.authors[0]}
            </Title>
            <Popup readalike={readalike} trigger={<BookImage src={readalike.simplifiedPresentationMetadata.coverImage} alt="book cover" />}/>
          </Book>
        ))}
      </BookContainer>
      
      <Collapse 
      header="Flere bøker"
      children={
      <BookList>
      {result
        .slice(10, 42)
        .map((readalike) => (
          <Popup readalike={readalike} trigger={<BookThumbnail src={readalike.simplifiedPresentationMetadata.coverImage} alt="book cover" />}/>
        ))}
      </BookList>
    } />
      
      <Header>Boksmaken din:</Header>
        <p>Beskrevet med 10 ord:</p>
      <TermList>
        {terms.sort((a, b) => (a.globalWeight > b.globalWeight) ? -1 : 1)
        .slice(0, 10)
        .map((term) => (
          <Term>
            {term.term.label}
          </Term>
        ))}
      </TermList>

      <Collapse 
        header={"Om resultatene"}
        children={
        <About>
          <p>
          Bøkene dine slås opp i Nestebok, en tjeneste som finner liknende bøker basert på leseropplevelsen. <br/>
          Resultatene har en tendens til å foretrekke populære, norske bøker.
          Leseropplevelsen legges inn av bibliotekarer, så bøker kan mangle.  <br/>
          Resultatene er basert på disse bøkene:
          </p>
          {books.map((book) => (
              <Popup readalike={book} trigger={<BookThumbnail src={book.simplifiedPresentationMetadata.coverImage} alt="book cover" />}/>
          ))}
          <p>
          Mangler en bok? Be bibliotekaren din om å logge den i Forrigebok! <br/>
          Shoutout Bibliotekssentralen og Forrigebok.  
          </p>
        </About>
        }
      />
    </Wrapper>
  );
}

export default Results;


