import { Message } from "../../../../domain/model/message.entity";

export class GetConversationByUserIdResponseDto {
  readonly conversation: Message[];

  constructor(conversation: Message[]) {
    this.conversation = conversation;
  }
}