import { sortBy, sumBy } from 'lodash';
import styled from 'styled-components';

import { EventData } from '../types';
import { Header } from './Text';

const StyledDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 10% 5% 5%;
  justify-content: space-evenly;
  align-items: center;
`;

const StyledDivCol = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10% 5%;
  justify-content: space-evenly;
  align-items: center;
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

const ArrowImgLeft = styled.img`
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  opacity: 0.8;
  margin-bottom: -60px;
  margin-left: 30px;
  transform: rotate(270deg);

  @media (max-width: 768px) {
    margin-bottom: -50px;
    margin-left: 20px;
  }
`;

const ArrowImg = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  opacity: 0.8;
  margin-top: -60px;
  margin-left: -30px;

  @media (max-width: 768px) {
    margin-top: -80px;
    margin-left: -50px;
  }
`;

const StyledSpan = styled.div`
  position: relative;
`;

interface Props {
  data?: EventData;
}

export const ChatText = ({ data }: Props) => {
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

  return (
    <>
      <StyledDiv>
        <StyledSpan>
          <Header>
            You're quite the sweet talker! You had <b>{totalChats.toLocaleString()}</b> chats where
            on average you sent <b>{data?.averageChatLength.toFixed(0)}</b> messages.
          </Header>
          <ArrowImgLeft src="/static/img/arrow.png" width={100} />
        </StyledSpan>

        <StyledSpan>
          <Header>
            In your longest conversation you sent <b>{data?.maxChatLength}</b> messages (
            <i>no you hang up</i>)
          </Header>
          <ArrowImg src="/static/img/arrow.png" width={100} />
        </StyledSpan>
      </StyledDiv>
      <StyledDivCol>
        <Header>You showed a lot of emotion, these were your favorite</Header>

        <EmojiDiv>
          {sortedEmojis.map((e) => (
            <EmojiSpan>{e.key}</EmojiSpan>
          ))}
        </EmojiDiv>
      </StyledDivCol>
    </>
  );
};
