import { User } from "../../../../domain/model/user.entity";
import { Message } from "../../../../domain/model/message.entity";

export class ConversationDto {
  otherUser: User;
  lastMessage: Message;
}
export class GetMyConversationsResponseDto {
  readonly conversations: ConversationDto[];

  constructor(conversations: ConversationDto[]) {
    this.conversations = conversations;
  }
}