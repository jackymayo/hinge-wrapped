import styled from 'styled-components';
import { Text } from '@visx/text';
import { scaleLog } from '@visx/scale';
import { Wordcloud } from '@visx/wordcloud';

import { EventData } from '../types';
import { COLORS } from '../constants';
import { Header } from './Text';

interface Props {
  data?: EventData['chatWordFrequency'];
}

interface WordData {
  text: string;
  value: number;
}

const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  height: 1000px;
`;

const EmojiSpan = styled.span`
  font-size: 50px;
`;

export const ChatWordCloud = ({ data }: Props) => {
  console.log(data);
  if (!data) return <></>;

  const words: Array<WordData> = Object.entries(data.wordFrequency).map(([key, value]) => ({
    text: key,
    value
  }));

  const fontScale = scaleLog({
    domain: [Math.min(...words.map((w) => w.value)), Math.max(...words.map((w) => w.value))],
    range: [10, 100]
  });

  const fontSizeSetter = (datum: WordData) => fontScale(datum.value);

  const getRotationDegree = () => {
    const rand = Math.random();
    const degree = rand > 0.5 ? 60 : -60;
    return rand * degree;
  };

  return (
    <StyledDiv>
      <Header>The conversations looked something like this...</Header>

      <Wordcloud
        words={words}
        width={window.innerWidth}
        height={window.innerHeight / 2}
        fontSize={fontSizeSetter}
        font={'Impact'}
        padding={2}
        spiral={'archimedean'}
        rotate={getRotationDegree}
      >
        {(cloudWords) =>
          cloudWords.map((w, i) => (
            <Text
              key={w.text}
              fill={Object.values(COLORS)[i % Object.keys(COLORS).length]}
              textAnchor={'middle'}
              transform={`translate(${w.x}, ${w.y}) rotate(${w.rotate})`}
              fontSize={w.size}
              fontFamily={w.font}
            >
              {w.text}
            </Text>
          ))
        }
      </Wordcloud>

      <Header>
        Your most used emoji was <EmojiSpan>😍</EmojiSpan>
      </Header>
    </StyledDiv>
  );
};
