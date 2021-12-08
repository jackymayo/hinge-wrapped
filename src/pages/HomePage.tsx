import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { EventData, Event } from '../types';
import { generateData } from '../utils/data';

// TODO delete this
import events from '../tmp/matches.json';

const StyledDiv = styled.div`
  display: flex;
`;

export const HomePage = () => {
  const [eventData, setEventData] = useState<EventData>();

  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (e) => {
        const remoteEvents = JSON.parse(e.target?.result as string) as Array<Event>;
        setEventData(generateData(remoteEvents));
      };
    }
  };

  // useEffect(() => {
  //   console.log(events);
  //   console.log(generateData(events));
  // });

  return (
    <StyledDiv>
      <code>{JSON.stringify(eventData, null, 2)}</code>
      <input type="file" onChange={handleFileUploadChange} />
    </StyledDiv>
  );
};
