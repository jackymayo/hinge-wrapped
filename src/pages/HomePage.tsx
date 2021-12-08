import { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { EventData, Event } from '../types';
import { generateData } from '../utils/data';
import {
  EventsByMonth,
  YesNoPercentage,
  ChatWordCloud,
  Title,
  ChatText,
  IntroP
} from '../components';
import { COLORS, MATCHES_FILE_NAME } from '../constants';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: scroll;
`;

const Intro = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 10%;
`;

const Topbar = styled.div`
  font-family: 'Source Serif Pro', serif;
  width: 100%;
  margin-left: 10px;
  padding-top: 10px;
  position: fixed;
  top: 0;
  left: 0;
  font-weight: 400;
  font-size: 25px;
  background-color: white;
`;

const FileInput = styled.input`
  font-family: 'IBM Plex Sans', sans-serif;
`;

const Pill = styled.div`
  width: 40%;
  padding: 10px;
  font-family: 'IBM Plex Sans', sans-serif;
  margin-top: 2%;
  margin-bottom: 2%;
  text-align: center;
  border-radius: 10px;
`;

const ErrorPill = styled(Pill)`
  background-color: ${COLORS.red};
`;

const InfoPill = styled(Pill)`
  background-color: ${COLORS.grey};
`;

const PlainLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

export const HomePage = () => {
  const [eventData, setEventData] = useState<EventData>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(true);

    if (e.target && e.target.files) {
      if (e.target.files[0].name === MATCHES_FILE_NAME) {
        const fileReader = new FileReader();
        fileReader.readAsText(e.target.files[0], 'UTF-8');
        fileReader.onload = (e) => {
          const remoteEvents = JSON.parse(e.target?.result as string) as Array<Event>;
          const generatedData = generateData(remoteEvents);
          setIsLoading(false);
          setEventData(generatedData);
        };
      } else {
        setErrorMessage('This is the wrong file. Click here to see instructions.');
      }
    }
  };

  return (
    <StyledDiv>
      {!eventData && (
        <Intro>
          <Title text="Hinge Wrapped" />
          <IntroP>
            Are you a hopeless romantic? Or maybe more of a data-driven one? <br />
            Get insights about your Hinge activity and love life this past year.
          </IntroP>

          <IntroP>
            Upload the <code>matches.json</code> file from your export below to get started. Read
            the <Link to="/instructions">instructions</Link> if you're not sure what this is.
          </IntroP>

          {errorMessage && (
            <ErrorPill>
              <PlainLink to="">{errorMessage}</PlainLink>
            </ErrorPill>
          )}

          {isLoading && <InfoPill>Crunching numbers...</InfoPill>}

          <FileInput type="file" onChange={handleFileUploadChange} accept="application/JSON" />
        </Intro>
      )}

      {eventData && (
        <>
          <Topbar>Hinge Wrapped</Topbar>
          <YesNoPercentage data={eventData?.yesNoPercentage} />
          <EventsByMonth data={eventData?.eventsByMonth} />
          <ChatText data={eventData} />
          <ChatWordCloud data={eventData?.chatWordFrequency} />
        </>
      )}
    </StyledDiv>
  );
};
