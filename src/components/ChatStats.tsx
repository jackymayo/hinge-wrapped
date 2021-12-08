import { sortBy, sumBy } from 'lodash';
import styled from 'styled-components';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
  LayoutPosition
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

import { EventData } from '../types';
import { Header } from './Text';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10% 5% 5%;
  justify-content: space-evenly;
  align-items: center;
`;

const TimeOfDayWrapper = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10% 5% 5%;
  justify-content: space-evenly;
  align-items: center;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StyledDivCol = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10% 5%;
  justify-content: space-evenly;
  align-items: center;
`;

const RadarDiv = styled.div`
  width: 100%;

  @media (max-width: 768px) {
    width: 90%;
  }
`;

const EmojiDiv = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-evenly;
  margin-top: 3%;
`;

const EmojiSpan = styled.span`
  font-size: 60px;
`;

// const ArrowImgLeft = styled.img`
//   position: absolute;
//   bottom: 0;
//   left: 0;
//   z-index: -1;
//   opacity: 0.8;
//   margin-bottom: -60px;
//   margin-left: 30px;
//   transform: rotate(270deg);

//   @media (max-width: 768px) {
//     margin-bottom: -50px;
//     margin-left: 20px;
//   }
// `;

// const ArrowImg = styled.img`
//   position: absolute;
//   top: 0;
//   left: 0;
//   z-index: -1;
//   opacity: 0.8;
//   margin-top: -60px;
//   margin-left: -30px;

//   @media (max-width: 768px) {
//     margin-top: -10px;
//     margin-left: 30px;
//   }
// `;

const StyledSpan = styled.div`
  position: relative;
`;

interface Props {
  data?: EventData;
}

export const ChatStats = ({ data }: Props) => {
  if (!data) {
    return <></>;
  }

  const totalChats = sumBy(data?.eventsByMonth, 'chats');

  const sortedEmojis = sortBy(
    Object.entries(data?.chatWordFrequency.emojiFrequency || {}).map(([key, value]) => ({
      key,
      value
    })),
    'value'
  )
    .reverse()
    .slice(0, 3);

  const radarLabels = data?.chatTimeOfDayFrequency
    .map(({ hour }) => hour)
    .map((hour) => {
      if (+hour === 12) return '12PM';
      else if (+hour === 0) return '12AM';
      return +hour < 13 ? `${+hour}AM` : `${+hour - 12}PM`;
    });

  const radarData = {
    labels: radarLabels,
    datasets: [
      {
        label: '# of Messages Sent',
        data: data?.chatTimeOfDayFrequency.map(({ count }) => count),
        backgroundColor: 'rgba(181,82,226,0.2)',
        borderWidth: 0
      }
    ]
  };

  const radarOptions = {
    plugins: {
      title: {
        display: false
      },
      legend: {
        position: 'bottom' as LayoutPosition
      },
      animation: {
        duration: 0
      }
    }
  };

  const maxChatHourIndex = data?.chatTimeOfDayFrequency.reduce(
    (acc, curr, i) => {
      if (curr.count > acc.count) {
        return {
          index: i,
          count: curr.count
        };
      }

      return acc;
    },
    { index: 0, count: 0 }
  ).index;

  return (
    <>
      <TimeOfDayWrapper>
        <Header>
          You sent the most messages at <b>{radarLabels[maxChatHourIndex]}</b>
        </Header>
        <RadarDiv>
          <Radar data={radarData} options={radarOptions} />
        </RadarDiv>
      </TimeOfDayWrapper>
      <StyledDiv>
        <StyledSpan>
          <Header>
            You're quite the sweet talker! You had <b>{totalChats.toLocaleString()}</b> chats where
            on average you sent <b>{data?.averageChatLength.toFixed(0)}</b> messages.
          </Header>
          {/* <ArrowImgLeft src="/static/img/arrow.png" width={100} /> */}
        </StyledSpan>

        <StyledSpan>
          <Header>
            In your longest conversation you sent <b>{data?.maxChatLength}</b> messages (
            <i>no you hang up</i>)
          </Header>
          {/* <ArrowImg src="/static/img/arrow.png" width={100} /> */}
        </StyledSpan>
      </StyledDiv>
      <StyledDivCol>
        <Header>You showed a lot of emotion, these were your favorite</Header>

        <EmojiDiv>
          {sortedEmojis.map((e) => (
            <EmojiSpan key={e.key}>{e.key}</EmojiSpan>
          ))}
        </EmojiDiv>
      </StyledDivCol>
    </>
  );
};
