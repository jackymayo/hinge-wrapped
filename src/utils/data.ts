import { parseISO } from 'date-fns';
import { range, words, isInteger, sortBy } from 'lodash';
import sw from 'stopword';
import emojiRegex from 'emoji-regex';

import { YEAR } from '../constants';
import { EventData, MonthlyEventCount, Event, EventTypes, WordCount } from '../types';

// NOTE: Iiterating over the array multiple times because small dataset and it makes it easier to break up the work

const getEventsByMonth = (events: Array<Event>): Array<MonthlyEventCount> => {
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
      const month = parseISO(value.timestamp).getMonth();

      // if `we_met` we check value since it can be false
      if (value.type === 'we_met') {
        if (!value.did_meet_subject) {
          return;
        }
      }

      monthCounts[month][value.type]++;
    });
  });

  return monthCounts;
};

const getEventPercentages = (events: Array<Event>) => {
  const eventCount: any = {
    yes: 0,
    no: 0,
    total: 0
  };

  events.forEach((e) => {
    if (EventTypes.BLOCK in e) {
      eventCount.no++;
    } else {
      eventCount.yes++;
    }
    eventCount.total++;
  });

  return {
    yes: eventCount.yes / eventCount.total,
    no: eventCount.no / eventCount.total,
    total: eventCount.total
  };
};

const getMaxChatLength = (events: Array<Event>): number => {
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

const getAverageChatLength = (events: Array<Event>): number => {
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

const getChatWordFrequency = (events: Array<Event>) => {
  const wordFrequency: WordCount = {};
  const emojiFrequency: WordCount = {};
  const regex = emojiRegex();

  events.forEach((e) => {
    if (e.chats) {
      e.chats.forEach(({ body }) => {
        /**
         * "Stopwords" are words that are so frequent that
         * they can safely be removed from a text without altering its meaning.
         */
        sw.removeStopwords(words(body as string)).forEach((w: string) => {
          const remoteWord = w.toLowerCase();

          if (isInteger(+remoteWord)) {
            return;
          }

          if (remoteWord.match(regex)) {
            if (emojiFrequency[remoteWord]) {
              emojiFrequency[remoteWord]++;
            } else {
              emojiFrequency[remoteWord] = 1;
            }
          } else {
            if (wordFrequency[remoteWord]) {
              wordFrequency[remoteWord]++;
            } else {
              wordFrequency[remoteWord] = 1;
            }
          }
        });
      });
    }
  });

  return { wordFrequency, emojiFrequency };
};

const getChatTimeOfDayFrequency = (events: Array<Event>) => {
  const hourCounts = range(0, 24).reduce((acc: any, curr) => {
    acc[curr > 9 ? curr.toString() : `0${curr}`] = 0;
    return acc;
  }, {});

  events.forEach((e) => {
    if (e.chats) {
      e.chats.forEach((chat) => {
        const hour = chat.timestamp.slice(11, 13);
        hourCounts[hour]++;
      });
    }
  });

  return sortBy(
    Object.entries(hourCounts).map(([k, v]) => ({
      hour: k,
      count: v as number
    })),
    'hour'
  );
};

export const generateData = (events: Array<Event>): EventData => {
  return {
    eventsByMonth: getEventsByMonth(events),
    yesNoPercentage: getEventPercentages(events),
    maxChatLength: getMaxChatLength(events),
    averageChatLength: getAverageChatLength(events),
    chatWordFrequency: getChatWordFrequency(events),
    chatTimeOfDayFrequency: getChatTimeOfDayFrequency(events)
  };
};
