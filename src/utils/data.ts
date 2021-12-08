import { parseISO } from 'date-fns';
import { range, words } from 'lodash';
import { YEAR } from '../constants';

import { EventData, MonthlyEventCount, Event, EventTypes, WordCount } from '../types';

// NOTE: Iiterating over the array multiple times because small dataset and it makes it easier to break up the work

export const getEventsByMonth = (events: Array<Event>): Array<MonthlyEventCount> => {
  // Construct default count objects
  const eventCount: any = {};
  for (const e in EventTypes) {
    eventCount[EventTypes[e as keyof typeof EventTypes]] = 0;
  }

  // get all months in the given year
  const monthCounts = range(1, 13).map((m) => ({
    date: `${YEAR}-${m < 10 ? `0${m}` : m}`,
    ...JSON.parse(JSON.stringify(eventCount))
  }));

  events.forEach((e) => {
    Object.entries(e).forEach(([key, [value]]) => {
      // console.log(value);
      const month = parseISO(value.timestamp).getMonth();
      monthCounts[month][value.type]++;
    });
  });

  return monthCounts;
};

export const getEventPercentages = (events: Array<Event>) => {
  let total = 0;
  const eventCount: any = {
    yes: 0,
    no: 0
  };

  events.forEach((e) => {
    if (EventTypes.BLOCK in e) {
      eventCount.no++;
    } else {
      eventCount.yes++;
    }
    total++;
  });

  return {
    yes: eventCount.yes / total,
    no: eventCount.no / total
  };
};

export const getMaxChatLength = (events: Array<Event>): number => {
  let maxLength = 0;

  events.forEach((e) => {
    if (e.chats) {
      if (e.chats?.length > maxLength) {
        maxLength = e.chats?.length;
      }
    }
  });

  return maxLength;
};

export const getAverageChatLength = (events: Array<Event>): number => {
  let chatLength = 0;
  let chatCount = 0;

  events.forEach((e) => {
    if (e.chats) {
      chatLength += e.chats.length;
      chatCount++;
    }
  });

  return chatLength / chatCount;
};

export const getChatWordFrequency = (events: Array<Event>): WordCount => {
  const wordFrequency: WordCount = {};

  events.forEach((e) => {
    if (e.chats) {
      e.chats.forEach(({ body }) => {
        words(body as string).forEach((w: string) => {
          const remoteWord = w.toLowerCase();
          if (wordFrequency[remoteWord]) {
            wordFrequency[remoteWord]++;
          } else {
            wordFrequency[remoteWord] = 1;
          }
        });
      });
    }
  });

  return wordFrequency;
};

export const generateData = (events: Array<Event>): EventData => {
  return {
    eventsByMonth: getEventsByMonth(events),
    yesNoPercentage: getEventPercentages(events),
    maxChatLength: getMaxChatLength(events),
    averageChatLength: getAverageChatLength(events),
    // chatLengthByMonth: [],
    // matchToChatRatio: 0,
    chatWordFrequency: getChatWordFrequency(events)
  };
};
