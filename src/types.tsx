interface Metadata {
  timestamp: string;
  type: string;
}

interface BlockMetadata extends Metadata {
  block_type: string;
}

interface ChatMetadata extends Metadata {
  body: string | number;
}

interface WeMetMetadata extends Metadata {
  did_meet_subject?: boolean;
  was_my_type?: boolean;
}

export enum EventTypes {
  BLOCK = 'block',
  LIKE = 'like',
  MATCH = 'match',
  CHATS = 'chats',
  WE_MET = 'we_met'
}

export interface Event {
  [EventTypes.BLOCK]?: Array<BlockMetadata>;
  [EventTypes.LIKE]?: Array<Metadata>;
  [EventTypes.MATCH]?: Array<Metadata>;
  [EventTypes.CHATS]?: Array<ChatMetadata>;
  [EventTypes.WE_MET]?: Array<WeMetMetadata>;
}

export type EventCount = {
  [key in EventTypes]: number;
};

export interface MonthlyEventCount extends EventCount {
  date: string;
}

export interface WordCount {
  [word: string]: number;
}

export interface EventData {
  eventsByMonth: Array<MonthlyEventCount>;
  yesNoPercentage: { yes: number; no: number };
  maxChatLength: number;
  averageChatLength: number;
  matchToChatRatio?: number;
  averageMatchToChatLength?: number;
  chatWordFrequency: WordCount;
}
