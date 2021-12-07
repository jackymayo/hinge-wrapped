import { useState } from 'react';
import styled from 'styled-components';

import { Match } from '../types';

const StyledDiv = styled.div`
  display: flex;
`;

export const HomePage = () => {
  const [matches, setMatches] = useState<Array<Match>>([]);

  const handleFileUploadChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target && e.target.files) {
      const fileReader = new FileReader();
      fileReader.readAsText(e.target.files[0], 'UTF-8');
      fileReader.onload = (e) => {
        setMatches(JSON.parse(e.target?.result as string));
      };
    }
  };

  console.log(matches);
  return (
    <StyledDiv>
      <input type="file" onChange={handleFileUploadChange} />
    </StyledDiv>
  );
};
