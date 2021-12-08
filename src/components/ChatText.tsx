import { sumBy } from 'lodash';
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

interface Props {
  data?: EventData;
}

export const ChatText = ({ data }: Props) => {
  const totalChats = sumBy(data?.eventsByMonth, 'chats');

  return (
    <StyledDiv>
      <Header>
        You're quite the sweet talker! You had <b>{totalChats.toLocaleString()}</b> chats where on
        average you sent <b>{data?.averageChatLength.toFixed(0)}</b> messages.
      </Header>
      <Header>
        In your longest conversation you sent <b>{data?.maxChatLength}</b> messages (
        <i>no you hang up</i>)
      </Header>
    </StyledDiv>
  );
};
