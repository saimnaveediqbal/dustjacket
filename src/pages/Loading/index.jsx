import React, { useState, useEffect, CSSProperties } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
import { useLocation, useNavigate } from 'react-router-dom';
import { LoadingText, Wrapper } from './elements';
function Loading() {
  const navigate = useNavigate();
  const location = useLocation();
  const [result, setResult] = useState(location.state?.result);
  const [finishedLookup, setFinishedLookup] = useState(false);
  const [finishedReadalikes, setFinishedReadalikes] = useState(false);
  const [loadingText, setLoadingText] = useState("Laster inn bøkene dine")

  useEffect(() => {
    const texts = ["Laster inn bøkene dine", "Dette kan ta litt tid"] 
    const interval = setInterval(() => {
      if (!finishedLookup) {
        setLoadingText((prevText) => (prevText === texts[0] ? texts[1] : texts[0]));
      }
    }
    , 4000);
    return () => clearInterval(interval);
  });
  useEffect(() => {
    if (result) {
      loadBooks(result);
    } else {
      navigate('/')
    }
  }, [result]);


  const loadBooks = async (result) => {
    const data = result.data.filter((book) => book["Exclusive Shelf"] === 'read');
    const books = await Promise.all(
      data.map(async (bookData, index) => {
        let book = await lookupBookByISBN(bookData);
        if (book == null) {
          await new Promise(resolve => setTimeout(resolve, index * 50));
          book = await lookupBookByAuthorTitle(bookData);
        }
        if (book == null) {
          await new Promise(resolve => setTimeout(resolve, index * 50));
          book = await lookupBookByLocalizedName(bookData);
        }
        if (book == null) {
          console.log("Could not find book:", bookData)
          return
        }
        book.rating = bookData["My Rating"];
        return book;
      })
    );

    const filteredBooks = books.filter((book) => book != null);
    const terms = await analyzeTerms(filteredBooks);
    setFinishedLookup(true);
    analyzeReadalikes(filteredBooks, terms);
  };

  const analyzeTerms = async (books) => {
    let terms = []
    books.filter((book) => book.rating > 3)
    .forEach((book) => {
      book.appealTerms.filter((term) => term.averageWeight >= 0.3)
      .forEach((term) => {
          if (!terms.some((item) => item.term.id === term.term.id)) {
            term.globalWeight = term.averageWeight * (0.5*book.rating - 1)
            terms.push(term)
          } else {
            const index = terms.findIndex((item) => item.term.id === term.term.id)
            terms[index].globalWeight += term.globalWeight * (0.5*book.rating - 1)
          }
        })
    })
    
    terms = terms.sort((a, b) => (a.globalWeight > b.globalWeight) ? -1 : 1);

    const response = await fetch(`https://forrigebok.no/api/v2023-01-12/vocabulary`);
    const result = await response.json();
    const facets = result.facets.map((facet) => facet.name)
    const optimalBook = {}
    facets.forEach((facet) => {
      optimalBook[facet] = terms.filter((term) => term.term?.facet?.label?.includes(facet))[0]?.term?.label
    })
    console.log(optimalBook)
    terms = terms.slice(0, 10)
    return terms
  }
  
  const findReadalikesFromBooks = async (books) => {
    const bookIds = new Set(books.map(book => book.id))
    const fetchPromises = books.map(async (book) => {
      const response = await fetch(`https://forrigebok.no/api/v2023-01-12/readalikes?workId=${book.id}`);
      const result = await response.json();
      const readalikes = result.readalikes.filter(readalike => !bookIds.has(readalike.id))
      book.readalikes = readalikes;
    })
    await Promise.all(fetchPromises)
    return books
  }

  // const findReadalikesFromTerms = async (books, terms) => {
  //   const bookIds = new Set(books.map(book => book.id))
  //   //comma separated list of term ids
  //   const termIds = terms.map(term => term.term.id).join(',')
  //   const response = await fetch(`https://forrigebok.no/api/v2023-01-12/readalikes?terms=${termIds}`);
  //   const result = await response.json();
  //   console.log(result)
  //   const readalikes = result.readalikes.filter(readalike => !bookIds.has(readalike.id))
  //   console.log(readalikes)
  //   return terms
  // }
  
  const analyzeReadalikes = async (books, terms) => {
    books = await findReadalikesFromBooks(books)
    setFinishedReadalikes(true);
    const readalikes = []
    books.forEach((book) => {
      book.readalikes.forEach((readalike) => {
        if (!readalikes.some((item) => item.id === readalike.id)) {
          readalike.weight = 1 * (book.rating - 2.5)
          readalike.basedOn = [book]
          readalikes.push(readalike)
        } else {
          const index = readalikes.findIndex((item) => item.id === readalike.id)
          readalikes[index].weight += 1 * (book.rating - 2.5)
          readalikes[index].basedOn.push(book)
        }
      })
    })
    navigate('/result', { state: { result: [readalikes, terms, books] } })
  }
    
  return (
    <Wrapper> 
      {(!(finishedLookup && finishedReadalikes) || true) && 
      (
      <div>
        <ScaleLoader 
            color={'#EEE0CB'}
            height={100}
            width={20}
            radius={5}
            margin={5}
            speedMultiplier={0.25}
            loading={!finishedLookup || !finishedReadalikes}
            aria-label="Loading Spinner"
            data-testid="loader"
        />
        <LoadingText>{!finishedLookup ? loadingText : "Finner bøker som likner"}</LoadingText>
      </div>
      )
    } 
    </Wrapper>
  );
}

export default Loading;

async function lookupBookByISBN(book) {
  let response;
  if (book.ISBN13 !== '=""') {
    response = await fetch(`https://forrigebok.no/api/v2023-01-12/works?isbn${book.ISBN13}`);
  } else if (book.ISBN !== '=""') {
    response = await fetch(`https://forrigebok.no/api/v2023-01-12/works?isbn${book.ISBN}`);
  } else {
    return null;
  }
  try {
    const terms = await response.json();
    if (terms.works[0]) {
      return terms.works[0];
    }
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
} 

async function lookupBookByAuthorTitle(book) {
  const response = await fetch(`https://forrigebok.no/api/v2023-01-12/works?query=${book.Title}`);
  try {
    const terms = await response.json();
    let foundBook;
    if (terms.works.length > 0) {
      foundBook = terms.works.filter((work) => work.simplifiedPresentationMetadata.authors.includes(book["Author l-f"]))[0]
    }
    return foundBook
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}

async function lookupBookByLocalizedName(book) {
  //Find translated title in bibby
  let response;
  const authorTitle = book["Author l-f"] + " " + book.Title
  response = await fetch(`https://bibliografisk.bs.no/v1/works?query=${authorTitle}`);

  try {
    const books = await response.json();
    const foundBooks = books.works[0].publications.filter((publications) => publications.language == "nob")
    if (foundBooks[0]) {
      const localizedTitle = foundBooks[0].name
      book.Title = localizedTitle
      return await lookupBookByAuthorTitle(book)
    }
  } catch (error) {
    console.log('Error:', error);
    return null;
  }
}