import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { Title, LeftP } from '../components';

const StyledDiv = styled.div`
  display: flex;
  height: calc(100vh - 100px);
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  margin: 50px;

  @media (max-width: 768px) {
    height: unset;
  }
`;

const ListItem = styled.li`
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 300;
  text-align: left;
`;

export const InstructionsPage = () => {
  const instructions = [
    'Open the Hinge app on your phone',
    'Navigate to your <b>Account settings</b> and select <b>Download My Data</b>',
    'You will receive a notification saying that they received your request',
    'Wait. This can take up to 24 hours',
    'When the data is ready for download, you will receive another notification. The link you receive is only valid for 48 hours',
    "Download the link to your phone and unzip it. At this point you can send the file to your computer if you don't want to do this on your phone.",
    'Inside you will see a file called <code>matches.json</code>, this is what you will use to build your Hinge Wrapped'
  ];

  return (
    <StyledDiv>
      <Title text="Instructions" />
      <ol>
        {instructions.map((i) => (
          <ListItem key={i} dangerouslySetInnerHTML={{ __html: i }} />
        ))}
      </ol>

      <LeftP>
        Everything we do is done on the browser and we do <b>NOT</b> store any data. This project is{' '}
        <a href="https://github.com/nikodraca/hinge-wrapped">open source</a> so you can see how
        everything is calculated.
      </LeftP>

      <LeftP>This project is in no way affiliated to Hinge</LeftP>

      <LeftP>
        <Link to="/">Ready to get started?</Link>
      </LeftP>
    </StyledDiv>
  );
};
