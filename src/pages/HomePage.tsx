import { useEffect, useState } from 'react';
import styled from 'styled-components';

import { EventData } from '../types';
import { generateData } from '../utils/data';
import { EventsByMonth, YesNoPercentage } from '../components';

// TODO delete this
import events from '../tmp/matches.json';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
`;

export const HomePage = () => {
  const [eventData, setEventData] = useState<EventData>();

  // const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   if (e.target && e.target.files) {
  //     const fileReader = new FileReader();
  //     fileReader.readAsText(e.target.files[0], 'UTF-8');
  //     fileReader.onload = (e) => {
  //       const remoteEvents = JSON.parse(e.target?.result as string) as Array<Event>;
  //       setEventData(generateData(remoteEvents));
  //     };
  //   }
  // };

  // TODO: remove this when testing is ready
  useEffect(() => {
    const gd = generateData(events);
    console.log(gd);
    setEventData(gd);
  }, []);

  return (
    <StyledDiv>
      <EventsByMonth data={eventData?.eventsByMonth} />
      <YesNoPercentage data={eventData?.yesNoPercentage} />
      {/* <input type="file" onChange={handleFileUploadChange} /> */}
    </StyledDiv>
  );
};
