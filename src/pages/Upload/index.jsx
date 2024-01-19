import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Papa from 'papaparse';
import { FileInput, Wrapper, Container, Title, FileInputLabel, Description, Question, HowToContent } from './elements';
import Popup from 'reactjs-popup';


function Upload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    handleUpload(event);
  };
  

  const handleUpload = (event) => {
    if (event.target.files[0]) {
      console.log('Uploading file:', event.target.files[0]);
      Papa.parse(event.target.files[0], {
        complete: function(results) {
          navigate('/loading', { state: { result: results } })
        },
        header: true,
        dynamicTyping: true,
      });
    } else {
      console.log('No file selected');

    }
  };
  
  return (
    <Container>
      <Wrapper>
        <Title>Dustjacket</Title>
        <Description>Dustjacket bruker omtalene dine på goodreads for å finne bøker du hadde likt, basert på bibliotekarers anmeldelser</Description>
        <FileInputLabel for="file-upload">Last opp data fra Goodreads</FileInputLabel>
        <FileInput type="file" id="file-upload" onChange={handleFileChange} />
        <Popup trigger={<Question>Hvordan laster jeg opp data fra Goodreads?</Question>}>
          <HowToContent>
            <p>1. Gå til <a href="https://www.goodreads.com/review/import">https://www.goodreads.com/review/import</a></p>
            <p>2. Trykk på "Export Library" og lagre filen</p>
            <p>3. Last opp filen her</p>
          </HowToContent>
        </Popup>
        <Popup trigger={<Question>Hvordan funker det?</Question>}>
          <HowToContent>
            <p><a href='https://nestebok.no'><i>Nestebok</i></a> er en tjeneste som finner liknende bøker basert på leseropplevelsen, utviklet av <a href='https://www.bibsent.no/'>Biblioteksentralen.</a> Denne nettsiden søker opp i Nestebok, de bøkene du har anmeldt i Goodreads, og fremhever de bøkene som dukker opp mest. Altså en ganske enkel analyse, men kanskje jeg forbedrer det etterhvert!</p>
            <p>Takk til Biblioteksentralen for at at <a href='https://forrigebok.no/api'>forrigebok.no/api</a> er åpent og gratis, og takk til bedriftsrepresentaten som fortalte meg om det på stand.</p>
          </HowToContent>
        </Popup>
      </Wrapper>
    </Container>
  );
}

export default Upload;