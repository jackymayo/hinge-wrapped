interface Metadata {
  timestamp: string;
  type: string;
}

interface BlockMetadata extends Metadata {
  block_type: string;
}

interface ChatMetadata extends Metadata {
  body: string;
}

export interface Match {
  block?: Array<BlockMetadata>;
  like?: Array<Metadata>;
  match?: Array<Metadata>;
  chats?: Array<ChatMetadata>;
}
