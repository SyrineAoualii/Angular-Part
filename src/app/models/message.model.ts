export interface ChatMessage {
  sender: string;
  content: string;
  rec: string;
  lu: boolean;
  sentAt?: Date;
  senderPhoto?: string;
  token?: string;
}
